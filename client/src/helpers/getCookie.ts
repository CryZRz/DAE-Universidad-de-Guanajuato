import jscookie from "js-cookie"

export function getCookie(name : string ) : string | undefined{
    const token  = jscookie.get("token")
    if (token != undefined) {
        return token
    }

    return undefined
}