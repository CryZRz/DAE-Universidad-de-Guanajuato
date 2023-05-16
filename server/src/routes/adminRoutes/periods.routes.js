import { Router } from "express";

import { 
    getAllPeriods, createPeriod, getCurrentsPeriods, 
    getCurrentsPeriodsRegularization, updatePeriod,
    deletePeriod
} 
from "../../controllers/adminControllers/periods.controller.js";

const periodsAdminRoutes = Router()

periodsAdminRoutes.get("/periods", getAllPeriods)

periodsAdminRoutes.get("/currentperiods", getCurrentsPeriods)

periodsAdminRoutes.get("/regularization/currentperiods", getCurrentsPeriodsRegularization)

periodsAdminRoutes.post("/createperiod", createPeriod)

periodsAdminRoutes.post("/updateperiod", updatePeriod)

periodsAdminRoutes.delete("/deleteperiod", deletePeriod)

export default periodsAdminRoutes