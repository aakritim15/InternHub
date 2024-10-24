import React from 'react';
import FeaturedJobs from '../components/FeaturedJobs';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
const JobPage = () => {
  return (
    <div>
    <Header />
      <HeroSection />
      <FeaturedJobs />
      <Footer />
    </div>
  )
}

export default JobPage