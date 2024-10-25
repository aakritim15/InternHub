// src/routes.jsx
import React from "react";
import CreateJobListing from "../pages/CreateJob";
import JobApplicants from "../pages/JobApplicants"; // Import the JobApplicants component
import JobPage from "../pages/JobPage";
import JobSearchPage from "../pages/JobSearchPage";
import Login from '../pages/Login';
import MyJobs from "../pages/MyJobs";
import ProfileForm from "../pages/ProfileForm";
import Signup from "../pages/Signup";

const routes = [
    {
        name: "Dashboard",
        layout: '/',
        path: '/',
        component: <JobPage />,
        protected: true
    },
    {
        name: "Login",
        layout: '/',
        path: '/login',
        component: <Login />
    },
    {
        name: "Register",
        layout: '/',
        path: '/register',
        component: <Signup />
    },
    {
        name: "JobSearchPage",
        layout: '/',
        path: '/jobsearchpage',
        component: <JobSearchPage />,
        protected: true
    },
    {
        name: "CreateJob",
        layout: '/',
        path: '/createjob',
        component: <CreateJobListing />,
        protected: true
    },
    {
        name: "CreateProfile",
        layout: '/',
        path: '/createprofile',
        component: <ProfileForm />,
        protected: true
    },
    {
        name: "MyJobs",
        layout: '/',
        path: "/myJobs",
        component: <MyJobs />,
        protected: true
    },
    {
        name: "JobApplicants",
        layout: '/',
        path: "/jobs/:jobId/applicants",
        component: <JobApplicants />, // The component to show job applicants
        protected: true // Assuming you want this route to be protected as well
    }
];

export default routes;
