import React from "react";
import { BookOpen, Clock, Users, Star, ArrowRight } from "lucide-react";

const CourseList = ({ courses: propCourses }) => {
  // Mock data to ensure it looks good immediately;
  // in a real app, this comes from your MongoDB backend
  const defaultCourses = [
    {
      id: 1,
      title: "Public Health Essentials",
      description:
        "Foundational concepts of community health and disease prevention.",
      duration: "6 Weeks",
      students: 1240,
      rating: 4.9,
      level: "Beginner",
      color: "#3b82f6",
    },
    {
      id: 2,
      title: "Advanced Nutrition",
      description: "In-depth study of macronutrients and clinical dietetics.",
      duration: "4 Weeks",
      students: 850,
      rating: 4.8,
      level: "Intermediate",
      color: "#10b981",
    },
    {
      id: 3,
      title: "Digital Health Systems",
      description:
        "How technology is transforming patient care in the 21st century.",
      duration: "8 Weeks",
      students: 2100,
      rating: 5.0,
      level: "Advanced",
      color: "#8b5cf6",
    },
  ];

  const displayCourses = propCourses || defaultCourses;

  return (
    <div className="container animate-fadeIn">
      <header className="section-header-modern">
        <div>
          <h2 className="gradient-text">Explore Courses</h2>
          <p>
            Expand your knowledge with our globally recognized health programs.
          </p>
        </div>
        <div className="filter-tabs">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Popular</button>
          <button className="filter-btn">Newest</button>
        </div>
      </header>

      <div className="innovative-course-grid">
        {displayCourses.map((course) => (
          <div key={course.id} className="course-card-premium">
            <div className="course-card-top">
              <span
                className="level-badge"
                style={{
                  backgroundColor: `${course.color}20`,
                  color: course.color,
                }}
              >
                {course.level}
              </span>
              <div className="rating">
                <Star size={14} fill="#fbbf24" color="#fbbf24" />
                <span>{course.rating}</span>
              </div>
            </div>

            <div className="course-card-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <div className="course-meta">
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{course.duration}</span>
                </div>
                <div className="meta-item">
                  <Users size={16} />
                  <span>{course.students} students</span>
                </div>
              </div>
            </div>

            <div className="course-card-action">
              <button
                className="enroll-button-modern"
                style={{ "--hover-color": course.color }}
              >
                Enroll Now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
