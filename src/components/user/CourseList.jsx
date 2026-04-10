import React from "react";

const CourseList = ({ courses }) => {
  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      {courses && courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button>Enroll</button>
          </div>
        ))
      ) : (
        <p>No courses available yet.</p>
      )}
    </div>
  );
};

export default CourseList;
