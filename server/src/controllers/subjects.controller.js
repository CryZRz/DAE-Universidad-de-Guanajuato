import { poolSiia } from "../dB.js"
import { addTeacherSubjects, formatAviableSubjectTeacher, formatQualificationsStudent } from "../helpers/formatSubjects.js"
import { validateJwtToken } from "../helpers/jwtFunctions.js"
import { addSchedulesCourse } from "../helpers/formatCourse.js"

//hace falta refactor
export const getSubjectsPerSemester = async (req, res) => {
    try {
        const getInfoUser = await validateJwtToken(req.headers.token)
        const sqlGetSubjects = "SELECT s.id AS subjectId, s.name AS subjectName, s.credits AS subjectCredits, t.id AS subjectTeamId, t.name AS subjectTeamName, cs.teacher_id AS teacherId, cs.id AS subjectCourseId FROM course_subjects cs INNER JOIN subjects s ON cs.subject_id = s.id INNER JOIN teams t ON cs.team_id = t.id WHERE t.id = ?"
        const [getSubjects] = await poolSiia.query(sqlGetSubjects, [getInfoUser.team_id])
        if (getSubjects.length >= 1) {
            const dataSubjectFormat = await addTeacherSubjects(getSubjects)
            console.log(dataSubjectFormat)
            res.send(getSubjects)
        }else{
            res.status(403).json({
                message: "verify your data"
            })
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

//hace falta refactor
export const saveSubjectsInscription = async (req, res) => {
    const {listSubjects} = req.body
    try {
        const getInfoUser = await validateJwtToken(req.headers.token)
        await poolSiia.query("START TRANSACTION")
        for (let i = 0; i < listSubjects.length; i++) {
            await poolSiia.query("INSERT INTO subjects_studied VALUES(null, null, null, null, null, null, null, ?, ?)", [listSubjects[i].subjectCourseId, getInfoUser.id])
        }
        await poolSiia.query("COMMIT");
        res.sendStatus(202)
    } catch (e) {
        console.log(e)
        try {
            await poolSiia.query("ROLLBACK")
            res.sendStatus(500)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export const getSubjectsStudied = async (req, res) => {
    try {
        const getDataUser = await validateJwtToken(req.headers.token)
        const [getSubjects] = await poolSiia.query("SELECT ss.user_id AS studentId, cs.type_of_group AS typeOfGroup, cs.id AS courseSubjectId, q.qualification, q.date, ss.opportunity, s.id AS subjectId, s.name AS subjectName, s.credits AS subjectCredits, s.semester_id AS subjectSemesterId FROM subjects_studied ss INNER JOIN qualifications q ON q.subject_studied_id = ss.id INNER JOIN course_subjects cs ON ss.subject_course_id = cs.id INNER JOIN subjects s ON cs.subject_id = s.id WHERE ss.user_id = ?", [getDataUser.id])
        if (getSubjects.length > 0) {
            const listSubjecstFormat = formatQualificationsStudent(getSubjects)
            res.send(listSubjecstFormat)
        }else{
            res.status(400).json({
                message: "verify your data"
            })
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const getAviableSubjectsTeacher = async (req, res) => {
    try {
        const getInfoUser = await validateJwtToken(req.headers.token)
        if (getInfoUser.role != "teacher") {
            res.sendStatus(403)
        }else{
            const [aviableSubjects] = await poolSiia.query("SELECT *, cs.id AS courseId, t.name AS teamName, s.name AS subjectName FROM course_subjects cs INNER JOIN subjects s ON cs.subject_id = s.id INNER JOIN teams t ON cs.team_id = t.id WHERE cs.teacher_id is NULL AND cs.type_of_group = 'Ordinario'")
            const [aviableSubjectsSchedules] = await poolSiia.query("SELECT ss.id, ss.day, ss.start_time AS startTime, ss.end_time AS endTime, ss.subject_course_id AS subjectCourseId FROM course_subjects cs INNER JOIN schedule_subjects ss ON cs.id = ss.subject_course_id WHERE cs.type_of_group = 'Ordinario'")
            const [subjectsOfTeacher] = await poolSiia.query("SELECT *, cs.id AS courseId, t.name AS teamName, s.name AS subjectName FROM course_subjects cs INNER JOIN subjects s ON cs.subject_id = s.id INNER JOIN teams t ON cs.team_id = t.id WHERE cs.teacher_id = ? AND cs.type_of_group = 'Ordinario'", [getInfoUser.id])
            let listSubjectsAviable = []
            let listSubjectsOfTeacher = []
            if (aviableSubjects.length > 0) {
                listSubjectsAviable= formatAviableSubjectTeacher(aviableSubjects, aviableSubjectsSchedules)
                if (subjectsOfTeacher.length > 0) {
                    listSubjectsOfTeacher = formatAviableSubjectTeacher(subjectsOfTeacher, aviableSubjectsSchedules)
                }
                res.send({
                    aviableSubjects: listSubjectsAviable,
                    subjectsUser: listSubjectsOfTeacher
                })
            }else{
                res.sendStatus(404)
            }
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const saveSubjectsTeacher = async (req, res) => {
    const {listSubjectsUps, listSubjectsDowns} = req.body
    try {
        const getDataUser = await validateJwtToken(req.headers.token)
        if (getDataUser.role != "teacher") {
            return res.status(403).json({
                message: "You do not have permission"
            })
        }
        const connection = await poolSiia.getConnection()
        await connection.beginTransaction()
        for (let i = 0; i < listSubjectsUps.length; i++) {
            await connection.query("UPDATE course_subjects SET teacher_id = ? WHERE id = ?", [getDataUser.id, listSubjectsUps[i].courseId])
        }
        if (listSubjectsDowns.length >= 1) {
            for (let y = 0; y < listSubjectsDowns.length; y++) {
                console.log(listSubjectsDowns[y].courseId)
                await connection.query("UPDATE course_subjects SET teacher_id = null WHERE id = ?", [listSubjectsDowns[y].courseId])
            }
        }
        await connection.commit()
        connection.release()
        res.sendStatus(202)
    } catch (e) {
        console.log(e)
        await connection.rollback()
        connection.release()
        res.sendStatus(500)
    }
}

export const getAviableSubjectsStudent = async (req, res) => {
    try {
        const getInfoUser = await validateJwtToken(req.headers.token)
        if (getInfoUser.role != "student") {
            return res.sendStatus(403)
        }
        const [getSubjects] = await poolSiia.query("SELECT cs.id AS subjectCourseId, s.id AS subjectId, s.name AS subjectName, s.credits , s.semester_id AS subjectSemester, u.id AS teacherId, u.name AS teacherName, u.last_name AS teacherLastName, u.image AS teacherImage, t.id AS teamId, t.name AS teamName FROM course_subjects cs INNER JOIN subjects s ON cs.subject_id = s.id LEFT JOIN users u ON cs.teacher_id = u.id INNER JOIN teams t ON cs.team_id = t.id WHERE cs.type_of_group = 'Ordinario'")

        const [getSubjectsOfStudent] = await poolSiia.query("SELECT ss.id AS subjectStudiedId, cs.id AS subjectCourseId, s.id AS subjectId, s.name AS subjectName, s.credits, s.semester_id AS subjectSemester, u.id AS teacherId, u.name AS teacherName, u.last_name AS teacherLastName, u.image AS teacherImage, t.id AS teamId, t.name AS teamName FROM subjects_studied ss INNER JOIN course_subjects cs ON ss.subject_course_id = cs.id INNER JOIN subjects s ON cs.subject_id = s.id LEFT JOIN users u ON cs.teacher_id = u.id INNER JOIN teams t ON cs.team_id = t.id WHERE ss.user_id = ? AND ss.opportunity = 1", [getInfoUser.id])

        const listSubjectsTeacherAviable = await addSchedulesCourse(getSubjects)
        const listSubjectsTeacherNotAviable = await addSchedulesCourse(getSubjectsOfStudent)

        res.send({
            aviableSubjects: listSubjectsTeacherAviable,
            subjectsUser: listSubjectsTeacherNotAviable
        })
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const saveSubjectsStudent = async (req, res) => {
    const {listSubjectsUps, listSubjectsDowns} = req.body
    try {
        const getInfoUser = await validateJwtToken(req.headers.token)
        if (getInfoUser.role != "student") {
            return res.sendStatus(403)
        }
        const connection = await poolSiia.getConnection()
        await connection.beginTransaction()
        for (let i = 0; i < listSubjectsUps.length; i++) {
            await connection.query("INSERT INTO subjects_studied VALUES(null, 1, ?, ?)", [listSubjectsUps[i].courseId, getInfoUser.id])
            const [getIdSubject] = await connection.query("SELECT LAST_INSERT_ID()");
            await connection.query("INSERT INTO qualifications VALUES(null, null, null, 'Cursando', ?)", [getIdSubject[0]["LAST_INSERT_ID()"]])
        }
        if (listSubjectsDowns.length >= 1) {
            for (let y = 0; y < listSubjectsDowns.length; y++) {
                await connection.query("DELETE FROM qualifications WHERE subject_studied_id = ?", [listSubjectsDowns[y].subjectStudiedId])
                await connection.query("DELETE FROM subjects_studied WHERE id = ?", [listSubjectsDowns[y].subjectStudiedId])
            }
        }
        await connection.commit()
        connection.release()
        res.sendStatus(202)
    } catch (e) {
        console.log(e)
        await connection.rollback();
        connection.release();
        res.sendStatus(500)
    }
}

export const getSubjectsTeacher = async (req, res) => {
    try {
        const getInfoUser = await validateJwtToken(req.headers.token)
        if (getInfoUser.role != "teacher") {
            return res.sendStatus(403)
        }
        const [getSubjectsTeacher] = await poolSiia.query("SELECT cs.id AS subjectCourseId, ss.id AS subjectStudiedId, ss.opportunity, s.name AS subjectName, s.credits AS subjectCredits, s.id AS subjectId, s.semester_id AS subjectSemesterId, u.id AS studentId, u.name AS studentName, u.last_name AS studentLastName, u.image AS studentImage, t.name AS teamName, t.id AS teamId FROM subjects_studied ss INNER JOIN course_subjects cs ON ss.subject_course_id = cs.id INNER JOIN subjects s ON cs.subject_id = s.id INNER JOIN users u ON ss.user_id = u.id INNER JOIN teams t ON cs.team_id = t.id INNER JOIN qualifications q ON q.subject_studied_id = ss.id WHERE cs.teacher_id = ? AND ss.opportunity = 1 AND q.qualification IS NULL", [getInfoUser.id])
        if (getSubjectsTeacher.length >= 1) {
            res.send(getSubjectsTeacher)   
        }else{
            res.status(400).json({
                message: "you have not studied subjects"
            })
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
} 

export const saveQualificationsSubjects = async (req, res) => {
    const {listQualifications} = req.body
    try {
        const getInfoUser = await validateJwtToken(req.headers.token)
        if (getInfoUser.role != "teacher") {
            return res.sendStatus(403)
        }
        const connection = await poolSiia.getConnection()
        await connection.beginTransaction()
        for (let i = 0; i < listQualifications.length; i++) {
            let status = ""
            if (listQualifications[i].qualification < 7) {
                status = "Reprobada"
            }
            else if(listQualifications[i].qualification > 7){
                status = "Aprobada"
            }else{
                status = "Sin status"
            }
            await connection.query("UPDATE qualifications SET date = CURDATE(), qualification = ?, status = ? WHERE subject_studied_id = ?", [listQualifications[i].qualification, status, listQualifications[i].subjectStudiedId])
        }
        await connection.commit()
        connection.release()
        res.sendStatus(202)
    } catch (e) {
        await connection.rollback()
        connection.release()
        res.sendStatus(500)
    }
}

export const getListSubjects = async (req, res) => {
    try {
        const getDataUser = await validateJwtToken(req.headers.token)
        if (getDataUser.role == "student") {
            const [getListSubjectsDb] = await poolSiia.query("SELECT cs.id AS courseSubjectId, cs.type_of_group AS typeOfGroup, s.id AS subjectId, s.name AS subjectName, t.id AS teamId, t.name AS teamName, u.id AS teacherId, u.name AS teacherName, u.last_name AS teacherLastName, u.image as teacherImage, q.qualification, ss.opportunity, q.status FROM subjects_studied ss INNER JOIN qualifications q ON q.subject_studied_id = ss.id INNER JOIN course_subjects cs ON ss.subject_course_id = cs.id INNER JOIN subjects s ON cs.subject_id = s.id INNER JOIN teams t ON cs.team_id = t.id INNER JOIN users u ON cs.teacher_id = u.id WHERE ss.user_id = ?", [getDataUser.id])
            if (getListSubjectsDb.length > 0) {
                res.send(getListSubjectsDb)
            }
        }
        else if(getDataUser.role == "teacher"){
            const [getListSubjectsDb] = await poolSiia.query("SELECT cs.id AS courseSubjectId, cs.type_of_group AS typeOfGroup, s.id AS subjectId, s.name AS subjectName, t.id AS teamId, t.name AS teamName, u.id AS teacherId, u.name AS teacherName, u.last_name AS teacherLastName, u.image as teacherImage, q.qualification, ss.opportunity, q.status FROM subjects_studied ss INNER JOIN qualifications q ON q.subject_studied_id = ss.id INNER JOIN course_subjects cs ON ss.subject_course_id  = cs.id INNER JOIN subjects s ON cs.subject_id = s.id INNER JOIN teams t ON cs.team_id = t.id INNER JOIN users u ON cs.teacher_id = u.id WHERE cs.teacher_id = ?", [getDataUser.id])
            if (getListSubjectsDb.length > 0) {
                res.send(getListSubjectsDb)
            }
        }else{
            res.sendStatus(403)
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}


export const getAllregularizations = async (req, res) => {
    try {
        const getDataUser = await validateJwtToken(req.headers.token)
        if (getDataUser.role == "teacher") {
            const [getListReg] = await poolSiia.query("SELECT cs.id AS subjectCourseId, ss.id AS subjectStudiedId, ss.opportunity, s.name AS subjectName, s.credits AS subjectCredits, s.id AS subjectId, s.semester_id AS subjectSemesterId, u.id AS studentId, u.name AS studentName, u.last_name AS studentLastName, u.image AS studentImage, t.name AS teamName, t.id AS teamId FROM subjects_studied ss INNER JOIN course_subjects cs ON ss.subject_course_id = cs.id INNER JOIN subjects s ON cs.subject_id = s.id INNER JOIN users u ON ss.user_id = u.id INNER JOIN teams t ON cs.team_id = t.id INNER JOIN qualifications q ON q.subject_studied_id = ss.id INNER JOIN periods p ON cs.period_id = p.id WHERE cs.teacher_id = ? AND cs.type_of_group = 'Regularizacion' AND p.end_date > NOW() AND q.qualification IS NULL", [getDataUser.id])

            return res.send(getListReg)
        }
        
        return res.sendStatus(400)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}