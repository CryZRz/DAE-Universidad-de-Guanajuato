import { Router } from "express";
import { getListTeams } from "../../controllers/adminControllers/teams.controller.js";

const teamsAdminRoutes = Router()

teamsAdminRoutes.get("/teams", getListTeams)

export default teamsAdminRoutes