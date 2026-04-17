import React, { useState } from "react";
import {
  Users,
  Mail,
  BookOpen,
  MoreVertical,
  Search,
  Download,
  Filter,
  Trash2,
  Edit,
} from "lucide-react";

const UserManagement = ({ users: propUsers }) => {
  // Innovative default data
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

  // --- FUNCTIONAL STATES ---
  const [data, setData] = useState(propUsers || defaultUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState(null); // For the Actions dropdown

  // --- SEARCH LOGIC ---
  const filteredUsers = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // --- FILTER LOGIC (Toggles only Active students) ---
  const handleToggleFilter = () => {
    if (data.length < (propUsers || defaultUsers).length) {
      setData(propUsers || defaultUsers); // Reset
    } else {
      setData(data.filter((u) => u.status === "Active")); // Show only Active
    }
  };

  // --- EXPORT CSV LOGIC ---
  const exportToCSV = () => {
    const headers = ["Name,Email,Course,Progress,Status\n"];
    const rows = filteredUsers.map(
      (u) => `${u.name},${u.email},${u.course},${u.progress}%,${u.status}\n`,
    );
    const blob = new Blob([headers, ...rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "student_directory.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // --- DELETE LOGIC (Action Button) ---
  const deleteUser = (id) => {
    if (window.confirm("Remove student from directory?")) {
      setData(data.filter((u) => u.id !== id));
      setActiveMenu(null);
    }
  };

  return (
    <div className="container animate-fadeIn">
      <header className="manager-header">
        <div>
          <h2 className="gradient-text">Student Directory</h2>
          <p>Monitor clinical student enrollment and academic performance.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary-sm" onClick={exportToCSV}>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className={`filter-pill ${data.length < (propUsers || defaultUsers).length ? "active-filter" : ""}`}
          onClick={handleToggleFilter}
        >
          <Filter size={16} />{" "}
          {data.length < (propUsers || defaultUsers).length
            ? "Show All"
            : "Filter Active"}
        </button>
      </div>

      {/* TABLE DESIGN */}
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
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
                  <td style={{ position: "relative" }}>
                    <button
                      className="icon-btn-ghost"
                      onClick={() =>
                        setActiveMenu(activeMenu === user.id ? null : user.id)
                      }
                    >
                      <MoreVertical size={18} />
                    </button>

                    {/* ACTIONS DROPDOWN */}
                    {activeMenu === user.id && (
                      <div className="actions-dropdown-menu">
                        <button onClick={() => alert(`Editing ${user.name}`)}>
                          <Edit size={14} /> Edit Profile
                        </button>
                        <button
                          className="delete-action"
                          onClick={() => deleteUser(user.id)}
                        >
                          <Trash2 size={14} /> Remove Student
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-table-state">
                  <Users size={48} />
                  <p>No results found matching your search.</p>
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
