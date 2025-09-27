import React from "react";
import "./CounsellingSupport.css";

function CounsellingSupport() {
  return (
    <div className="counselling-support-container">
      <div className="counselling-support-content">
        <h3>Need Counselling or Support?</h3>
        <p>
          Our expert advisors are here to help you with college choices, exam stress, and career planning.
        </p>
        <div className="counselling-support-actions">
          <button className="counselling-btn">Book a Free Session</button>
          <a href="mailto:support@pathfinder.com" className="support-link">
            <i className="fa fa-envelope"></i> Email Support
          </a>
        </div>
        <div className="counselling-support-note">
          <i className="fa fa-info-circle"></i> Confidential and student-friendly support, 24x7.
        </div>
      </div>
    </div>
  );
}

export default CounsellingSupport;
