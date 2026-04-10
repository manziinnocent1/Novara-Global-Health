import { useEffect, useId, useMemo, useState } from "react";
import "./App.css";

import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { AboutSection } from "./components/AboutSection.jsx";
import { ArchitectureSection } from "./components/ArchitectureSection.jsx";
import { PartnersSection } from "./components/PartnersSection.jsx";
import { ProjectsSection } from "./components/ProjectsSection.jsx";
import { LeadershipSection } from "./components/LeadershipSection.jsx";
import { FooterContact } from "./components/FooterContact.jsx";
import { Register } from "./components/Register.jsx";
import UserDashboard from "./components/user/UserDashboard.jsx";
import DoctorDashboard from "./components/doctor/DoctorDashboard.jsx";

import { useRevealOnScroll } from "./hooks/useRevealOnScroll.js";

function App() {
  const navId = useId();
  const [contactStatus, setContactStatus] = useState("idle");
  const [contactError, setContactError] = useState("");
  const [theme, setTheme] = useState(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem("theme")
        : null;
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  });
  const [route, setRoute] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : "#/",
  );

  useRevealOnScroll();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  // Public nav (before login)
  const publicNavItems = useMemo(
    () => [
      { label: "Home", href: "#top" },
      { label: "About us", href: "#about" },
      { label: "Solutions", href: "#solutions" },
      { label: "Pipeline", href: "#pipeline" },
      { label: "Our Team", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
    [],
  );

  // User dashboard nav
  const userNavItems = [
    { label: "Home", href: "#/user-dashboard" },
    { label: "Courses", href: "#/user-dashboard#courses" },
    { label: "Progress", href: "#/user-dashboard#progress" },
    { label: "Profile", href: "#/user-dashboard#profile" },
  ];

  // Doctor dashboard nav
  const doctorNavItems = [
    { label: "Home", href: "#/doctor-dashboard" },
    { label: "Courses", href: "#/doctor-dashboard#courses" },
    { label: "Users", href: "#/doctor-dashboard#users" },
    { label: "Analytics", href: "#/doctor-dashboard#analytics" },
  ];

  function onToggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  async function onSubmitContact(e) {
    e.preventDefault();
    setContactStatus("sending");
    try {
      // ... your contact form logic
      setContactStatus("sent");
    } catch (err) {
      setContactStatus("error");
      setContactError(err.message);
    }
  }

  // Choose nav items based on route
  const navItems =
    route === "#/user-dashboard"
      ? userNavItems
      : route === "#/doctor-dashboard"
        ? doctorNavItems
        : publicNavItems;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header
        navId={navId}
        navItems={navItems}
        theme={theme}
        onToggleTheme={onToggleTheme}
        showGetStarted={
          route !== "#/user-dashboard" && route !== "#/doctor-dashboard"
        }
        isDashboard={
          route === "#/user-dashboard" || route === "#/doctor-dashboard"
        }
      />

      {route === "#/register" ? (
        <Register />
      ) : route === "#/user-dashboard" ? (
        <UserDashboard />
      ) : route === "#/doctor-dashboard" ? (
        <DoctorDashboard />
      ) : (
        <main id="main">
          <Hero />
          <AboutSection />
          <ArchitectureSection />
          <PartnersSection />
          <ProjectsSection />
          <LeadershipSection />
          <FooterContact
            navItems={publicNavItems}
            contactStatus={contactStatus}
            contactError={contactError}
            onSubmitContact={onSubmitContact}
          />
        </main>
      )}
    </>
  );
}

export default App;
