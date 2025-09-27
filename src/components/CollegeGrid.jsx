import React from "react";
import CollegeCard from "./CollegeCard";
import "./CollegeGrid.css";

function CollegeGrid({ colleges }) {
  if (!colleges.length) return <div style={{textAlign:'center',margin:'2rem'}}>No colleges found.</div>;
  return (
    <div className="college-grid">
      {colleges.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </div>
  );
}

export default CollegeGrid;
