import React from "react";
import {
  User,
  Mail,
  Shield,
  Bell,
  MapPin,
  Camera,
  ExternalLink,
} from "lucide-react";

const UserProfile = ({ user: propUser }) => {
  // Use prop user or fallback to a default for the professional look
  const user = propUser || {
    name: "Innocent Manzi",
    email: "manzi@example.com",
    role: "Health Professional Student",
    location: "Kigali, Rwanda",
    joined: "January 2026",
  };

  return (
    <div className="container animate-fadeIn">
      <header className="profile-header-main">
        <h2 className="gradient-text">Personal Account</h2>
        <p>
          Manage your identity and security settings across Novara Global
          Health.
        </p>
      </header>

      <div className="profile-grid">
        {/* LEFT COLUMN: Identity Card */}
        <aside className="profile-sidebar-card">
          <div className="avatar-upload-area">
            <div className="large-avatar">{user.name.charAt(0)}</div>
            <button className="edit-avatar-btn">
              <Camera size={16} />
            </button>
          </div>

          <div className="identity-text">
            <h3>{user.name}</h3>
            <span className="role-tag">{user.role}</span>
          </div>

          <div className="profile-quick-stats">
            <div className="p-stat">
              <span>Member Since</span>
              <strong>{user.joined}</strong>
            </div>
            <div className="p-stat">
              <span>Location</span>
              <strong>{user.location}</strong>
            </div>
          </div>

          <button className="btn btn-primary-full">View Public Profile</button>
        </aside>

        {/* RIGHT COLUMN: Settings & Details */}
        <section className="profile-details-area">
          <div className="settings-card">
            <div className="card-header">
              <div className="icon-wrap">
                <User size={20} />
              </div>
              <h4>Basic Information</h4>
            </div>

            <div className="form-mockup">
              <div className="input-group">
                <label>Full Name</label>
                <div className="fake-input">{user.name}</div>
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <div className="fake-input">
                  <Mail size={14} /> {user.email}
                </div>
              </div>
              <button className="btn-text-link">Edit Details</button>
            </div>
          </div>

          <div className="settings-card">
            <div className="card-header">
              <div className="icon-wrap">
                <Shield size={20} />
              </div>
              <h4>Privacy & Security</h4>
            </div>
            <ul className="settings-list">
              <li>
                <div className="list-text">
                  <strong>Two-Factor Authentication</strong>
                  <span>Add an extra layer of security to your account.</span>
                </div>
                <button className="toggle-stub">Enable</button>
              </li>
              <li>
                <div className="list-text">
                  <strong>Change Password</strong>
                  <span>Last changed 3 months ago.</span>
                </div>
                <button className="btn-outline-sm">Update</button>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
