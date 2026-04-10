import innocentPhoto from "../assets/inno.jpeg";
import merciPhoto from "../assets/merci.png";
export function LeadershipSection() {
  return (
    <section id="team" className="section" data-reveal>
      <div className="container">
        <div className="section-head leadership-intro">
          <h2>Leadership & Vision</h2>
          <p>
            Our leadership combines clinical insight and delivery experience to
            create a vision where accessible digital health reaches every
            community.
          </p>
        </div>

        <div className="bento leadership-cards">
          <article className="card glass">
            <div className="card-icon card-icon-mission">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="card-kicker">Our Mission</p>
            <h3>Accessible, evidence-based care</h3>
            <p>
              We build digital health solutions that remove systemic barriers
              and bring high-quality care to underserved communities.
            </p>
          </article>

          <article className="card glass">
            <div className="card-icon card-icon-vision">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="card-kicker">Our Vision</p>
            <h3>Connected health ecosystems</h3>
            <p>
              We aim to bridge facilities and homes with scalable systems that
              strengthen providers, patients, and health systems.
            </p>
          </article>

          <article className="card glass">
            <div className="card-icon card-icon-leadership">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="card-kicker">Our Leadership</p>
            <h3>Clinical and delivery excellence</h3>
            <p>
              Merci and Innocent lead with deep operational expertise to make
              sustainable digital health impact possible.
            </p>
          </article>
        </div>

        <div className="section-head team-title">
          <h3>Our Team</h3>
        </div>

        <div className="bento team-grid">
          <article className="card glass">
            <img
              src={merciPhoto}
              alt="Merci Uwingeneye"
              className="team-photo"
            />
            <h3>Merci Uwingeneye</h3>
            <p className="card-kicker">Founder & CEO</p>
            <p>
              Merci combines clinical training with global health delivery
              expertise to champion digital solutions that strengthen systems,
              broaden care access, and support measurable outcomes for women,
              families, and communities.
            </p>
          </article>

          <article className="card glass">
            <img
              src={innocentPhoto}
              alt="Innocent Manzi"
              className="team-photo"
            />
            <h3>Innocent Manzi</h3>
            <p className="card-kicker">Co-Founder & Project Lead</p>
            <p>
              Innocent leads project delivery and execution, ensuring our
              digital health solutions are built with operational excellence,
              local context, and sustainable impact.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
