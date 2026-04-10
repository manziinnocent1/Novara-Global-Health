import React from "react";

const DoctorDashboard = () => {
  const courses = [
    {
      id: 1,
      title: "Advanced Cardiology",
      description:
        "Deep dive into cardiovascular health and treatment strategies.",
      image: "/assets/cardiology.jpg", // placeholder image path
    },
    {
      id: 2,
      title: "Mental Health Awareness",
      description:
        "Understanding mental health challenges and effective support methods.",
      image: "/assets/mentalhealth.jpg",
    },
    {
      id: 3,
      title: "Nutrition & Wellness",
      description:
        "Explore balanced diets and holistic approaches to healthy living.",
      image: "/assets/nutrition.jpg",
    },
  ];

  const users = [
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      course: "Cardiology",
      progress: 60,
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      course: "Mental Health",
      progress: 30,
    },
  ];

  const stats = { totalCourses: 3, totalUsers: 2, avgCompletion: 45 };

  return (
    <div className="dashboard doctor-dashboard">
      <h1>Welcome, Doctor</h1>

      {/* Course Management */}
      <section className="dashboard-section">
        <h2>Manage Courses</h2>
        <button className="btn btn-primary">Add New Course</button>
        <div className="course-list">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <img
                src={course.image}
                alt={course.title}
                className="course-image"
              />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-actions">
                <button className="btn btn-secondary">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* User Management */}
      <section className="dashboard-section">
        <h2>Enrolled Users</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.course}</td>
                <td>
                  <progress value={user.progress} max="100"></progress>
                  <span>{user.progress}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Analytics */}
      <section className="dashboard-section analytics-card">
        <h2>Course Analytics</h2>
        <div className="analytics-grid">
          <div className="analytics-item">
            <h3>{stats.totalCourses}</h3>
            <p>Total Courses</p>
          </div>
          <div className="analytics-item">
            <h3>{stats.totalUsers}</h3>
            <p>Total Enrolled Users</p>
          </div>
          <div className="analytics-item">
            <h3>{stats.avgCompletion}%</h3>
            <p>Average Completion Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboard;
