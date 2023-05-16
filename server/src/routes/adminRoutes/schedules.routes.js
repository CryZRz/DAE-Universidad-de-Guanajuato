import { Router } from "express";

import { getAllSchedules, updateSchedules } from "../../controllers/adminControllers/schedules.controller.js";

const schedulesAdminRoutes = Router();

schedulesAdminRoutes.get("/schedules", getAllSchedules)

schedulesAdminRoutes.put("/updateschedules", updateSchedules)

export default schedulesAdminRoutes