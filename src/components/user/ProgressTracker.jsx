import React from "react";
import { CheckCircle, Clock, TrendingUp, Zap, Award } from "lucide-react";

const ProgressTracker = ({ enrolledCourses: propCourses }) => {
  // Mock data for immediate professional visual impact
  const defaultProgress = [
    {
      id: 1,
      title: "Public Health Essentials",
      progress: 65,
      lastActive: "2 hours ago",
      lessonsLeft: 4,
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "Advanced Nutrition",
      progress: 88,
      lastActive: "Yesterday",
      lessonsLeft: 1,
      color: "#10b981",
    },
    {
      id: 3,
      title: "Digital Health Systems",
      progress: 12,
      lastActive: "3 days ago",
      lessonsLeft: 14,
      color: "#8b5cf6",
    },
  ];

  const courses = propCourses || defaultProgress;

  return (
    <div className="container animate-fadeIn">
      <header className="progress-header">
        <div>
          <h2 className="gradient-text">Learning Analytics</h2>
          <p>Track your milestones and health education journey.</p>
        </div>
        <div className="total-completion-card">
          <div className="completion-info">
            <span className="completion-label">Overall Completion</span>
            <span className="completion-value">55%</span>
          </div>
          <div className="mini-chart">
            <TrendingUp size={24} color="#10b981" />
          </div>
        </div>
      </header>

      {/* Highlights Grid */}
      <div className="highlights-row">
        <div className="highlight-pill">
          <Zap size={18} className="icon-orange" />
          <span>4 Day Streak!</span>
        </div>
        <div className="highlight-pill">
          <CheckCircle size={18} className="icon-green" />
          <span>8 Lessons Finished</span>
        </div>
        <div className="highlight-pill">
          <Award size={18} className="icon-purple" />
          <span>2 Badges Earned</span>
        </div>
      </div>

      <div className="progress-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="modern-progress-card">
              <div className="card-top-info">
                <h3>{course.title}</h3>
                <span className="last-active">Active {course.lastActive}</span>
              </div>

              <div className="visual-progress-area">
                <div className="custom-progress-container">
                  <div className="progress-track">
                    <div
                      className="progress-fill-glow"
                      style={{
                        width: `${course.progress}%`,
                        backgroundColor: course.color,
                      }}
                    ></div>
                  </div>
                  <span
                    className="percentage-text"
                    style={{ color: course.color }}
                  >
                    {course.progress}%
                  </span>
                </div>
              </div>

              <div className="card-bottom-stats">
                <div className="stat-item">
                  <Clock size={14} />
                  <span>{course.lessonsLeft} lessons left</span>
                </div>
                <button className="resume-link" style={{ color: course.color }}>
                  Resume Lesson →
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>
              No active learning paths found. Start a course to see your
              progress!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
