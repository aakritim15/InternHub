import React from 'react';
import AppliedJobs from '../pages/AppliedJobs';
import InternStatusPage from '../pages/InternStatusPage';
import JobPage from "../pages/JobPage";
import Login from "../pages/Login";
import PostJobForm from '../pages/PostJobForm';
import Profile from '../pages/ProfileForm';
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
            // protected: true
        },
        {
            name: "PostJobForm",
            layout: '/',
            path: '/postjobform',
            component: <PostJobForm/>,
            protected: true
        },
        {
            name: "InternStatusPage",
            layout: '/',
            path: '/internstatuspage',
            component: <InternStatusPage/>,
            // protected: true
        },
        {
            name: "CreateProfile",
            layout: '/',
            path: '/createprofile',
            component: <Profile/>,
            protected: true
        },
        {
            name: "AppliedJobs",
            layout: '/',
            path: '/appliedjobs',
            component: <AppliedJobs/>,
            protected:true
        }
        
    ]


    export default routes