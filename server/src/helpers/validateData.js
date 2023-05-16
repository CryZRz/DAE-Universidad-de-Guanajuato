export function validateString(dataList){
    let validate = true
    for (let i = 0; i < dataList.length; i++) {
        const data = dataList[i]
        if (data == undefined || typeof(data) != "string") {
            validate =  false
        }
    }

    return validate
}

export function validateNumber(dataList){
    let validate = true
    for (let i = 0; i < dataList.length; i++) {
        const data = parseInt(dataList[i])
        if (data == undefined || typeof(data) != "number") {
            validate =  false
        }
    }

    return validate
}