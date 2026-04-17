import React, { useState } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  Users,
  BookOpen,
  Activity,
  Plus,
  Filter,
  MoreHorizontal,
  Download,
  TrendingUp,
  Trash2,
  Mail,
} from "lucide-react";

import CourseManager from "./CourseManager";
import UserManagement from "./UserManagement";
import Analytics from "./Analytics";

const DashboardHomeContent = ({ stats, courses, users, onDeleteCourse }) => {
  const navigate = useNavigate();
  const [filterActive, setFilterActive] = useState(false);
  const [activeUserMenu, setActiveUserMenu] = useState(null);

  // 1. Logic for Exporting Data
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Type,Name,Details\n" +
      courses
        .map((c) => `Course,${c.title},${c.students} Students`)
        .join("\n") +
      "\n" +
      users.map((u) => `Student,${u.name},${u.progress}% Progress`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "doctor_dashboard_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Logic for Course Filtering (Toggle Published vs All)
  const displayedCourses = filterActive
    ? courses.filter((c) => c.status === "Published")
    : courses;

  return (
    <div className="container animate-fadeIn">
      <header className="dashboard-header-modern">
        <div className="welcome-area">
          <h1 className="gradient-text">Doctor's Command Center</h1>
          <p>Monitor curriculum performance and student clinical progress.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary-sm" onClick={handleExport}>
            <Download size={16} /> Export Data
          </button>
          <button
            className="btn-primary-sm"
            onClick={() => navigate("/doctor-dashboard/courses")}
          >
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
            className={`link-btn ${filterActive ? "active-filter" : ""}`}
            onClick={() => setFilterActive(!filterActive)}
          >
            {filterActive ? "Showing Published" : "Manage All"}{" "}
            <Filter size={14} />
          </button>
        </div>
        <div className="doctor-course-grid">
          {displayedCourses.map((course) => (
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
                  <button
                    className="btn-edit"
                    onClick={() => navigate("/doctor-dashboard/courses")}
                  >
                    Edit
                  </button>
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
                  <td style={{ position: "relative" }}>
                    <button
                      className="icon-btn-ghost"
                      onClick={() =>
                        setActiveUserMenu(
                          activeUserMenu === user.id ? null : user.id,
                        )
                      }
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {/* Functional Action Dropdown */}
                    {activeUserMenu === user.id && (
                      <div className="dashboard-action-dropdown">
                        <button
                          onClick={() =>
                            (window.location.href = `mailto:${user.email}`)
                          }
                        >
                          <Mail size={14} /> Message Student
                        </button>
                        <button className="text-danger">
                          <Trash2 size={14} /> Remove Access
                        </button>
                      </div>
                    )}
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
