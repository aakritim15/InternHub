import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedJobs from '../components/FeaturedJobs';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import '../styles/FeaturedJobs.css';
import ProfileForm from './ProfileForm';
const JobPage = () => {
  return (
    <div>
    <Header />
      <HeroSection />
      <FeaturedJobs />
      <Footer />
      <Link to={<ProfileForm/>} >go to createProfile</Link>
    </div>
  )
}

export default JobPage