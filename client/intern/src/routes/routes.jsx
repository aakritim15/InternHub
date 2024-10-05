    import LandingPage from "../pages/LandingPage"
import Login from "../pages/Login"
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
        }
    ]


    export default routes