import { poolSiia } from "../../dB.js";
import bcryptjs from "bcryptjs" 
import { formatQualificationsStudent } from "../../helpers/formatSubjects.js";
import { addSchedulesCourse } from "../../helpers/formatCourse.js";
import { formatCourse } from "../../helpers/formatCourse.js";

export const getAllUsers = async (req, res) => {
    try {
        const {start, end} = req.query
        if (start == undefined || end == undefined) {
            const [getUsers] = await poolSiia.query("SELECT id, email, name, last_name AS lastName, direction, role, image FROM users ORDER BY id DESC LIMIT 20")
            return res.send(getUsers)
        }
        
        const [getUsers] = await poolSiia.query("SELECT id, email, name, last_name AS lastName, direction, role, image FROM users ORDER BY id DESC LIMIT ?, ?", [parseInt(start), parseInt(end)])
        return res.send(getUsers)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const registerUser = async (req, res) => {
    try {
        const {name, lastName, role, direction, semesterId, teamId, email, password} = req.body
        const [verifyEmail] = await poolSiia.query("SELECT email from users WHERE email = ?",[req.body.email])
        if (verifyEmail.length > 0) {
            return res.status(400).json({
                message: "user alredy register"
            })
        }
        const encryptPassword = await bcryptjs.hash(password, 5)
        if (role == "student") {
            const [insertUser] = await poolSiia.query("INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, null, ?, ?, null, ?, ?, null, null, null)", [email, encryptPassword, name, lastName, direction, teamId, semesterId, role, req.file.originalname])
            if (insertUser.affectedRows > 0) {
                return res.sendStatus(202)
            }
            return res.status(400).json({
                message: "data invalid"
            })
        }else{
            const [insertUser] = await poolSiia.query("INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, null, null, null, null, ?, ?, null, null, null)", [email, encryptPassword, name, lastName, direction, role, req.file.originalname])
            if (insertUser.affectedRows > 0) {
                return res.sendStatus(202)
            }

            return res.status(400).json({
                message: "data invalid"
            })
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const getInfoUser = async (req, res) => {
    try {
        const {id} = req.params
        const [findUser] = await poolSiia.query("SELECT * FROM users WHERE id = ?", [id])
        if (findUser.length < 0) {
            return res.status(400).json({
                message: "user not exist"
            })
        }
        if (findUser[0].role == "student") {
            const [getSubjects] = await poolSiia.query("SELECT t.id AS teamId, t.name AS teamName, ss.user_id AS studentId, ss.id AS subjectStudiedId, cs.type_of_group AS typeOfGroup, cs.id AS subjectCourseId, q.qualification, q.date, ss.opportunity, s.id AS subjectId, s.name AS subjectName, s.credits AS subjectCredits, s.semester_id AS subjectSemesterId, u.id AS teacherId, u.name AS teacherName, u.last_name AS teacherLastName, u.image AS teacherImage, p.id AS periodId, p.name AS periodName, p.start_date AS periodStartDate, p.end_date AS periodEndDate, p.type_of_period AS typeOfPeriod FROM subjects_studied ss INNER JOIN qualifications q ON q.subject_studied_id = ss.id INNER JOIN course_subjects cs ON ss.subject_course_id = cs.id LEFT JOIN users u ON cs.teacher_id = u.id INNER JOIN subjects s ON cs.subject_id = s.id INNER JOIN periods p ON cs.period_id = p.id INNER JOIN teams t ON cs.team_id = t.id WHERE ss.user_id = ?", [id])
            if (getSubjects.length > 0) {
                const listSubjecstFormat = formatQualificationsStudent(getSubjects)
                res.send(listSubjecstFormat)
            }
        }
        else if (findUser[0].role == "teacher") {
            const {start, end} = req.query
            if (start == undefined || end == undefined) {
                const [listCourses] = await poolSiia.query("SELECT p.id AS periodId, p.name AS periodName, p.start_date AS periodStartDate, p.end_date AS periodEndDate, p.type_of_period AS typeOfPeriod, cs.id AS subjectCourseId, cs.type_of_group AS typeOfGroup, s.id AS subjectId, s.name AS subjectName, s.credits AS subjectCredits, t.id AS teamId, t.name AS teamName, t.semester_id AS teamSemester, u.id AS teacherId, u.name AS teacherName, u.last_name AS teacherLastName, u.image AS teacherImage FROM course_subjects cs INNER JOIN subjects s ON cs.subject_id = s.id INNER JOIN teams t ON cs.team_id = t.id INNER JOIN periods p ON cs.period_id = p.id LEFT JOIN users u ON cs.teacher_id = u.id WHERE cs.teacher_id = ? ORDER BY cs.id DESC LIMIT 10", [parseInt(id)])
                const courseSchedules = await addSchedulesCourse(listCourses)
                const coursesFormat = formatCourse(courseSchedules)
                return res.send(coursesFormat)
            }
    
            const [listCourses] = await poolSiia.query("SELECT p.id AS periodId, p.name AS periodName, p.start_date AS periodStartDate, p.end_date AS periodEndDate, p.type_of_period AS typeOfPeriod, cs.id AS subjectCourseId, cs.type_of_group AS typeOfGroup, s.id AS subjectId, s.name AS subjectName, s.credits AS subjectCredits, t.id AS teamId, t.name AS teamName, t.semester_id AS teamSemester, u.id AS teacherId, u.name AS teacherName, u.last_name AS teacherLastName, u.image AS teacherImage FROM course_subjects cs INNER JOIN subjects s ON cs.subject_id = s.id INNER JOIN teams t ON cs.team_id = t.id INNER JOIN periods p ON cs.period_id = p.id LEFT JOIN users u ON cs.teacher_id = u.id WHERE cs.teacher_id = ? ORDER BY cs.id DESC LIMIT ?, ?", [parseInt(id), parseInt(start), parseInt(end)])
            const courseSchedules = await addSchedulesCourse(listCourses)
            const coursesFormat = formatCourse(courseSchedules)
            return res.send(coursesFormat)
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const getAllTeachers = async (req, res) => {
    try {
        const {start, end} = req.query
        if (start == undefined || end == undefined) {
            const [listTeachers] = await poolSiia.query("SELECT id, name, last_name AS lastName, image, role, email FROM users WHERE role = 'teacher' LIMIT 10")
            return res.send(listTeachers)
        }
        const [listTeachers] = await poolSiia.query("SELECT id, name, last_name AS lastName, image, role, email FROM users WHERE role = 'teacher' LIMIT ?, ?", [parseInt(start), parseInt(end)])
        return res.send(listTeachers)

    } catch (e) {
        res.sendStatus(500)
    }
}

