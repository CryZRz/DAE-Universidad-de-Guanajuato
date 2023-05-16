import { validateJwtToken } from "../helpers/jwtFunctions.js"

const verifyAdmin = async (req, res, next) => {
    if (req.headers.token == undefined) {
        return res.status(403).json({
            message: "not valite token or not exist"
        })
    }
    try {
        const getDataUser = await validateJwtToken(req.headers.token)
        console.log(getDataUser)
        if (getDataUser.role != "admin") {
            return res.status(403).json({
                message: "not autization"
            })
        }

        return next()
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}


export default verifyAdmin