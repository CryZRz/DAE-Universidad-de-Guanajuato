import Router from "express"
import { uploadOneImage } from "../../middlewares/uploadFiles.js"
import { getAllUsers, registerUser, getInfoUser, getAllTeachers } from "../../controllers/adminControllers/users.controller.js"

const usersAdminRoutes = Router()

usersAdminRoutes.get("/users", getAllUsers)

usersAdminRoutes.get("/teachers", getAllTeachers)

usersAdminRoutes.get("/user/:id", getInfoUser)

usersAdminRoutes.post("/registeruser", uploadOneImage, registerUser)

export default usersAdminRoutes