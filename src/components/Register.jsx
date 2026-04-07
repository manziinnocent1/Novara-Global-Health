import { useState } from "react";

export function Register() {
  const [mode, setMode] = useState("register");
  const [userType, setUserType] = useState("user");

  return (
    <section className="register-page" aria-label="Register and login">
      <div className="register-container">
        <div className="register-card-center">
          <div className="register-head">
            <a className="brand" href="#top">
              Novara Global Health
            </a>
          </div>

          {mode === "register" ? (
            <div className="auth-panel-standalone">
              <h2>Create Account</h2>
              <p>Join our team to access the platform.</p>

              <form className="auth-form">
                <label className="auth-field">
                  <select
                    className="auth-input"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

                <label className="auth-field">
                  <span className="auth-label">Full name</span>
                  <input
                    className="auth-input"
                    type="text"
                    placeholder="Your name"
                  />
                </label>

                <label className="auth-field">
                  <span className="auth-label">Email</span>
                  <input
                    className="auth-input"
                    type="email"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="auth-field">
                  <span className="auth-label">Password</span>
                  <input
                    className="auth-input"
                    type="password"
                    placeholder="Choose a password"
                  />
                </label>

                {userType === "doctor" && (
                  <label className="auth-field">
                    <span className="auth-label">Medical License Number</span>
                    <input
                      className="auth-input"
                      type="text"
                      placeholder="Your license number"
                    />
                  </label>
                )}

                <button className="btn btn-primary" type="submit">
                  Register
                </button>

                <p className="auth-toggle">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="auth-link"
                  >
                    Login
                  </button>
                </p>
              </form>
            </div>
          ) : (
            <div className="auth-panel-standalone">
              <h2>Sign In</h2>
              <p>Enter your credentials to access your account.</p>

              <form className="auth-form">
                <label className="auth-field">
                  <span className="auth-label">Email</span>
                  <input
                    className="auth-input"
                    type="email"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="auth-field">
                  <span className="auth-label">Password</span>
                  <input
                    className="auth-input"
                    type="password"
                    placeholder="••••••••"
                  />
                </label>

                <button className="btn btn-primary" type="submit">
                  Sign In
                </button>

                <p className="auth-toggle">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="auth-link"
                  >
                    Register
                  </button>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
