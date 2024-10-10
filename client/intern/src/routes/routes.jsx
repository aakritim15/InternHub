import LandingPage from "../pages/LandingPage"
import Login from "../pages/Login"
import Signup from '../pages/Signup'
import PostJobForm from './pages/PostJobForm';
    const routes = [
        {
            name: "Dashboard",
            layout: '/',
            path: '/',
            component: <LandingPage/>
        },
        {
            name: "Login",
            layout: '/',
            path: '/login',
            component: <Login/>
        },
        {
            name: "Register",
            layout: '/',
            path: '/register',
            component: <Signup/>
        },
        {
            name: "PostJobForm",
            layout: '/',
            path: '/postjobform',
            component: <PostJobForm/>
        }
    ]


    export default routes