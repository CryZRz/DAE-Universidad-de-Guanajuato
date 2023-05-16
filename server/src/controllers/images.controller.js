import {join} from "path";
import fs from "fs/promises"
const {pathname} = new URL('../public', import.meta.url)

export const sendImageProfile = async (req, res) => {
    console.log(req.params)
    if (req.params.name != undefined) {
        try {
            const redImage = await fs.readFile(join(pathname, `/images/profiles/${req.params.name}`))
            const imgb64 = Buffer.from(redImage).toString("base64")
            res.send(imgb64)
        } catch (e) {
            res.sendStatus(500)
        }
    }else{
        res.sendStatus(403)
    }
}