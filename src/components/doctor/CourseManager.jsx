import React from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  MoreVertical,
  Layers,
  BookOpen,
} from "lucide-react";

const CourseManager = ({ courses: propCourses }) => {
  // Use props or high-quality defaults for visual impact
  const courses = propCourses || [
    {
      id: 1,
      title: "Advanced Cardiology",
      students: 45,
      status: "Published",
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "Mental Health Awareness",
      students: 32,
      status: "Published",
      color: "#10b981",
    },
    {
      id: 3,
      title: "Nutrition & Wellness",
      students: 12,
      status: "Draft",
      color: "#f59e0b",
    },
  ];

  return (
    <div className="container animate-fadeIn">
      <header className="manager-header">
        <div>
          <h2 className="gradient-text">Course Curriculum</h2>
          <p>
            Create, refine, and manage your global health educational content.
          </p>
        </div>
        <button className="btn-innovative-add">
          <Plus size={20} />
          <span>Create New Course</span>
        </button>
      </header>

      <div className="manager-toolbar">
        <div className="search-pill">
          <Layers size={16} />
          <span>Active Courses: {courses.length}</span>
        </div>
      </div>

      <div className="course-management-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="management-card">
              <div
                className="card-status-strip"
                style={{ backgroundColor: course.color }}
              ></div>

              <div className="card-main-content">
                <div className="card-header-row">
                  <div
                    className="icon-box"
                    style={{
                      backgroundColor: `${course.color}15`,
                      color: course.color,
                    }}
                  >
                    <BookOpen size={22} />
                  </div>
                  <button className="icon-btn-ghost">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="card-body-info">
                  <h3>{course.title}</h3>
                  <div className="badge-row">
                    <span
                      className={`status-pill ${course.status.toLowerCase()}`}
                    >
                      {course.status}
                    </span>
                    <span className="student-count">
                      {course.students} Students
                    </span>
                  </div>
                </div>

                <div className="card-actions-footer">
                  <button className="action-btn edit">
                    <Edit3 size={16} /> Edit
                  </button>
                  <button className="action-btn view">
                    <Eye size={16} />
                  </button>
                  <button className="action-btn delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-manager">
            <Layers size={48} className="empty-icon" />
            <p>
              Your curriculum is empty. Start by adding your first medical
              course.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManager;
