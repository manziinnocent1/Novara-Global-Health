import { useState } from "react";

export function Register() {
  const [mode, setMode] = useState("register");
  const [userType, setUserType] = useState("user");

  function handleRegister(e) {
    e.preventDefault();

    // Extract values from form fields
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const name = formData.get("name");

    if (!email) {
      alert("Please enter a valid email");
      return;
    }

    // 1. Save the specific role for THIS email address
    // This prevents one user's role from overwriting another's in localStorage
    localStorage.setItem(`role_${email}`, userType);

    // 2. Optional: Store user profile data
    const userData = { name, email, role: userType };
    localStorage.setItem(`user_${email}`, JSON.stringify(userData));

    // 3. Set the active session
    localStorage.setItem("currentUserEmail", email);

    // Redirect based on the role selected during registration
    if (userType === "doctor") {
      window.location.hash = "#/doctor-dashboard";
    } else {
      window.location.hash = "#/user-dashboard";
    }
  }

  function handleLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");

    // 1. Retrieve the specific role associated with the entered email
    const storedRole = localStorage.getItem(`role_${email}`);

    if (storedRole) {
      // Set active session
      localStorage.setItem("currentUserEmail", email);

      // Redirect based on the stored role
      if (storedRole === "doctor") {
        window.location.hash = "#/doctor-dashboard";
      } else {
        window.location.hash = "#/user-dashboard";
      }
    } else {
      alert("No account found with this email. Please register first.");
      setMode("register");
    }
  }

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

              <form className="auth-form" onSubmit={handleRegister}>
                <label className="auth-field">
                  <select
                    className="auth-input"
                    name="userType"
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
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                  />
                </label>

                <label className="auth-field">
                  <span className="auth-label">Email</span>
                  <input
                    className="auth-input"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label className="auth-field">
                  <span className="auth-label">Password</span>
                  <input
                    className="auth-input"
                    name="password"
                    type="password"
                    placeholder="Choose a password"
                    required
                  />
                </label>

                {userType === "doctor" && (
                  <label className="auth-field">
                    <span className="auth-label">Medical License Number</span>
                    <input
                      className="auth-input"
                      name="license"
                      type="text"
                      placeholder="Your license number"
                      required
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

              <form className="auth-form" onSubmit={handleLogin}>
                <label className="auth-field">
                  <span className="auth-label">Email</span>
                  <input
                    className="auth-input"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label className="auth-field">
                  <span className="auth-label">Password</span>
                  <input
                    className="auth-input"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
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
