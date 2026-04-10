import React from "react";
import logo from "../assets/novara_logo.png"; // <-- place your logo file in src/assets

export function Header({
  navId,
  navItems,
  theme,
  onToggleTheme,
  showGetStarted,
}) {
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
        </div>
      </nav>
    </header>
  );
}
