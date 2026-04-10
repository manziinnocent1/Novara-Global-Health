import React from "react";

const ProgressTracker = ({ enrolledCourses }) => {
  return (
    <div className="progress-tracker">
      <h2>Your Progress</h2>
      {enrolledCourses && enrolledCourses.length > 0 ? (
        enrolledCourses.map((course) => (
          <div key={course.id} className="progress-item">
            <h3>{course.title}</h3>
            <progress value={course.progress} max="100"></progress>
            <span>{course.progress}% complete</span>
          </div>
        ))
      ) : (
        <p>You haven’t enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default ProgressTracker;
