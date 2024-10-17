import React from 'react';
import '../styles/Components.css';

function Filter() {
  return (
    <div className="filter-container">
      <h3>Filter</h3>
      <div className="filter-group">
        <label>Salary Range</label>
        <input type="range" min="0" max="100000" />
      </div>
      <div className="filter-group">
        <label>Job Type</label>
        <div>
          <input type="checkbox" /> Full-time
          <input type="checkbox" /> Part-time
        </div>
      </div>
      {/* Add more filters as needed */}
      <button className="clear-filters">Clear All</button>
    </div>
  );
}

export default Filter;
