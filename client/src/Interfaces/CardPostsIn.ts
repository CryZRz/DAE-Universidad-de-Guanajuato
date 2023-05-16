interface CardPostDataUserIn{
    id: number,
    name: string,
    lastName: string,
    image: string,
    role: string
}

export interface CommentPostIn {
    commentId: number,
    comment: string,
    date: string,
    userAuthor: CardPostDataUserIn
}

export interface CardPostIn {
    id: number,
    title : string, 
    image : string, 
    date: string,
    userAuthor: CardPostDataUserIn,
    comments : CommentPostIn[]
}