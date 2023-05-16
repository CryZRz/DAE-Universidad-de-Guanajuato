import {Router} from "express"
import { sendImageProfile } from "../controllers/images.controller.js"

const imagesRoutes = Router()

imagesRoutes.get("/image/profile/:name", sendImageProfile)

export default imagesRoutes