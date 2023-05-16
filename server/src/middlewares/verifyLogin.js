import {validateJwtToken} from "../helpers/jwtFunctions.js"

export async function verifyLogingMdl(req, res, next){
    if (req.headers.token == undefined) {
        res.status(403).json({
            message: "not valite token or not exist"
        })
    } else {
        try {
            const validateToken = await validateJwtToken(req.headers.token)
            if (validateToken) {
                next()
            }else{
                res.status(403).json({
                    message: "not autization"
                })
            }
        } catch (e) {
            res.sendStatus(500)
        }
    }
}