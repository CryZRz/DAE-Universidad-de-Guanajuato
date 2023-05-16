import {Router} from "express"
import { getAllNotices } from "../controllers/notices.controller.js"

const noticesRoutes = Router()

noticesRoutes.get("/notices", getAllNotices)

export default noticesRoutes