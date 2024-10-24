import React from "react";
import CreateJobListing from "../pages/CreateJob";
import JobPage from "../pages/JobPage";
import JobSeacrhPage from "../pages/JobSearchPage";
import Login from '../pages/Login';
import ProfileForm from "../pages/ProfileForm";
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
        },
        {
            name: "Register",
            layout: '/',
            path: '/register',
            component: <Signup/>
        },
        {
            name: "JobSeaechPage",
            layout: '/',
            path: '/jobsearchpage',
            component: <JobSeacrhPage/>
        },
        {
            name: "CreateJob",
            layout: '/',
            path: '/createjob',
            component: <CreateJobListing/>
        },
        {
            name: "CreateProfile",
            layout: '/',
            path: '/createprofile',
            component: <ProfileForm/>
        }
        
    ]


    export default routes