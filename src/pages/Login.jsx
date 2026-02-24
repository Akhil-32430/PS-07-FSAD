import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [role, setRole] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, rolePasswords } = useAuth();

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    const result = login(role, password);
    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(`/${role}`);
  };

  return (
    <section className="page centered-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <p className="eyebrow">Secure Sign-In</p>
        <h2>Role Access Portal</h2>
        <p className="muted-text">Select your role and enter the password to open your panel.</p>

        <label className="input-label" htmlFor="role">
          Role
        </label>
        <select
          id="role"
          className="input-field"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="citizen">Citizen</option>
          <option value="observer">Observer</option>
          <option value="analyst">Analyst</option>
        </select>

        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="input-field"
          placeholder="Enter role password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error ? <p className="error-text">{error}</p> : null}

        <button type="submit" className="btn btn-primary full-width">
          Login Securely
        </button>

        <div className="credential-hint">
          <p>Demo Passwords:</p>
          <ul>
            {Object.entries(rolePasswords).map(([key, value]) => (
              <li key={key}>
                <strong>{key}</strong>: {value}
              </li>
            ))}
          </ul>
        </div>
      </form>
    </section>
  );
}

export default Login;