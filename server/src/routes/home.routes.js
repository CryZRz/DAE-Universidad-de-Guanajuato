import {Router} from "express"
import { eventsSchool } from "../controllers/home.controller.js"

const routesHome = Router()

routesHome.get("/eventsschool", eventsSchool)

export default routesHome