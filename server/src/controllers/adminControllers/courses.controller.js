import { formatCourse, addSchedulesCourse } from "../../helpers/formatCourse.js";
import { poolSiia } from "../../dB.js";
import deleteListQualifications from "../../helpers/deleteListQualifications.js";

export const getAllCourses = async (req, res) => {
    try {
        const {start, end} = req.query
        if (start == undefined || end == undefined) {
            const [listCourses] = await poolSiia.query("SELECT p.id AS periodId, p.name AS periodName, p.start_date AS periodStartDate, p.end_date AS periodEndDate, p.type_of_period AS typeOfPeriod, cs.id AS subjectCourseId, cs.type_of_group AS typeOfGroup, s.id AS subjectId, s.name AS subjectName, s.credits AS subjectCredits, t.id AS teamId, t.name AS teamName, t.semester_id AS teamSemester, u.id AS teacherId, u.name AS teacherName, u.last_name AS teacherLastName, u.image AS teacherImage FROM course_subjects cs INNER JOIN subjects s ON cs.subject_id = s.id INNER JOIN teams t ON cs.team_id = t.id INNER JOIN periods p ON cs.period_id = p.id LEFT JOIN users u ON cs.teacher_id = u.id ORDER BY cs.id DESC LIMIT 10")
            const courseSchedules = await addSchedulesCourse(listCourses)
            const coursesFormat = formatCourse(courseSchedules)
            return res.send(coursesFormat)
        }

        const [listCourses] = await poolSiia.query("SELECT p.id AS periodId, p.name AS periodName, p.start_date AS periodStartDate, p.end_date AS periodEndDate, p.type_of_period AS typeOfPeriod, cs.id AS subjectCourseId, cs.type_of_group AS typeOfGroup, s.id AS subjectId, s.name AS subjectName, s.credits AS subjectCredits, t.id AS teamId, t.name AS teamName, t.semester_id AS teamSemester, u.id AS teacherId, u.name AS teacherName, u.last_name AS teacherLastName, u.image AS teacherImage FROM course_subjects cs INNER JOIN subjects s ON cs.subject_id = s.id INNER JOIN teams t ON cs.team_id = t.id INNER JOIN periods p ON cs.period_id = p.id LEFT JOIN users u ON cs.teacher_id = u.id ORDER BY cs.id DESC LIMIT ?, ?", [parseInt(start), parseInt(end)])
        const courseSchedules = await addSchedulesCourse(listCourses)
        const coursesFormat = formatCourse(courseSchedules)
        return res.send(coursesFormat)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const createCourse = async (req, res) => {
    try {
        console.log(req.body)
        if (Object.keys(req.body).length == 0) {
            return res.sendStatus(404)
        }
        const {subjectId, teacherId, teamId, periodId, typeOfGroup} = req.body
        const [createCourseDb] = await poolSiia.query("INSERT INTO course_subjects VALUES(null, ?, ?, ?, ?, ?)", [subjectId, teacherId, teamId, periodId, typeOfGroup]) 
        if (createCourseDb.affectedRows > 0) {
            return res.sendStatus(202)
        }

        return res.status(400).json({
            message: "check your data"
        })
    } catch (e) {
        res.sendStatus(500)
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const {courseId, containsStudents} = req.body
        console.log(req.body)
        if (courseId == undefined || containsStudents == undefined) {
            return res.sendStatus(404)
        }

        if (containsStudents) {
            const [getStudentsCourse] = await poolSiia.query("SELECT * FROM subjects_studied WHERE subject_course_id = ?", [courseId])
            const deleteStudentsCourse = await deleteListQualifications(getStudentsCourse)
            if (deleteStudentsCourse) {
                const [deleteSubjectStudied] = await poolSiia.query("DELETE FROM subjects_studied WHERE subject_course_id = ?", [courseId])
                
                const [deleteCourseDb] = await poolSiia.query("DELETE FROM course_subjects WHERE id = ?",[courseId])
                if (deleteCourseDb.affectedRows > 0) {
                    return res.sendStatus(202)
                }

                return res.status(400).json({
                    message: "check your data"
                }) 
            }

            return res.status(400).json({
                message: "check your data"
            })
        }else{
            const [deleteCourseDb] = await poolSiia.query("DELETE FROM course_subjects WHERE id = ?",[courseId])
            if (deleteCourseDb.affectedRows > 0) {
                return res.sendStatus(202)
            }
        }

        return res.status(400).json({
            message: "check your data"
        })
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const getStudentsCourse = async (req, res) => {
    try {
        if (req.params.id == undefined) {
            return res.sendStatus(404)
        }
        const courseId = req.params.id
        const [getListStudents] = await poolSiia.query("SELECT u.id, u.name, u.last_name AS lastName, u.email, u.role, u.image FROM subjects_studied ss INNER JOIN users u ON ss.user_id = u.id WHERE ss.subject_course_id = ?", [courseId])
        res.send(getListStudents)
    } catch (e) {
        res.sendStatus(500)
    }
}

export const updateCourseStudent = async (req, res) => {
    try {
        const {subjecOld, subjectNew} = req.body
        const [updateCourse] = await poolSiia.query("UPDATE subjects_studied SET subject_course_id = ? WHERE subject_course_id = ?", [subjectNew, subjecOld])
        if (updateCourse.affectedRows >= 1) {
            return res.sendStatus(202)
        }
        
        return res.status(400).json({
            message: "check your data"
        })
    } catch (e) {
        res.sendStatus(500)
    }
}

export const deleteCourseStudent = async (req, res) => {
    try {
        const {subjectStudiedId} = req.body
        const [deleteCourse] = await poolSiia.query("DELETE FROM subjects_studied WHERE id = ?", [subjectStudiedId])
        if (deleteCourse.affectedRows >= 1) {
            const [delteQualifications] = await poolSiia.query("DELETE FROM qualifications WHERE subject_studied_id = ?", [subjectStudiedId])
            res.sendStatus(202)
        }else{
            res.status(400).json({
                message: "subject dosent exist"
            }) 
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const updateSubjectCourse = async (req, res) => {
    try {
        if (req.body.courseId == undefined || req.body.subjectId == undefined) {
            return res.sendStatus(404)
        }
        const {courseId, subjectId} = req.body
        const [updateSubject] = await poolSiia.query("UPDATE course_subjects SET subject_id = ? WHERE id = ?", [subjectId, courseId])
        if (updateSubject.affectedRows > 0) {
            return res.sendStatus(202)
        }

        return res.status(400).json({
            message: "check your data"
        })
    } catch (e) {
        res.sendStatus(500)
    }
}

export const updateTeacherCourse = async (req, res) => {
    try {
        const {courseId, teacherId} = req.body
        if (courseId == undefined || teacherId == undefined) {
            return res.sendStatus(404)
        }
        const [updateTeacher] = await poolSiia.query("UPDATE course_subjects SET teacher_id = ? WHERE id = ?", [teacherId, courseId])
        if (updateTeacher.affectedRows > 0) {
            return res.sendStatus(202)
        }

        return res.status(400).json({
            message: "check your data"
        })
    } catch (e) {
        res.sendStatus(500)
    }
}

export const updateTeamCourse = async (req, res) => {
    try {
        const {courseId, teamId} = req.body
        if (courseId == undefined || teamId == undefined) {
            return res.sendStatus(404)
        }
        const [updateTeam] = await poolSiia.query("UPDATE course_subjects SET team_id = ? WHERE id = ?", [teamId, courseId])
        if (updateTeam.affectedRows > 0) {
            return res.sendStatus(202)
        }

        return res.status(400).json({
            message: "check your data"
        })
    } catch (e) {
        res.sendStatus(500)
    }
}

export const updatePeriodCourse = async (req, res) => {
    try {
        const {courseId, periodId} = req.body
        if (courseId == undefined || periodId == undefined) {
            return res.sendStatus(404)
        }
        const [updatePeriod] = await poolSiia.query("UPDATE course_subjects SET period_id = ? WHERE id = ?", [periodId, courseId])
        if (updatePeriod.affectedRows > 0) {
            return res.sendStatus(202)
        }

        return res.status(400).json({
            message: "check your data"
        })
    } catch (e) {
        res.sendStatus(500)
    }
}