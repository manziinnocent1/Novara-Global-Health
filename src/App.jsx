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
import { useRevealOnScroll } from "./hooks/useRevealOnScroll.js";

function App() {
  const navId = useId();
  const [contactStatus, setContactStatus] = useState("idle"); // idle | sending | sent | error
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

  const navItems = useMemo(
    () => [
      { label: "Solutions", href: "#solutions" },
      { label: "Research", href: "#research" },
      { label: "Pipeline", href: "#pipeline" },
      { label: "Contact", href: "#contact" },
      { label: "About us", href: "#about" },
    ],
    [],
  );

  function onToggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  async function onSubmitContact(e) {
    e.preventDefault();
    if (contactStatus === "sending") return;

    setContactError("");
    setContactStatus("sending");

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setContactStatus("error");
      setContactError(
        "Missing Web3Forms key. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file, then restart the dev server.",
      );
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", accessKey);
    formData.append(
      "subject",
      "Novara Global Health — New partnership inquiry",
    );
    formData.append("from_name", "Novara Global Health website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.success) {
        const msg =
          json?.message ||
          "Message failed to send. Please try again in a moment.";
        throw new Error(msg);
      }

      setContactStatus("sent");
      form.reset();
      window.setTimeout(() => {
        setContactStatus("idle");
      }, 4000);
    } catch (err) {
      setContactStatus("error");
      setContactError(
        err instanceof Error
          ? err.message
          : "Message failed to send. Please try again.",
      );
    }
  }

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
      />

      {route === "#/register" ? (
        <Register />
      ) : (
        <main id="main">
          <Hero />
          <AboutSection />
          <ArchitectureSection />
          <PartnersSection />
          <ProjectsSection />
          <LeadershipSection />
          <FooterContact
            navItems={navItems}
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
