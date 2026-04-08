import { ThemeToggle } from "./ThemeToggle.jsx";
import logo from "../assets/novara_logo.png"; // import your logo

export function Header({ navId, navItems, theme, onToggleTheme }) {
  return (
    <header className="site-header" aria-label="Primary">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Novara Global Health">
          {/* Show only the logo image */}
          <img
            src={logo}
            alt="Novara Global Health Logo"
            className="brand-mark"
          />
        </a>

        <nav aria-labelledby={navId} className="nav">
          <span className="sr-only" id={navId}>
            Primary navigation
          </span>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-cta">
          <a className="btn btn-primary" href="#/register">
            Get Started
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
