import { Router } from "express";

import { 
    getAllCourses, deleteCourseStudent,
    updateCourseStudent, getStudentsCourse,
    updateSubjectCourse, updateTeacherCourse,
    updateTeamCourse, updatePeriodCourse,
    createCourse, deleteCourse
} 
from "../../controllers/adminControllers/courses.controller.js";

const coursesAdminRoutes = Router()

coursesAdminRoutes.get("/courses", getAllCourses)

coursesAdminRoutes.post("/createcourse", createCourse)

coursesAdminRoutes.delete("/deletecourse", deleteCourse)

coursesAdminRoutes.get("/studentscourse/:id", getStudentsCourse)

coursesAdminRoutes.put("/updatecoursestudent", updateCourseStudent)

coursesAdminRoutes.delete("/deletecoursestudent", deleteCourseStudent)

coursesAdminRoutes.put("/updatesubjectcourse", updateSubjectCourse)

coursesAdminRoutes.put("/updateteachercourse", updateTeacherCourse)

coursesAdminRoutes.put("/updateteamcourse", updateTeamCourse)

coursesAdminRoutes.put("/updateperiodcourse", updatePeriodCourse)

export default coursesAdminRoutes