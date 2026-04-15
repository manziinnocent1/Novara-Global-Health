import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
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

const DashboardHomeContent = ({ stats, courses, users }) => (
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
        <button className="btn-primary-sm">
          <Plus size={16} /> Create Course
        </button>
      </div>
    </header>

    <div className="insights-grid">
      <div className="insight-mini-card">
        <div className="insight-icon blue">
          <BookOpen size={20} />
        </div>
        <div className="insight-details">
          <span className="label">Active Courses</span>
          <span className="value">{stats.totalCourses}</span>
        </div>
      </div>
      <div className="insight-mini-card">
        <div className="insight-icon green">
          <Users size={20} />
        </div>
        <div className="insight-details">
          <span className="label">Total Students</span>
          <span className="value">{stats.totalUsers}</span>
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
        <button className="link-btn">
          Manage All <Filter size={14} />
        </button>
      </div>
      <div className="doctor-course-grid">
        {courses.map((course) => (
          <div key={course.id} className="doctor-course-card">
            <div
              className="course-card-image"
              style={{ backgroundImage: `url(${course.image})` }}
            >
              <span className="student-badge">{course.students} enrolled</span>
            </div>
            <div className="course-card-info">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-card-actions">
                <button className="btn-edit">Edit</button>
                <button className="btn-delete">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

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
                    <div className="user-avatar-sm">{user.name.charAt(0)}</div>
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
); // <--- FIXED: Ensure this closing parenthesis and semicolon exist here

const DoctorDashboard = () => {
  const courses = [
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
              />
            }
          />
          <Route
            path="/doctor-dashboard/courses"
            element={<CourseManager courses={courses} />}
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
