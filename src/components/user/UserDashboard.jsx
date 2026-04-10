import React from "react";

const UserDashboard = () => {
  const courses = [
    {
      id: 1,
      title: "Intro to Health",
      description: "Basics of healthy living",
      progress: 40,
    },
    {
      id: 2,
      title: "Nutrition 101",
      description: "Learn about balanced diets",
      progress: 70,
    },
    {
      id: 3,
      title: "Mental Wellness",
      description: "Strategies for stress and balance",
      progress: 20,
    },
  ];

  const user = { name: "John Doe", email: "john@example.com" };

  return (
    <div className="dashboard user-dashboard">
      <h1>Welcome, {user.name}</h1>

      {/* Courses Section */}
      <section className="dashboard-section">
        <h2>Available Courses</h2>
        <div className="course-list">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="btn btn-primary">Enroll</button>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Section */}
      <section className="dashboard-section">
        <h2>Your Progress</h2>
        {courses.map((course) => (
          <div key={course.id} className="progress-item">
            <h3>{course.title}</h3>
            <progress value={course.progress} max="100"></progress>
            <span>{course.progress}% Complete</span>
          </div>
        ))}
      </section>

      {/* Profile Section */}
      <section className="dashboard-section profile-card">
        <h2>Profile</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <button className="btn btn-secondary">Edit Profile</button>
      </section>

      Mission Section
      {/* <section className="dashboard-section mission-card">
        <h2>Our Mission</h2>
        <p>
          Novara Global Health is dedicated to empowering individuals with
          accessible health education and innovative digital tools. Our goal is
          to make wellness achievable for everyone, everywhere.
        </p>
      </section> */}

      {/* Community Section */}
      {/* <section className="dashboard-section community-card">
        <h2>Community & Support</h2>
        <p>
          Connect with peers, share your progress, and learn from healthcare
          professionals across the globe.
        </p>
        <button className="btn btn-secondary">Join Community</button>
      </section> */}
    </div>
  );
};

export default UserDashboard;
