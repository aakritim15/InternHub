import React from 'react';
import Filter from '../components/Filter';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';
import Header from '../components/Header';
import '../styles/Components.css';

function JobSearchPage() {
  return (
    
    <div className="job-search-container">
      <Header />
      <h1>Job Search</h1>
      <p>Search for your desired job matching your skills</p>
      <div className="search-bar">
        <input type="text" placeholder="Enter Job Title" />
        <input type="text" placeholder="Enter Location" />
        <input type="text" placeholder="Years of Experience" />
        <button>Search</button>
      </div>

      <div className="content">
        <Filter />
        <div className="job-listings">
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
      <Pagination />
    </div>
  );
}

export default JobSearchPage;
