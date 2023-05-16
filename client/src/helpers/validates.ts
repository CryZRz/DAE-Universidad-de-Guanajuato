export const validateEmail = (email : string) : boolean => {
    const regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    if (regexEmail.test(email)) {
      return true
    }

    return false
}