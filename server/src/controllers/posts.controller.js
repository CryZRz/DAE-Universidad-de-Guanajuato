import { poolSiia } from "../dB.js"
import { validateJwtToken } from "../helpers/jwtFunctions.js"
import { formatPost } from "../helpers/formatPost.js"
import { deleteArchive } from "../helpers/removeArchives.js"

export const getAllPosts = async (req, res) => {
    try {
        const sqlGetAllPosts = "SELECT p.*, u.name AS userName, u.last_name AS userLastName, u.image AS imageUser FROM posts p INNER JOIN users u ON p.user_id = u.id ORDER BY p.id DESC"
        const sqlGetAllComments = "SELECT c.*, u.name, u.last_name, u.role, u.image FROM posts p INNER JOIN comments_posts c ON c.post_id = p.id INNER JOIN users u ON c.user_id = u.id"
        const [getAllStudents] = await poolSiia.query(sqlGetAllPosts)
        const [getAllComments] = await poolSiia.query(sqlGetAllComments)
        if (getAllStudents.length >= 1 || getAllTeachers.length >= 1) {
            const formatSendPost = formatPost(getAllStudents, getAllComments)
            res.json(formatSendPost)
        }else{
            res.status(403).json({
                message: "not have a posts"
            })
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const savePost = async (req, res) => {
    try {
        const {title} = req.body
        const {originalname} = req.file
        const getInfoUser = await validateJwtToken(req.headers.token)
        const [insertPost] = await poolSiia.query("INSERT INTO posts VALUES(null, ?, ?, ?, CURDATE())",[title, originalname, getInfoUser.id])
        if (insertPost.affectedRows >= 1) {
            res.sendStatus(202)
        }else{
            res.status(403).json({
                message: "error saving post"
            })
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const saveComment = async (req, res) => {
    const {postId, comment} = req.body
    if (postId == undefined && comment == undefined) {
        return res.sendStatus(403)
    }
    try {
        const getInfoUser = await validateJwtToken(req.headers.token)
        const [insertComment] = await poolSiia.query("INSERT INTO comments_posts VALUES(null, ?, ?, ?, CURDATE())", [postId, getInfoUser.id, comment])
        if (insertComment.affectedRows >= 1) {
            res.sendStatus(202)
        }else{
            res.status(403).json({
                message : "verify your dates"
            })
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

}

export const deleteComment = async (req, res) => {
    const {commentId, authorCommentId, authorPostId} = req.body
    if (commentId == undefined && authorPostId == undefined && authorCommentId == undefined) {
        return res.sendStatus(403)
    }
    try {
        const getInfoUser = await validateJwtToken(req.headers.token)
        console.log(req.body)
        console.log(getInfoUser)
        if (getInfoUser.id == authorCommentId || getInfoUser.id == authorPostId) {
            const [removeComment] = await poolSiia.query("DELETE FROM comments_posts WHERE id = ?", [commentId])
            if (removeComment.affectedRows >= 1) {
                res.sendStatus(202)
            }else{
                res.status(403).json({
                    message: "check the data"
                })
            }
        }else{
            res.status(403).json({
                message: "You do not have permission to delete the comment"
            })
        }
    } catch (e) {
        console.log(e)
    }
} 

export const updateComment = async (req, res) => {
    const {commentId, comment} = req.body
    if (commentId == undefined && comment == undefined) {
        res.sendStatus(403)
    }
    try {
        const getInfoUser = await validateJwtToken(req.headers.token)
        const [getComment] = await poolSiia.query("SELECT user_id FROM comments_posts WHERE id = ?", [commentId])
        if (getComment) {
            if (getComment[0].user_id == getInfoUser.id) {
                const [updateComment] = await poolSiia.query("UPDATE comments_posts SET text = ? WHERE id = ?", [comment, commentId])
                if (updateComment.affectedRows >= 1) {
                    res.sendStatus(202)
                }else{
                    res.status(403).json({
                        message: "check the data"
                    })
                }
            } else {
                res.status(403).json({
                    message: "you are not the owner of the comment"
                })
            }
        }else{
            res.status(403).json({
                message: "the comment does not exist"
            })
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }

}

export const getPost = async (req, res) => {
    try {
        const sqlGetPost = "SELECT p.*, u.name AS userName, u.last_name AS userLastName, u.image AS imageUser FROM posts p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?"
        const sqlGetAllComments = "SELECT c.*, u.name, u.last_name, u.role, u.image FROM comments_posts c INNER JOIN users u ON c.user_id = u.id WHERE c.post_id = ?"
        
        const [getOnePost] = await poolSiia.query(sqlGetPost, [req.params.id])
        const [getCommentsPost] = await poolSiia.query(sqlGetAllComments, [req.params.id])

        if (getOnePost.length >= 1) {
            const formatDataToSend = formatPost(getOnePost, getCommentsPost)
            res.send(formatDataToSend)
        }else{
            res.status(403).json({
                message: "the post does not exist"
            })
        }
    } catch (e) {
        res.sendStatus(500)
    }
}

export const deletePost = async (req, res) => {
    const {postId} = req.body
    try {
        const getDataUser = await validateJwtToken(req.headers.token)
        const sqlRemoveComment = "DELETE FROM comments_posts WHERE post_id = ?"
        const sqlRemovePost = "DELETE FROM posts WHERE id = ?"
        const [getPostDelete] = await poolSiia.query("SELECT user_id, image FROM posts WHERE id = ?", [postId])
        if (getDataUser.id == getPostDelete[0].user_id) {
            const removeComments = await poolSiia.query(sqlRemoveComment, [postId])
            const [removePost] = await poolSiia.query(sqlRemovePost, [postId])
            if (removePost.affectedRows >= 1) {
                await deleteArchive(getPostDelete[0].image, "/images/posts")
                res.sendStatus(202)
            }else{
                res.status(403).json({
                    message: "check the data"
                })
            }
        }else{
            res.status(403).json({
                message: "you are not the owner of the post"
            })
        }
    } catch (e) {
        res.sendStatus(500)
    }
}

export const updatePost = async (req, res) => {
    const {title, postId} = req.body
    if (title == undefined && postId == undefined) {
        return res.status(403).json({
            message: "check the data"
        })
    }
    try {
        const getDataUser = await validateJwtToken(req.headers.token)
        const [getDataPost] = await poolSiia.query("SELECT user_id, image FROM posts WHERE id = ?", [postId])
        if (getDataPost[0].user_id == getDataUser.id) {
            if (req.file !== undefined) {
                const {originalname} = req.file
                const [updatePost] = await poolSiia.query("UPDATE posts SET title = ?, image = ? WHERE id = ?", [title, originalname, postId])
                if (updatePost.affectedRows >= 1) {
                    await deleteArchive(getDataPost[0].image, "/images/posts")
                    res.sendStatus(202)
                }else{
                    res.status(403).json({
                        message: "check the data"
                    })
                }
            }else{
                const [updatePost] = await poolSiia.query("UPDATE posts SET title = ? WHERE id = ?", [title, postId])
                if (updatePost.affectedRows >= 1) {
                    res.sendStatus(202)
                }else{
                    res.status(403).json({
                        message: "check the data"
                    })
                }
            }
        }else{
            res.status(403).json({
                message: "you are not the owner of the post"
            })
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}