import { poolSiia } from "../../dB.js"
import { validateString, validateNumber } from "../../helpers/validateData.js"

export const getAllPeriods = async (req, res) => {
    try {
        const {start, end} = req.query
        if (start == undefined || end == undefined) {
            const [getListPeriods] = await poolSiia.query("SELECT id, name, start_date AS startDate, end_date AS endDate, type_of_period AS typeOfPeriod FROM periods LIMIT 10")
            return res.send(getListPeriods)
        }

        const [getListPeriods] = await poolSiia.query("SELECT id, name, start_date AS startDate, end_date AS endDate, type_of_period AS typeOfPeriod FROM periods LIMIT ?, ?", [parseInt(start), parseInt(end)])
        return res.send(getListPeriods)
    } catch (e) {
        res.sendStatus(500)
    }
}

export const getCurrentsPeriods = async (req, res) => {
    try {
        const [getListCurrentPeriods] = await poolSiia.query("SELECT id, name, start_date AS startDate, end_date AS endDate, type_of_period AS typeOfPeriod FROM periods WHERE end_date > NOW()")
        if (getListCurrentPeriods.length > 0) {
            return res.send(getListCurrentPeriods)
        }

        return res.status(400).json({
            message: "not periods"
        })
    } catch (e) {
        res.sendStatus(500)
    }
}

export const getCurrentsPeriodsRegularization = async (req, res) => {
    try {
        const [getListCurrentPeriods] = await poolSiia.query("SELECT id, name, start_date AS startDate, end_date AS endDate, type_of_period AS typeOfPeriod FROM periods WHERE end_date > NOW() AND type_of_period = 'REGULARIZACION'")
        if (getListCurrentPeriods.length > 0) {
            return res.send(getListCurrentPeriods)
        }

        return res.status(400).json({
            message: "not periods"
        })
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const createPeriod = async (req, res) => {
    try {
        const {name, startDate, endDate, typeOfPeriod} = req.body
        const [savePeriodDb] = await poolSiia.query("INSERT INTO periods VALUES(null, ?, ?, ?, ?)", [name, startDate, endDate, typeOfPeriod])
        if (savePeriodDb.affectedRows > 0) {
            return res.sendStatus(200)
        }

        return res.status(400).json({
            message: "verify your data"
        })
    } catch (e) {
        res.sendStatus(500)
    }
}

export const updatePeriod = async (req, res) => {
    try {
        const {periodId, name, startDate, endDate, typeOfPeriod} = req.body
        console.log(req.body)
        if (!validateString([name, startDate, endDate, typeOfPeriod]) || !validateNumber([periodId])) {
            return res.sendStatus(404)
        }

        const [updatePeriodDb] = await poolSiia.query("UPDATE periods SET name = ?, start_date = ?, end_date = ?, type_of_period = ? WHERE id = ?", [name, startDate, endDate, typeOfPeriod, periodId])
        if (updatePeriodDb.affectedRows > 0) {
            return res.sendStatus(202)
        }

        return res.status(400).json({
            message: "verify your data"
        })
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const deletePeriod = async (req, res) => {
    try {
        const {periodId} = req.body
        if (!validateNumber([periodId])) {
            return res.sendStatus(404)
        }

        const [deletePeriodDb] = await poolSiia.query("DELETE FROM periods WHERE id = ?", [periodId])
        if (deletePeriodDb.affectedRows > 0) {
            return res.sendStatus(202)
        }

        return res.status(400).json({
            message: "verify your data"
        })
    } catch (e) {
        res.sendStatus(500)
    }
}