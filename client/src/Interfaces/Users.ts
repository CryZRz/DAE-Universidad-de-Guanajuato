interface UserDataSocialIn {
    name: string,
    link : string
}

export interface UserDataIn {
    token?: string
    email: string,
    id: number,
    lastName: string,
    name: string,
    role: string,
    image: string,
    teamName : string,
    semesterId: number,
    description : string,
    social : UserDataSocialIn[]
}

export interface UsersAdmin {
    id: number
    email: string
    name: string
    lastName: string
    role: string
    image: string
}