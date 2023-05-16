import { poolSiia } from "../dB.js"
import { validateJwtToken} from "../helpers/jwtFunctions.js"
import { deleteArchive } from "../helpers/removeArchives.js"

export const updateInfoUser = async (req, res) => {
    const {userId, name, lastName, description, email, linkFacebook, linkInstagram, linkTwitter} = req.body
    if (req.headers.token == undefined) {
       return res.sendStatus(404)
    }
    else if(Object.keys(req.body).length < 8){
        return res.sendStatus(403)
    }
    try {
        const getIdUser = await validateJwtToken(req.headers.token)
        if (getIdUser && getIdUser.id == userId) {
            console.log(req.body)
            const verifyLinkFacebook = linkFacebook != "" ? linkFacebook : null
            const verifylinkInstagram = linkInstagram != "" ? linkInstagram : null
            const verifylinkTwitter = linkTwitter != "" ? linkTwitter : null
            const sqlUodate = "UPDATE users SET name = ?, last_name = ?, description = ?, email = ?, link_facebook = ?, link_instagram = ?, link_twitter = ? WHERE id = ?"
            const [rowsUpdateStudent] = await poolSiia.query(sqlUodate, [name, lastName, description, email, verifyLinkFacebook, verifylinkInstagram, verifylinkTwitter, userId])
            if (rowsUpdateStudent.affectedRows >= 1) {
                res.status(200).json({
                    message: "User updated"
                })
            }else{
                res.status(403).json({
                    message: "Verify your information"
                })
            }
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const updateImageUser = async (req, res) => {
    console.log("hola")
    try {
        const {originalname} = req.file
        const getInfoUser = await validateJwtToken(req.headers.token)
        if (getInfoUser) {
            const [getOldImage] = await poolSiia.query("SELECT image FROM users WHERE id = ?", getInfoUser.id)
            if (getOldImage[0].image != "default.png") {
                const deleteOldImage = await deleteArchive(getOldImage[0].image, "/images/profiles")
                if (!deleteOldImage) {
                    return res.sendStatus(500)
                }
            }
            const [updateImageUser] = await poolSiia.query("UPDATE users SET image = ? WHERE id = ?",[originalname, getInfoUser.id])
            if (updateImageUser.affectedRows >= 1) {
                res.sendStatus(200)
            } else {
                res.status(403).json({
                    message: "error updating check your data"
                })
            }
        }else{
            res.sendStatus(403)
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}