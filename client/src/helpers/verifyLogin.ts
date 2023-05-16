import jsCookie from "js-cookie"
import axios from "axios"
import {UserDataIn} from "../Interfaces/Users"

async function verifyToken(token : string | undefined) : Promise<UserDataIn | boolean> {
    try {
        const sendVeirfyToken = await axios.get("http://localhost:3000/verify", {
            headers : {
                token 
            }
        })
        const resVerifyToken : UserDataIn = sendVeirfyToken.data
        return resVerifyToken

    } catch (e) {
        return false
    }
}

export function verifyLogin() {
    const getCookieToken = jsCookie.get("token")
    if (getCookieToken != undefined) {
        return verifyToken(getCookieToken)
    } else {
        return false
    }
}