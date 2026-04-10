import React from "react";

const Analytics = ({ stats }) => {
  return (
    <div className="analytics">
      <h2>Course Analytics</h2>
      {stats ? (
        <div>
          <p>Total Courses: {stats.totalCourses}</p>
          <p>Total Enrolled Users: {stats.totalUsers}</p>
          <p>Average Completion Rate: {stats.avgCompletion}%</p>
        </div>
      ) : (
        <p>No analytics data yet.</p>
      )}
    </div>
  );
};

export default Analytics;
