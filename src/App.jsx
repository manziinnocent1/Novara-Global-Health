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

  const isUserDashboard = route.startsWith("#/user-dashboard");
  const isDoctorDashboard = route.startsWith("#/doctor-dashboard");

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

  const userNavItems = [
    { label: "Home", href: "#/user-dashboard" },
    { label: "Courses", href: "#/user-dashboard#courses" },
    { label: "Progress", href: "#/user-dashboard#progress" },
    { label: "Profile", href: "#/user-dashboard#profile" },
  ];

  const doctorNavItems = [
    { label: "Home", href: "#/doctor-dashboard" },
    { label: "Courses", href: "#/doctor-dashboard#courses" }, // FIXED: Use # for sub-routing
    { label: "Users", href: "#/doctor-dashboard#users" }, // FIXED: Use # for sub-routing
    { label: "Analytics", href: "#/doctor-dashboard#analytics" }, // FIXED: Use # for sub-routing
  ];

  function onToggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  async function onSubmitContact(e) {
    e.preventDefault();
    setContactStatus("sending");
    try {
      setContactStatus("sent");
    } catch (err) {
      setContactStatus("error");
      setContactError(err.message);
    }
  }

  const navItems = isUserDashboard
    ? userNavItems
    : isDoctorDashboard
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
          !isUserDashboard && !isDoctorDashboard && route !== "#/register"
        }
        isDashboard={isUserDashboard || isDoctorDashboard}
      />

      {route === "#/register" ? (
        <Register />
      ) : isUserDashboard ? (
        <UserDashboard route={route} />
      ) : isDoctorDashboard ? (
        <DoctorDashboard route={route} /> // FIXED: Passing route prop
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
