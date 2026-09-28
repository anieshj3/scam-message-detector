import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <NavLink to="/" className="navbar-logo">
          🛡️ ScamDetector
        </NavLink>

        <div className="navbar-links">

          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <NavLink to="/analyze" className="nav-link">
            Analyze
          </NavLink>

          <NavLink to="/history" className="nav-link">
            History
          </NavLink>

          <NavLink to="/reports" className="nav-link">
            Scam Reports
          </NavLink>

          <NavLink to="/report-scam" className="nav-link">
            Report Scam
          </NavLink>

          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>

          {user ? (
            <button
              onClick={handleLogout}
              className="nav-logout"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="nav-login">
              Login
            </NavLink>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;