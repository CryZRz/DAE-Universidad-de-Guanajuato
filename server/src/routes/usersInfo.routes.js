import {Router} from "express"
import { refreshInfoUser, searchDataUser} from "../controllers/usersInfo.controller.js"

const usersInfoRoutes = Router()

usersInfoRoutes.get("/refreshinfo/user", refreshInfoUser)

usersInfoRoutes.get("/profile/user/:id", searchDataUser)

export default usersInfoRoutes