import React from 'react';
import './App.css';
import Header from './pages/Header';
import HeroSection from './pages/HeroSection';
import FeaturedJobs from './pages/FeaturedJobs';
import Footer from './pages/Footer';
// import Signup from './pages/Signup';
function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <FeaturedJobs />
      <Footer />
      
    </div>
  );
}

export default App;
