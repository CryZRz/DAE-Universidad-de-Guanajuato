import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { VerifyLoginContext } from './context/Context'
import LoginPage from './pages/Login'
import Profile from './pages/Profile'
import Post from './pages/Post'
import Home from './pages/Home'
import Proceedings from './pages/Proceedings'
import UpsAndDowns from './pages/UpsAndDowns'
import Posts from './pages/Posts'
import Credential from './pages/Credential'
import Notices from './pages/Notices'
import Events from './pages/Events'
import Users from './pages/adminPages/Users'
import User from './pages/adminPages/User'
import Periods from './pages/adminPages/Periods'
import Menu from './pages/Menu'
import Courses from './pages/adminPages/Courses'
import Subjects from './pages/adminPages/Subjects'
import Schedules from './pages/adminPages/Schedules'


function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<LoginPage/>}
          />
          <Route
            path='/inicio'
            element={
              <VerifyLoginContext>
                <Home/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/altasbajas'
            element={
              <VerifyLoginContext>
                <UpsAndDowns/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/kardex'
            element={
              <VerifyLoginContext>
                <Proceedings/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/profile/:id'
            element={
            <VerifyLoginContext>
              <Profile/>
            </VerifyLoginContext>
            }
          />
          <Route
            path='/publicaciones'
            element={
              <VerifyLoginContext>
                <Posts/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/post/:id'
            element={
            <VerifyLoginContext>
              <Post/>
            </VerifyLoginContext>
            }
          />
          <Route
            path='/credencial'
            element={
              <VerifyLoginContext>
                <Credential/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/avisos'
            element={
              <VerifyLoginContext>
                <Notices/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/eventos'
            element={
              <VerifyLoginContext>
                <Events/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/regularizaciones'
            element={
              <VerifyLoginContext>
                <Events/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/menu'
            element={
              <VerifyLoginContext>
                <Menu/>
              </VerifyLoginContext>
            }
          />

          /*admin routes */
          <Route
            path='/periodos'
            element={
              <VerifyLoginContext>
                <Periods/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/usuarios'
            element={
              <VerifyLoginContext>
                <Users/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/usuario/:id'
            element={
              <VerifyLoginContext>
                <User/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/cursos'
            element={
              <VerifyLoginContext>
                <Courses/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/materias'
            element={
              <VerifyLoginContext>
                <Subjects/>
              </VerifyLoginContext>
            }
          />
          <Route
            path='/horarios'
            element={
              <VerifyLoginContext>
                <Schedules/>
              </VerifyLoginContext>
            }
          />
        </Routes>
      </BrowserRouter>
    )
}

export default App
