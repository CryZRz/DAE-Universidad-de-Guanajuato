import { Router } from "express"
import { getAllPosts, savePost, saveComment, deleteComment, updateComment, getPost, deletePost, updatePost } from "../controllers/posts.controller.js"
import { uploadOneImagePosts } from "../middlewares/uploadFiles.js"

const postsRoutes = Router()

postsRoutes.get("/posts", getAllPosts)

postsRoutes.post("/post/save", uploadOneImagePosts, savePost)

postsRoutes.get("/post/:id", getPost)

postsRoutes.delete("/post/delete", deletePost)

postsRoutes.put("/post/update", uploadOneImagePosts, updatePost)

postsRoutes.post("/save/comment", saveComment)

postsRoutes.delete("/delete/comment", deleteComment)

postsRoutes.put("/update/comment", updateComment)

export default postsRoutes