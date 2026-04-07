export function PartnersSection() {
  return (
    <section id="partners" className="section" data-reveal>
      <div className="container">
        <div className="section-head">
          <h2>Our Partners</h2>
          <p>
            We collaborate with leading organizations to drive digital health
            innovation and create lasting impact in communities across Rwanda
            and Africa.
          </p>
        </div>

        <div className="partners-grid">
          <article className="partner-card glass">
            <div className="partner-logo">ICT</div>
            <h3>ICT Chamber</h3>
            <p>
              Connecting Rwandan innovators with growth, support, and
              visibility.
            </p>
          </article>
          <article className="partner-card glass">
            <div className="partner-logo">YEF</div>
            <h3>Youth Empowerment Fund</h3>
            <p>
              Supporting youth-led health innovation and community resilience.
            </p>
          </article>
          <article className="partner-card glass">
            <div className="partner-logo">EU</div>
            <h3>Global Youth Mobilization</h3>
            <p>
              Partnering on digital health education and inclusive public health
              programs.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
