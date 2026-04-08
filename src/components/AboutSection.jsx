import { FaBullseye, FaLightbulb, FaGlobe } from "react-icons/fa";

export function AboutSection() {
  return (
    <section id="about" className="section" data-reveal>
      <div className="container">
        <div className="section-head">
          <h2>Who We Are</h2>
        </div>

        <div className="bento">
          <article className="card glass">
            <FaBullseye size={40} color="#e63946" /> {/* red icon */}
            <p className="card-kicker">Our Purpose</p>
            <h3>Advancing global health equity</h3>
            <p>
              We believe that high-quality, evidence-based care should not be
              limited by geography, socioeconomic status, or system delays.
            </p>
          </article>

          <article className="card glass">
            <FaLightbulb size={40} color="#f4a261" /> {/* orange icon */}
            <p className="card-kicker">Our Approach</p>
            <h3>Digital innovation for care delivery</h3>
            <p>
              We translate clinical research into scalable digital systems that
              empower providers and patients across communities.
            </p>
          </article>

          <article className="card glass">
            <FaGlobe size={40} color="#2a9d8f" /> {/* teal icon */}
            <p className="card-kicker">Our Impact</p>
            <h3>Bridging facilities to the home</h3>
            <p>
              Our tools strengthen health systems by connecting facility-based
              care with the home environment to improve outcomes.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
