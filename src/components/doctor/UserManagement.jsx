import React from "react";
import {
  Users,
  Mail,
  BookOpen,
  MoreVertical,
  Search,
  Download,
  Filter,
} from "lucide-react";

const UserManagement = ({ users: propUsers }) => {
  // Innovative default data to ensure the UI looks high-end
  const defaultUsers = [
    {
      id: 1,
      name: "Alice Umutoni",
      email: "alice@example.com",
      course: "Advanced Cardiology",
      progress: 65,
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Karemera",
      email: "bob@example.com",
      course: "Mental Health Awareness",
      progress: 30,
      status: "Away",
    },
    {
      id: 3,
      name: "Diane Ineza",
      email: "diane@example.com",
      course: "Nutrition & Wellness",
      progress: 92,
      status: "Active",
    },
  ];

  const users = propUsers || defaultUsers;

  return (
    <div className="container animate-fadeIn">
      <header className="manager-header">
        <div>
          <h2 className="gradient-text">Student Directory</h2>
          <p>Monitor clinical student enrollment and academic performance.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary-sm">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </header>

      {/* SEARCH & FILTER COMMAND BAR */}
      <div className="management-toolbar">
        <div className="search-box-modern">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search students by name or email..."
          />
        </div>
        <button className="filter-pill">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* INNOVATIVE TABLE DESIGN */}
      <div className="modern-table-card">
        <table className="innovative-user-table">
          <thead>
            <tr>
              <th>Student Identity</th>
              <th>Assigned Course</th>
              <th>Clinical Progress</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-profile-cell">
                      <div className="user-avatar-initials">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="user-text-info">
                        <span className="user-name-bold">{user.name}</span>
                        <span className="user-email-sub">
                          <Mail size={12} /> {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="course-cell-badge">
                      <BookOpen size={14} />
                      {user.course}
                    </div>
                  </td>
                  <td>
                    <div className="progress-cell-wrap">
                      <div className="mini-progress-track">
                        <div
                          className="mini-progress-fill"
                          style={{
                            width: `${user.progress}%`,
                            backgroundColor:
                              user.progress > 80 ? "#10b981" : "#3b82f6",
                          }}
                        ></div>
                      </div>
                      <span className="percentage-label">{user.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`status-dot-label ${user.status?.toLowerCase() || "active"}`}
                    >
                      {user.status || "Active"}
                    </span>
                  </td>
                  <td>
                    <button className="icon-btn-ghost">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-table-state">
                  <Users size={48} />
                  <p>No students enrolled in your curriculum yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
