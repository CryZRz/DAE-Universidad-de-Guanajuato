export interface CardProfileIn {
    userId : number,
    profileId?: number,
    image : string, 
    name : string,
    lastName: string,
    role : string,
    team: string,
    semester?: number,
    email: string,
    description: string,
    btnEditProfile : (p : boolean) => void,
    linkFacebook: string,
    linkInstagram: string,
    linkTwitter: string,
    updateInfo?: () => Promise<void> 
}