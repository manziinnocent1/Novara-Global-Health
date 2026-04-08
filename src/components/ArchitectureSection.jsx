import { FaStethoscope, FaLaptopMedical, FaUsers } from "react-icons/fa";

export function ArchitectureSection() {
  return (
    <section id="solutions" className="section" data-reveal>
      <div className="container">
        <div className="section-head">
          <h2>What We Do</h2>
          <p>
            At Novara Global Health, we build digital health solutions, empower
            people, and strengthen health systems worldwide. We translate
            rigorous clinical research into scalable digital infrastructure.
          </p>
        </div>

        <div className="bento">
          <article className="card glass">
            <FaStethoscope size={40} color="#1d3557" /> {/* dark blue */}
            <p className="card-kicker">Pillar 01</p>
            <h3>Evidence-Based Care</h3>
            <p>
              Rooted in clinical excellence to ensure high-quality patient
              outcomes.
            </p>
          </article>

          <article className="card glass">
            <FaLaptopMedical size={40} color="#e63946" /> {/* red */}
            <p className="card-kicker">Pillar 02</p>
            <h3>Digital Innovation</h3>
            <p>
              Leveraging AI, mobile integrations, and real-time data tracking to
              eliminate healthcare delays.
            </p>
          </article>

          <article className="card glass">
            <FaUsers size={40} color="#2a9d8f" /> {/* teal */}
            <p className="card-kicker">Pillar 03</p>
            <h3>Global Equity</h3>
            <p>
              Designing robust systems that scale to serve the most vulnerable
              populations.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
