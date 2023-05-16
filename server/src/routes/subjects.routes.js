import {Router} from "express"
import { 
    getSubjectsPerSemester, 
    saveSubjectsInscription, 
    getSubjectsStudied, 
    getAviableSubjectsTeacher, 
    saveSubjectsTeacher, 
    getAviableSubjectsStudent, 
    saveSubjectsStudent, 
    getSubjectsTeacher,
    saveQualificationsSubjects,
    getListSubjects,
    getAllregularizations
} 
from "../controllers/subjects.controller.js"

const subjectsRoutes = Router()

subjectsRoutes.get("/subjects", getSubjectsPerSemester)

subjectsRoutes.post("/save/inscription", saveSubjectsInscription)

subjectsRoutes.get("/subjects/studied", getSubjectsStudied)

subjectsRoutes.get("/subjects/teachers/aviable", getAviableSubjectsTeacher)

subjectsRoutes.post("/update/subjects/teacher", saveSubjectsTeacher)

subjectsRoutes.get("/subjects/students/aviable", getAviableSubjectsStudent)

subjectsRoutes.post("/update/subjects/student", saveSubjectsStudent)

subjectsRoutes.get("/subjects/teacher", getSubjectsTeacher)

subjectsRoutes.post("/subjects/qualifications/save", saveQualificationsSubjects)

subjectsRoutes.get("/listsubjects", getListSubjects)

subjectsRoutes.get("/regularizations", getAllregularizations)

export default subjectsRoutes