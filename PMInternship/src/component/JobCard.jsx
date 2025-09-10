import React from "react";
import "./JobCard.css"; // We'll create this file for styling

const JobCard = ({ job }) => {
  // Destructure the props for easier access
  const { title, company, location, skills, description, salary, id } = job;
  return (
    <div className="job-card">
      <div className="job-header">
        <h2 className="job-title">{title}</h2>
        <p className="company-name">{company}</p>
        <p className="font-bold ">{id}</p>
      </div>

      <div className="job-meta">
        <span className="location">📍 {location}</span>
        <span className="salary">💰 {salary}</span>
      </div>

      <p className="job-description">{description}</p>

      <div className="skills-section">
        <h3 className="skills-heading">Skills Required</h3>
        <div className="skills-container">
          <span>{skills}</span>
        </div>
      </div>

      <div className="job-footer">
        <button className="apply-button">Apply Now</button>
      </div>
    </div>
  );
};

export default JobCard;
