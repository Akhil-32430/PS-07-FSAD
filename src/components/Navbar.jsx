import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="topbar-wrap">
      <nav className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark">EM</span>
          <span className="brand-text">Election Monitor</span>
        </Link>

        <div className="topbar-links">
          <NavLink to="/" className="topbar-link">
            Home
          </NavLink>
          {!session.isAuthenticated ? (
            <NavLink to="/login" className="topbar-link">
              Login
            </NavLink>
          ) : (
            <>
              <NavLink to={`/${session.role}`} className="topbar-link">
                {session.role.charAt(0).toUpperCase() + session.role.slice(1)} Panel
              </NavLink>
              <button type="button" className="topbar-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;