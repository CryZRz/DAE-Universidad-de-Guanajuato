import { poolSiia } from "../../dB.js";

export const saveOpportunity = async (req, res) => {
    try {
        const {subjectId, courseSubjectId, studentId, teacherId, periodId, opportunity} = req.body
        const [findGruop] = await poolSiia.query("SELECT period_id, id FROM course_subjects WHERE period_id = ? AND teacher_id = ? AND subject_id = ?", [periodId, teacherId, subjectId])
        
        const connection = await poolSiia.getConnection()
        await connection.beginTransaction()
        
        if (findGruop.length > 0) {
            const insertSubjectStudent = await connection.query("INSERT INTO subjects_studied VALUES(null, ?, ?, ?)", [opportunity, findGruop[0].id, studentId])
            const [getIdSubject] = await connection.query("SELECT LAST_INSERT_ID()");
            const insertQualificationsStudent = await connection.query("INSERT INTO qualifications VALUES(null, null, null, 'Cursando', ?)", [getIdSubject[0]["LAST_INSERT_ID()"]])
            
            await connection.commit()
            connection.release()
            return res.sendStatus(202)
        }else{

            const insertCourse = await connection.query("INSERT INTO course_subjects VALUES(null, ?, ?, 24, ?, 'Regularizacion')", [subjectId, teacherId, periodId])
            const [getIdCourse] = await connection.query("SELECT LAST_INSERT_ID()");
            const insertSubjectStudent = await connection.query("INSERT INTO subjects_studied VALUES(null, ?, ?, ?)", [opportunity, getIdCourse[0]["LAST_INSERT_ID()"], studentId])
            const [getIdSubject] = await connection.query("SELECT LAST_INSERT_ID()");
            const insertQualificationsStudent = await connection.query("INSERT INTO qualifications VALUES(null, null, null, 'Cursando', ?)", [getIdSubject[0]["LAST_INSERT_ID()"]])
            
            await connection.commit()
            connection.release()
            return res.sendStatus(202)
        }
        
        await connection.commit()
        connection.release()
        return res.status(400).json({
            message: "verify your data"
        })
    } catch (e) {
        await connection.rollback();
        connection.release();
        res.sendStatus(500)
    }
}

export const updateQualification = async (req, res) => {
    try {
        const {subjectStudiedId, qualification} = req.body

        let status = ""
        if (qualification < 7) {
            status = "Reprobada"
        }
        else if(qualification > 6){
            status = "Aprobada"
        }else{
            status = "Sin status"
        }

        const [updateQualifitionDb] = await poolSiia.query("UPDATE qualifications SET date = CURDATE(), qualification = ?, status = ? WHERE subject_studied_id = ?",[qualification, status, subjectStudiedId])
        if (updateQualifitionDb.affectedRows > 0) {
            return res.sendStatus(202)
        }

        return res.status(400).json({
            message: "check your data"
        }) 
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const getListSubject = async (req, res) => {
    try {
        const {start, end} = req.query
        if (start == undefined || end == undefined) {
            const [listSubjects] = await poolSiia.query("SELECT id, name, credits, semester_id AS semesterId FROM subjects LIMIT 10")
            return res.send(listSubjects)
        }
        const [listSubjects] = await poolSiia.query("SELECT id, name, credits, semester_id AS semesterId FROM subjects LIMIT ?, ?", [parseInt(start), parseInt(end)])
        return res.send(listSubjects)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const createSubject = async (req, res) => {
    try {
        const {subjectName, subjectCredits, subjectSemester} = req. body
        if (subjectName == undefined || subjectCredits == undefined || subjectSemester == undefined) {
            return res.sendStatus(404)
        }
        const [createSubjectDb] = await poolSiia.query("INSERT INTO subjects VALUES(null, ?, ?, ?)", [subjectName, subjectCredits, subjectSemester])
        if (createSubjectDb.affectedRows > 0) {
            return res.sendStatus(202)
        }

        return res.status(400).json({
            message: "check your data"
        }) 
    } catch (e) {
        res.sendStatus(500)
    }
}

export const updateCourse = async (req, res) => {
    try {
        const {subjectId, subjectName, subjectCredits, subjectSemester} = req. body
        if (subjectName == undefined || subjectCredits == undefined || subjectSemester == undefined || subjectId == undefined) {
            return res.sendStatus(404)
        }
        const [editSubjectDb] = await poolSiia.query("UPDATE subjects SET name = ?, credits = ?, semester_id = ? WHERE id = ?", [subjectName, subjectCredits, subjectSemester, subjectId])
        if (editSubjectDb.affectedRows > 0) {
            return res.sendStatus(202)
        }

        return res.status(400).json({
            message: "check your data"
        }) 
    } catch (e) {
        res.sendStatus(500)
    }
}

export const deleteSubject = async (req, res) => {
    try {
        const {subjectId} = req.body
        if (subjectId == undefined) {
            return res.sendStatus(404)
        }

        const [deleteSubjectDb] = await poolSiia.query("DELETE FROM subjects WHERE id = ?", [subjectId])
        if (deleteSubjectDb.affectedRows > 0) {
            return res.sendStatus(202)
        }

        return res.status(400).json({
            message: "check your data"
        })
    } catch (e) {
        res.sendStatus(500)
    }
}