import Login from "../pages/Login";
import PostJobForm from '../pages/PostJobForm';
import Signup from '../pages/Signup';
    const routes = [
        // {
        //     name: "Dashboard",
        //     layout: '/',
        //     path: '/',
        //     component: <LandingPage/>
        // },
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