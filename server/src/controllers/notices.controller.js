import { poolSiia } from "../dB.js"

export const getAllNotices = async (req, res) => {
    try {
        const [getNoticesDb] = await poolSiia.query("SELECT * FROM notices")
        if (getNoticesDb.length >= 1) {
            return res.send(getNoticesDb)
        }
        res.status(400).json({
            message: "no news"
        })
    } catch (e) {
        res.sendStatus(500)
    }
}