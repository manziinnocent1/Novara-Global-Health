export function FooterContact({
  navItems,
  contactStatus,
  contactError,
  onSubmitContact,
}) {
  return (
    <footer id="contact" className="footer" data-reveal>
      <div className="footer-hero">
        <div className="container footer-hero-inner">
          <div className="footer-hero-copy">
            <p className="eyebrow">Follow Us on Social Media</p>
            <h2>Stay connected with Novara Global Health.</h2>
            <p className="muted">
              Connect with us across platforms to stay updated on our latest
              initiatives, events, and impact stories from the field.
            </p>
          </div>

          <div className="footer-hero-actions">
            <a
              className="social-button"
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
            >
              Twitter/X
            </a>
            <a
              className="social-button"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              className="social-button"
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="btn btn-primary footer-email-cta"
              href="mailto:novara.globalhealth@gmail.com"
            >
              Email us
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-grid">
        <div className="footer-column footer-brand-col">
          <div className="brand brand-footer">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-text">Novara Global Health</span>
          </div>
          <p className="muted footer-brand-copy">
            We design clinically grounded digital systems that scale for global
            health equity.
          </p>
        </div>

        <div className="footer-column footer-links-col">
          <p className="footer-heading">Quick links</p>
          <ul className="footer-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="footer-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="contact glass footer-contact-form"
          onSubmit={onSubmitContact}
        >
          <div className="contact-head">
            <h3>Contact</h3>
            <p className="muted">
              Send a message or reach us directly at
              <a
                className="footer-email"
                href="mailto:novara.globalhealth@gmail.com"
              >
                novara.globalhealth@gmail.com
              </a>
            </p>
          </div>

          <div className="field-row">
            <label className="field">
              <span className="field-label">Name</span>
              <input
                name="name"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>
            <label className="field">
              <span className="field-label">Email</span>
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </label>
          </div>

          <label className="field">
            <span className="field-label">Message</span>
            <textarea
              name="message"
              rows={5}
              placeholder="Tell us how we can help you or share your feedback"
              required
            />
          </label>

          <div className="contact-actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={contactStatus === "sending"}
            >
              {contactStatus === "idle" && "Send message"}
              {contactStatus === "sending" && "Sending…"}
              {contactStatus === "sent" && "Sent"}
              {contactStatus === "error" && "Try again"}
            </button>
            {contactStatus === "error" && contactError ? (
              <p className="tiny alert" role="status">
                {contactError}
              </p>
            ) : null}
          </div>
        </form>
      </div>

      <div className="container footer-bottom">
        <p className="copyright">
          © 2026 Novara Global Health. All rights reserved.
        </p>
        <div className="footer-bottom-links">
          <a className="footer-link" href="#privacy">
            Privacy Policy
          </a>
          <a className="footer-link" href="#terms">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
