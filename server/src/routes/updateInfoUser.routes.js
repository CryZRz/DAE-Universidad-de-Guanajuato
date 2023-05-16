import {Router} from "express"
import { updateImageUser, updateInfoUser} from "../controllers/updateInfoUsers.controller.js"
import { uploadOneImage } from "../middlewares/uploadFiles.js"

const updateInfoUsersRouter = Router()

updateInfoUsersRouter.put("/update/info/user", updateInfoUser)

updateInfoUsersRouter.put("/update/image/user", uploadOneImage, updateImageUser)

export default updateInfoUsersRouter