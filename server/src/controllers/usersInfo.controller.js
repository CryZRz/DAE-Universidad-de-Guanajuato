import { poolSiia } from "../dB.js"
import { createJwtToken, validateJwtToken } from "../helpers/jwtFunctions.js"

export const refreshInfoUser = async (req, res) => {
    try {
        const getInfoUser = await validateJwtToken(req.headers.token)
        const [rowsStudents] = await poolSiia.query("SELECT * FROM users WHERE id = ?", [getInfoUser.id])
        if (rowsStudents.length > 0) {
            const jwtStudent = await createJwtToken(rowsStudents[0])
            const {
                id, 
                email, 
                name, 
                last_name, 
                role, 
                image, 
                teamName, 
                semester_id, 
                description,
                link_facebook,
                link_twitter,
                link_instagram
            } = rowsStudents[0]
            console.log(rowsStudents[0])
            res.send({
                token: jwtStudent,
                id,
                email,
                name,
                lastName: last_name,
                role,
                image,
                teamName,
                semesterId: semester_id,
                description: description != null ? description : "",
                social: [{
                    name: "Facebook",
                    link: link_facebook != null ? link_facebook : ""
                },
                {
                    name: "Instagram",
                    link: link_instagram != null ? link_instagram : ""
                },
                {
                    name: "Twitter",
                    link: link_twitter != null ? link_twitter : ""
                }]
            })
        }
        console.log(rowsStudents)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
    
}

export const searchDataUser = async (req, res) => {
    if (req.params.id == undefined) {
        return res.sendStatus(404)
    }
    try {
        const [searchUser] = await poolSiia.query("SELECT * FROM users WHERE id = ?", [req.params.id])
        if (searchUser.length >= 1 && searchUser[0].role == "student") {
            const [getGruopUser] = await poolSiia.query("SELECT t.name AS teamName FROM teams t WHERE t.id = ?", [searchUser[0].team_id])
            const {
                id, 
                email, 
                name, 
                last_name, 
                role, 
                image, 
                teamName, 
                semester_id, 
                description,
                link_facebook,
                link_twitter,
                link_instagram
            } = searchUser[0]
            res.send({
                id,
                email,
                name,
                lastName: last_name,
                role,
                image,
                teamName: getGruopUser[0].teamName,
                semesterId: semester_id,
                description: description != null ? description : "",
                social: [{
                    name: "Facebook",
                    link: link_facebook != null ? link_facebook : ""
                },
                {
                    name: "Instagram",
                    link: link_instagram != null ? link_instagram : ""
                },
                {
                    name: "Twitter",
                    link: link_twitter != null ? link_twitter : ""
                }]
            })
        }
        else if (searchUser.length >= 1 && searchUser[0].role != "student") {
            const {
                id, 
                email, 
                name, 
                last_name, 
                role, 
                image, 
                description,
                link_facebook,
                link_twitter,
                link_instagram
            } = searchUser[0]
            res.send({
                id,
                email,
                name,
                lastName: last_name,
                role,
                image,
                description: description != null ? description : "",
                social: [{
                    name: "Facebook",
                    link: link_facebook != null ? link_facebook : ""
                },
                {
                    name: "Instagram",
                    link: link_instagram != null ? link_instagram : ""
                },
                {
                    name: "Twitter",
                    link: link_twitter != null ? link_twitter : ""
                }]
            })
        }else{
            res.status(404).json({
                message: "User not exist"
            })
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}