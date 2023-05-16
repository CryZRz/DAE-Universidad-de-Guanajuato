export interface LoginUser {
    email: string,
    password:string
}

export interface RegisterUser {
    name: string,
    lastName: string,
    email: string,
    password: string,
    direction : string,
    rol: string,
}

export interface resDataLogin {
    token: string,
    name: string,
    lastName: string,
    email: string,
    userId: string
}

export interface dataUser{
    userName: string,
    userLastName : string,
    userToken: string,
    userEmial: string,
}