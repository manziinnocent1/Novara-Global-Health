export function Hero() {
  return (
    <section id="top" className="hero" data-reveal>
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Premium clinical tech</p>
          <h1>Engineering the Future of Equitable Healthcare.</h1>
          <p className="lead">
            Advancing global health equity through digital health innovation,
            research, and evidence-based care.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#solutions">
              Explore Our Solutions
            </a>
            <a className="btn btn-ghost" href="#contact">
              Partner With Us
            </a>
          </div>
          <div className="hero-metrics" aria-label="Highlights">
            <div className="metric glass">
              <div className="metric-value">Digital</div>
              <div className="metric-label">Health systems</div>
            </div>
            <div className="metric glass">
              <div className="metric-value">Clinical</div>
              <div className="metric-label">Precision</div>
            </div>
            <div className="metric glass">
              <div className="metric-value">Global</div>
              <div className="metric-label">Equity</div>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="panel glass">
            <div className="panel-top">
              <span className="chip">Realtime</span>
              <span className="chip chip-blue">Evidence-led</span>
              <span className="chip">Responsive</span>
            </div>
            <div className="panel-title">Connected care layer</div>
            <div className="panel-sub">
              Secure data flow across facilities, communities, and
              decision-makers.
            </div>
            <div className="panel-bars">
              <div className="bar" style={{ '--w': '88%' }} />
              <div className="bar" style={{ '--w': '64%' }} />
              <div className="bar" style={{ '--w': '76%' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

