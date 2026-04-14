import React, { useState } from "react";
import logo from "../assets/novara_logo.png";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";

export function Header({
  navId,
  navItems,
  theme,
  onToggleTheme,
  showGetStarted,
  isDashboard, // Add this prop to know if we show the user menu
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUserEmail");
    window.location.hash = "#/";
    window.location.reload(); // Refresh to clear state
  };

  return (
    <header className="site-header">
      <nav id={navId} className="nav-bar">
        <a className="brand" href="#top">
          <img src={logo} alt="Novara Global Health" className="brand-logo" />
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button onClick={onToggleTheme} className="theme-toggle">
            {theme === "light" ? "Light" : "Dark"}
          </button>

          {showGetStarted && (
            <a href="#/register" className="btn btn-primary get-started">
              Get Started
            </a>
          )}

          {/* User Profile Dropdown - Only shows on Dashboard pages */}
          {isDashboard && (
            <div className="user-profile-menu">
              <button
                className="profile-trigger"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="avatar-circle">J</div>
                <ChevronDown size={16} />
              </button>

              {isMenuOpen && (
                <div className="dropdown-panel">
                  <div className="dropdown-header">
                    <p className="user-name">John Doe</p>
                    <p className="user-email">john@example.com</p>
                  </div>
                  <hr />
                  <a href="#/settings" className="dropdown-item">
                    <Settings size={18} /> Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-btn"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
