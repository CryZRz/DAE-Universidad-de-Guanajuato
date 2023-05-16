import jsonwebtoken from "jsonwebtoken"


export function createJwtToken(payload) {
    return new Promise((res, rej) => {
        jsonwebtoken.sign(payload, process.env.KEY_JWT, { algorithm: 'HS256' }, (err, dec) => {
            if(err){
                rej(err)
            }else{
                res(dec)
            }
          })
    })
}

export function validateJwtToken(token){
    return new Promise((res, rej) => {
        jsonwebtoken.verify(token, process.env.KEY_JWT, (err, val) => {
            if (err) {
                rej(err)
            } else {
                res(val)
            }
        })
    })
}