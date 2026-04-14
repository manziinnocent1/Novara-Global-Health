import React from "react";
import { BookOpen, Award, BarChart3, ArrowRight } from "lucide-react";
// Import your existing files
import CourseList from "./CourseList.jsx";
import ProgressTracker from "./ProgressTracker.jsx";
import UserProfile from "./UserProfile.jsx";

const UserDashboard = ({ route }) => {
  const courses = [
    {
      id: 1,
      title: "Intro to Health",
      desc: "Basics of healthy living",
      prog: 40,
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "Nutrition 101",
      desc: "Learn about balanced diets",
      prog: 70,
      color: "#10b981",
    },
    {
      id: 3,
      title: "Mental Wellness",
      desc: "Strategies for stress and balance",
      prog: 20,
      color: "#8b5cf6",
    },
  ];

  const user = { name: "John Doe", email: "john@example.com" };

  // --- CHANGED ONLY THIS: Component Switcher ---
  const renderContent = () => {
    if (route.includes("#courses")) return <CourseList courses={courses} />;
    if (route.includes("#progress"))
      return <ProgressTracker enrolledCourses={courses} />;
    if (route.includes("#profile")) return <UserProfile user={user} />;

    // Original Dashboard View (Home)
    return (
      <div className="container">
        <header className="dashboard-welcome">
          <div className="welcome-text">
            <h1>Welcome back, {user.name} 👋</h1>
            <p>You have 3 active courses and 1 pending certification.</p>
          </div>
          {/* FIX: Use 'quick-actions' class to separate these buttons in CSS */}
          <div className="quick-actions">
            <a href="#/user-dashboard#profile" className="btn btn-secondary">
              Edit Profile
            </a>
            <a href="#/user-dashboard#courses" className="btn btn-primary">
              Start New Course
            </a>
          </div>
        </header>

        <div className="modern-stats-row">
          <div className="stat-box">
            <div className="stat-circle blue">
              <BookOpen size={20} />
            </div>
            <div className="stat-info">
              <span className="label">Courses</span>
              <span className="value">03</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-circle green">
              <Award size={20} />
            </div>
            <div className="stat-info">
              <span className="label">Completed</span>
              <span className="value">12</span>
            </div>
          </div>
          <div className="stat-box">
            <div className="stat-circle purple">
              <BarChart3 size={20} />
            </div>
            <div className="stat-info">
              <span className="label">Hours</span>
              <span className="value">24.5h</span>
            </div>
          </div>
        </div>

        <section className="dashboard-main-content">
          <div className="section-header">
            <h2>Current Learning Path</h2>
            <button className="text-btn">
              View all courses <ArrowRight size={16} />
            </button>
          </div>

          <div className="modern-course-grid">
            {courses.map((course) => (
              <div key={course.id} className="premium-card">
                {/* NEW: Image/Icon Section to match the team cards */}
                <div
                  className="card-image-wrap"
                  style={{ backgroundColor: `${course.color}15` }}
                >
                  <BookOpen size={48} style={{ color: course.color }} />
                  <div className="card-overlay-tag">Active</div>
                </div>

                <div className="card-content-body">
                  <div
                    className="card-top"
                    style={{ borderBottomColor: course.color }}
                  >
                    <span className="category-tag">Health</span>
                    <h3>{course.title}</h3>
                  </div>
                  <div className="card-mid">
                    <p>{course.desc}</p>
                    <div className="progress-group">
                      <div className="progress-meta">
                        <span>Progress</span>
                        <span
                          style={{ fontWeight: "700", color: course.color }}
                        >
                          {course.prog}%
                        </span>
                      </div>
                      <div className="bar-bg">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${course.prog}%`,
                            backgroundColor: course.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button className="card-action-btn">Continue</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  return <div className="full-page-dashboard">{renderContent()}</div>;
};

export default UserDashboard;
