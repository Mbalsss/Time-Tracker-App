import React from "react";

const TotalHours: React.FC<{ hours: number }> = ({ hours }) => (
  <div className="card">
    <h3>Total Hours</h3>
    <p>{hours.toFixed(2)} hours tracked</p>
  </div>
);

export default TotalHours;
