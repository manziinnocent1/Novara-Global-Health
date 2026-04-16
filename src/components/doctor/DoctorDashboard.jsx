import React, { useState } from "react"; // Added useState
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom"; // Added useNavigate
import {
  Users,
  BookOpen,
  Activity,
  Plus,
  Filter,
  MoreHorizontal,
  Download,
  TrendingUp,
} from "lucide-react";

import CourseManager from "./CourseManager";
import UserManagement from "./UserManagement";
import Analytics from "./Analytics";

const DashboardHomeContent = ({ stats, courses, users, onDeleteCourse }) => {
  const navigate = useNavigate();

  return (
    <div className="container animate-fadeIn">
      <header className="dashboard-header-modern">
        <div className="welcome-area">
          <h1 className="gradient-text">Doctor's Command Center</h1>
          <p>Monitor curriculum performance and student clinical progress.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary-sm">
            <Download size={16} /> Export Data
          </button>
          {/* Navigation to Course Manager to create new */}
          <button
            className="btn-primary-sm"
            onClick={() => navigate("/doctor-dashboard/courses")}
          >
            <Plus size={16} /> Create Course
          </button>
        </div>
      </header>

      {/* Stats Grid Remains Same */}
      <div className="insights-grid">
        <div className="insight-mini-card">
          <div className="insight-icon blue">
            <BookOpen size={20} />
          </div>
          <div className="insight-details">
            <span className="label">Active Courses</span>
            <span className="value">{courses.length}</span>
          </div>
        </div>
        <div className="insight-mini-card">
          <div className="insight-icon green">
            <Users size={20} />
          </div>
          <div className="insight-details">
            <span className="label">Total Students</span>
            <span className="value">{users.length}</span>
          </div>
        </div>
        <div className="insight-mini-card">
          <div className="insight-icon purple">
            <Activity size={20} />
          </div>
          <div className="insight-details">
            <span className="label">Avg. Progress</span>
            <span className="value">{stats.avgCompletion}%</span>
            <span className="trend positive">
              <TrendingUp size={12} /> +4%
            </span>
          </div>
        </div>
      </div>

      <section className="dashboard-section-modern">
        <div className="section-title-bar">
          <h2>Curriculum Management</h2>
          <button
            className="link-btn"
            onClick={() => navigate("/doctor-dashboard/courses")}
          >
            Manage All <Filter size={14} />
          </button>
        </div>
        <div className="doctor-course-grid">
          {courses.map((course) => (
            <div key={course.id} className="doctor-course-card">
              <div
                className="course-card-image"
                style={{
                  backgroundImage: `url(${course.image})`,
                  backgroundColor: "#f0f4f8",
                }}
              >
                <span className="student-badge">
                  {course.students} enrolled
                </span>
              </div>
              <div className="course-card-info">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-card-actions">
                  {/* Redirects to Editor view in CourseManager */}
                  <button
                    className="btn-edit"
                    onClick={() => navigate("/doctor-dashboard/courses")}
                  >
                    Edit
                  </button>
                  {/* Calls the delete function passed via props */}
                  <button
                    className="btn-delete"
                    onClick={() => onDeleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clinical Student Progress Table remains same */}
      <section className="dashboard-section-modern">
        <div className="section-title-bar">
          <h2>Clinical Student Progress</h2>
        </div>
        <div className="modern-table-container">
          <table className="doctor-user-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Assigned Course</th>
                <th>Clinical Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info-cell">
                      <div className="user-avatar-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="course-tag">{user.course}</span>
                  </td>
                  <td>
                    <div className="table-progress-wrap">
                      <div className="bar-bg">
                        <div
                          className="bar-fill"
                          style={{ width: `${user.progress}%` }}
                        ></div>
                      </div>
                      <span>{user.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <button className="icon-btn-ghost">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const DoctorDashboard = () => {
  // 1. Move static data into State
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced Cardiology",
      description: "Deep dive into cardiovascular health.",
      image: "/assets/cardiology.jpg",
      students: 12,
      status: "Published",
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "Mental Health Awareness",
      description: "Understanding mental health challenges.",
      image: "/assets/mentalhealth.jpg",
      students: 8,
      status: "Published",
      color: "#10b981",
    },
    {
      id: 3,
      title: "Nutrition & Wellness",
      description: "Explore balanced diets.",
      image: "/assets/nutrition.jpg",
      students: 15,
      status: "Draft",
      color: "#f59e0b",
    },
  ]);

  const [users] = useState([
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
  ]);

  // 2. Logic to delete a course
  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  const stats = {
    totalCourses: courses.length,
    totalUsers: users.length,
    avgCompletion: 45,
  };

  return (
    <HashRouter>
      <div className="dashboard doctor-dashboard">
        <Routes>
          <Route
            path="/doctor-dashboard"
            element={
              <DashboardHomeContent
                stats={stats}
                courses={courses}
                users={users}
                onDeleteCourse={handleDeleteCourse}
              />
            }
          />
          {/* We pass state and setter to CourseManager so edits update the dashboard */}
          <Route
            path="/doctor-dashboard/courses"
            element={
              <CourseManager courses={courses} setCourses={setCourses} />
            }
          />
          <Route
            path="/doctor-dashboard/users"
            element={<UserManagement users={users} />}
          />
          <Route
            path="/doctor-dashboard/analytics"
            element={<Analytics stats={stats} />}
          />
          <Route
            path="*"
            element={<Navigate to="/doctor-dashboard" replace />}
          />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default DoctorDashboard;
