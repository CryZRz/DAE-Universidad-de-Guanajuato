import { poolSiia } from "../../dB.js";

export const getListTeams = async (req, res) => {
    try {
        const {start, end} = req.query
        if (start == undefined || end == undefined) {
            const [getListTeamsDb] = await poolSiia.query("SELECT id, name, semester_id AS semesterId FROM teams LIMIT 10")
            return res.send(getListTeamsDb)
        }

        const [getListTeamsDb] = await poolSiia.query("SELECT id, name, semester_id AS semesterId FROM teams LIMIT ?, ?", [parseInt(start), parseInt(end)])
        return res.send(getListTeamsDb)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}