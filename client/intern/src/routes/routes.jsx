import JobPage from "../pages/JobPage";
import Login from "../pages/Login";
import PostJobForm from '../pages/PostJobForm';
import Signup from '../pages/Signup';
    const routes = [
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
            name: "Dashboard",
            layout: '/',
            path: '/',
            component: <JobPage/>,
            protected: true
        },
        {
            name: "PostJobForm",
            layout: '/',
            path: '/postjobform',
            component: <PostJobForm/>,
            protected: true
        }
    ]


    export default routes