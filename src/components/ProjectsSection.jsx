export function ProjectsSection() {
  return (
    <section id="pipeline" className="section section-tight" data-reveal>
      <div className="container">
        <div className="section-head">
          <h2>Flagship Innovations (The "Projects" Section)</h2>
          <p>
            A focused roadmap of clinically grounded products built for
            measurable outcomes.
          </p>
        </div>

        <div className="projects">
          <article className="project glass">
            <div className="project-badge">Prototype • Pilot</div>
            <div className="project-body">
              <h3>MATERNIX</h3>
              <p className="project-tagline">
                The integrated digital health ecosystem for maternal and
                neonatal outcomes.
              </p>
              <p>
                Bridging the critical gap between facility-based care and the
                home environment for pregnant women and neonates in Rwanda.
              </p>
              <ul className="feature-list">
                <li>Automated Antenatal Care (ANC) scheduling</li>
                <li>Danger Sign Triage reporting</li>
                <li>Emergency USSD integration</li>
                <li>
                  "Mama AI" Chatbot for continuous, localized health education
                </li>
              </ul>
            </div>
            <div className="project-visual" aria-hidden="true">
              <div className="device">
                <div className="device-screen">
                  <div className="mini-row">
                    <span className="mini-pill" />
                    <span className="mini-pill mini-pill-blue" />
                  </div>
                  <div className="mini-chart">
                    <span style={{ "--h": "64%" }} />
                    <span style={{ "--h": "48%" }} />
                    <span style={{ "--h": "82%" }} />
                    <span style={{ "--h": "58%" }} />
                    <span style={{ "--h": "72%" }} />
                  </div>
                  <div className="mini-cards">
                    <div className="mini-card" />
                    <div className="mini-card" />
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="project glass project-dim">
            <div className="project-badge badge-muted">Coming soon</div>
            <div className="project-body">
              <h3>Oncology Projects. (Health education)</h3>
              <p className="project-tagline">
                Upcoming modules dedicated to digital cervical cancer and breast
                cancer awareness health education.
              </p>
            </div>
            <div className="project-visual" aria-hidden="true">
              <div className="roadmap">
                <div className="roadmap-dot" />
                <div className="roadmap-line" />
                <div className="roadmap-dot roadmap-dot-blue" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
