import { poolSiia } from "../dB.js"
import bcryptjs from "bcryptjs"
import { createJwtToken, validateJwtToken } from "../helpers/jwtFunctions.js"

export const loginUser = async (req, res) => {
    const {email, password} = req.body
    if (req.body == undefined && email == undefined && password == undefined) {
        res.send(404)
    }else{
        try {
            const [rowsStudents] = await poolSiia.query("SELECT * FROM users WHERE email = ?", [email])
            if (rowsStudents.length > 0) {
                console.log(rowsStudents[0])
                const veirfyPassword = await bcryptjs.compare(password, rowsStudents[0].password)
                if(veirfyPassword){
                    const jwtStudent = await createJwtToken(rowsStudents[0])
                    return res.send({
                        token: jwtStudent,
                        name: rowsStudents[0].name,
                        lastName: rowsStudents[0].last_name,
                        email: rowsStudents[0].email,
                        userId: rowsStudents[0].id,
                        role : rowsStudents[0].role,

                    }) 
                }else{
                    return res.status(403).json({message: "your email or password is incorrect"})
                }
            }else{
                return res.status(403).json({message: "the email does not exist or is not registered"})
            }
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
}

export const registerUser = async (req, res) => {
    if (req.body == undefined || Object.keys(req.body).length < 6) {
        console.log(req.body)
        res.sendStatus(403)
    }else{
        const {email, password, name, lastName, direction, rol} = req.body
        try {
            const [verifyDuplicateTeachers] = await poolSiia.query("SELECT email FROM users WHERE email = ?",[email])
            if (verifyDuplicateTeachers.length >= 1) {
                return res.status(403).json({
                    message: "email already register"
                })
            }
            if (req.body.rol == "teacher"){
                const passwordHash = await bcryptjs.hash(password, 5)
                await poolSiia.query("INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                [email, passwordHash, name, lastName, direction, null, null, null, null, rol, "default.png", null, null, null])
                res.sendStatus(202)
            }else{
                const passwordHash = await bcryptjs.hash(password, 5)
                await poolSiia.query("INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [email, passwordHash, name, lastName, direction, 1, Math.floor((Math.random() * (23 - 2 + 1)) + 1), rol, "default.png", null, null, null])
                res.sendStatus(202)
            }
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }        
    }
}

export const verifyToken = async (req, res) => {
    try {
        const resultToken = await validateJwtToken(req.headers.token)
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
        } = resultToken
        res.send({
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
    } catch (e) {
        res.sendStatus(404).json({
            message: "not valid token or not has singin"
        })
    }
}