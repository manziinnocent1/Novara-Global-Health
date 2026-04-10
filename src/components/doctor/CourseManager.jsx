import React from "react";

const CourseManager = ({ courses }) => {
  return (
    <div className="course-manager">
      <h2>Manage Courses</h2>
      <button>Add New Course</button>
      {courses && courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))
      ) : (
        <p>No courses created yet.</p>
      )}
    </div>
  );
};

export default CourseManager;
