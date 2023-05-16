import { poolSiia } from "../dB.js"

export const eventsSchool = async (req, res) => {
    try {
        const [getAllEvents] = await poolSiia.query("SELECT * FROM events ORDER BY id DESC")
        if (getAllEvents.length >= 1) {
            res.send(getAllEvents)
        } else {
            res.send({
                message: "no has a events"
            })
        }
    } catch (e) {
        res.sendStatus(500)
    }
}