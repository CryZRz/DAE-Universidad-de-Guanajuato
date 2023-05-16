import Router from "express"
import { 
    saveOpportunity, createSubject,
    updateQualification, getListSubject,
    updateCourse, deleteSubject
} 
from "../../controllers/adminControllers/subjects.controller.js"

const subjectsAdminRoutes = Router()

subjectsAdminRoutes.post("/saveopportunity", saveOpportunity)

subjectsAdminRoutes.put("/savequalification", updateQualification)

subjectsAdminRoutes.get("/subjects", getListSubject)

subjectsAdminRoutes.post("/createsubject", createSubject)

subjectsAdminRoutes.put("/editsubject", updateCourse)

subjectsAdminRoutes.delete("/deletesubject", deleteSubject)

export default subjectsAdminRoutes