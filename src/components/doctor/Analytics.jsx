import React from "react";
import {
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Activity,
  PieChart,
} from "lucide-react";

const Analytics = ({ stats: propStats }) => {
  // Professional default stats for a doctor's view
  const stats = propStats || {
    totalCourses: 3,
    totalUsers: 142,
    avgCompletion: 68,
    activeNow: 12,
    completionTrend: "+12%",
  };

  return (
    <div className="container animate-fadeIn">
      <header className="section-header-modern">
        <div>
          <h2 className="gradient-text">Performance Insights</h2>
          <p>Real-time data on course engagement and student success rates.</p>
        </div>
        <button className="btn btn-primary-outline">Generate PDF Report</button>
      </header>

      {/* Primary Metrics Grid */}
      <div className="analytics-grid-innovative">
        <div className="stat-card-premium">
          <div className="stat-card-icon blue">
            <BookOpen size={24} />
          </div>
          <div className="stat-card-data">
            <span className="stat-card-label">Total Courses</span>
            <h3>{stats.totalCourses}</h3>
            <span className="stat-card-subtext">Active Curriculum</span>
          </div>
        </div>

        <div className="stat-card-premium">
          <div className="stat-card-icon green">
            <Users size={24} />
          </div>
          <div className="stat-card-data">
            <span className="stat-card-label">Enrolled Students</span>
            <h3>{stats.totalUsers}</h3>
            <span className="stat-card-subtext">Total Reach</span>
          </div>
        </div>

        <div className="stat-card-premium">
          <div className="stat-card-icon purple">
            <Activity size={24} />
          </div>
          <div className="stat-card-data">
            <span className="stat-card-label">Avg. Completion</span>
            <h3>{stats.avgCompletion}%</h3>
            <div className="trend-badge positive">
              <TrendingUp size={14} /> {stats.completionTrend || "+5%"}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Insight Row */}
      <div className="insights-row-modern">
        <div className="insight-card-glass">
          <div className="insight-header">
            <PieChart size={20} />
            <h4>Engagement Breakdown</h4>
          </div>
          <div className="visual-indicator-container">
            <div className="indicator-label">
              <span>Active Participation</span>
              <span>85%</span>
            </div>
            <div className="indicator-bar-bg">
              <div
                className="indicator-bar-fill purple"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
          <p className="insight-footer-text">
            Engagement is 10% higher than last month.
          </p>
        </div>

        <div className="insight-card-glass">
          <div className="insight-header">
            <BarChart3 size={20} />
            <h4>Student Success Rate</h4>
          </div>
          <div className="visual-indicator-container">
            <div className="indicator-label">
              <span>Passing Grade Avg.</span>
              <span>92%</span>
            </div>
            <div className="indicator-bar-bg">
              <div
                className="indicator-bar-fill green"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>
          <p className="insight-footer-text">
            Based on final module assessments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
