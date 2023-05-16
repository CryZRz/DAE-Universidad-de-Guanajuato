import { Router } from "express";
import { loginUser, registerUser, verifyToken } from "../controllers/loginRegister.controller.js";

const routerLoginAndRegisterUsers = Router();

routerLoginAndRegisterUsers.post("/login", loginUser)
routerLoginAndRegisterUsers.post("/register", registerUser)
routerLoginAndRegisterUsers.get("/verify", verifyToken)

export default routerLoginAndRegisterUsers