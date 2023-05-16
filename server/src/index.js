import express from "express"
import routerLoginAndRegisterUsers from "./routes/loginRegister.routes.js"
import routesHome from "./routes/home.routes.js";
import cors from "cors"
import bodyParser from "body-parser"
import {join} from "path"
import {config} from "dotenv"
config()
import {verifyLogingMdl} from "./middlewares/verifyLogin.js"
import imagesRoutes from "./routes/images.routes.js";
import updateInfoUsersRouter from "./routes/updateInfoUser.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import usersInfoRoutes from "./routes/usersInfo.routes.js"
import subjectsRoutes from "./routes/subjects.routes.js";
import noticesRoutes from "./routes/notices.routes.js";

//admin imports
import verifyAdmin from "./middlewares/verifyAdmin.js";
import usersAdminRoutes from "./routes/adminRoutes/users.routes.js";
import subjectsAdminRoutes from "./routes/adminRoutes/subjects.routes.js";
import coursesAdminRoutes from "./routes/adminRoutes/courses.routes.js";
import teamsAdminRoutes from "./routes/adminRoutes/teams.routes.js";
import periodsAdminRoutes from "./routes/adminRoutes/periods.routes.js";
import schedulesAdminRoutes from "./routes/adminRoutes/schedules.routes.js";

const {pathname} = new URL('../src', import.meta.url)

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use("/static", express.static(join(pathname, "/public")))

app.get("/", (req, res) => {
    res.send("hello world")
})

app.use(routerLoginAndRegisterUsers)

app.use(verifyLogingMdl)

app.use(imagesRoutes)

app.use(routesHome)

app.use(updateInfoUsersRouter)

app.use(usersInfoRoutes)

app.use(postsRoutes)

app.use(subjectsRoutes)

app.use(noticesRoutes)

/* Admin routes */
app.use(verifyAdmin)

app.use("/admin", usersAdminRoutes)

app.use("/admin", subjectsAdminRoutes)

app.use("/admin", coursesAdminRoutes)

app.use("/admin", teamsAdminRoutes)

app.use("/admin", periodsAdminRoutes)

app.use("/admin", schedulesAdminRoutes)

app.listen(process.env.port || 3000)


console.log("server on port 3000")