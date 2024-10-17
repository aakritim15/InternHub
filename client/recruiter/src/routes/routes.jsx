import JobPage from "../pages/JobPage";
import Login from "../pages/Login";
import JobSeacrhPage from "../pages/JobSearchPage"
import Signup from "../pages/Signup";
    const routes = [
        {
            name: "Dashboard",
            layout: '/',
            path: '/',
            component: <JobPage/>
        },
        {
            name: "Login",
            layout: '/',
            path: '/login',
            component: <Login/>
        },{
            name: "Register",
            layout: '/',
            path: '/register',
            component: <Signup/>
        },
        {
            name: "JobSeacrhPage",
            layout: '/',
            path: '/jobsearchpage',
            component: <JobSeacrhPage/>
        }
        
    ]


    export default routes