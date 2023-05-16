import { poolSiia } from "../../dB.js";

export const getAllSchedules = async (req, res) => {
    try {
        const {start, end} = req.query
        if (start == undefined, end == undefined) {
            const [getListSchedules] = await poolSiia.query("SELECT id, day, start_time AS startTime, end_time AS endTime, subject_course_id AS courseId FROM schedule_subjects LIMIT 10")
            return res.send(getListSchedules)
        }

        const [getListSchedules] = await poolSiia.query("SELECT id, day, start_time AS startTime, end_time AS endTime, subject_course_id AS courseId FROM schedule_subjects ORDER BY id DESC LIMIT ?, ?", [parseInt(start), parseInt(end)])
            return res.send(getListSchedules)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const updateSchedules = async (req, res) => {
    try {
        const {listSchedulesAdd, listSchedulesRemove, listSchedulesEdit, courseId} = req.body

        if (
            listSchedulesAdd == undefined, 
            listSchedulesRemove == undefined, 
            listSchedulesEdit == undefined,
            courseId == undefined
            ) {
            return res.sendStatus(400)
        }

        const connection = await poolSiia.getConnection()
        await connection.beginTransaction()

        if (listSchedulesAdd.length > 0) {
            for (let i = 0; i < listSchedulesAdd.length; i++) {
                const scheduleAdd = listSchedulesAdd[i];
                await connection.query("INSERT INTO schedule_subjects VALUES(null, ?, ?, ?, ?)", [scheduleAdd.name, scheduleAdd.rows[0].startTime, scheduleAdd.rows[0].endTime, courseId])
            }    
        }
        if (listSchedulesRemove.length) {
            for (let i = 0; i < listSchedulesRemove.length; i++) {
                const scheduleRemove = listSchedulesRemove[i];
                await connection.query("DELETE FROM schedule_subjects WHERE id = ?", [scheduleRemove.rows[0].id])
            }
        }
        if (listSchedulesEdit.length > 0) {
            for (let i = 0; i < listSchedulesEdit.length; i++) {
                const scheduleEdit = listSchedulesEdit[i];

                await connection.query("UPDATE schedule_subjects SET day = ?, start_time = ?, end_time = ? WHERE id = ?", [scheduleEdit.name, scheduleEdit.rows[0].startTime, scheduleEdit.rows[0].endTime, scheduleEdit.rows[0].id])
            }
        }

        await connection.commit()
        connection.release()
        return res.sendStatus(202)
        
    } catch (e) {
        await connection.rollback();
        connection.release();
        res.sendStatus(500)
    }
}