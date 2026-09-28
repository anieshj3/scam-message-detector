import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function Profile() {
  const { user } = useAuth();

  const userName = user?.name || "User";
  const userEmail = user?.email || "No email";
  const userRole = user?.role || "user";

  return (
    <div className="profile-page">
      <div className="profile-container">

        <div className="page-header">
          <div className="badge">👤 My Profile</div>

          <h1>Your Profile</h1>

          <p>
            Manage your account information.
          </p>
        </div>

        <div className="profile-card">

          <div className="profile-avatar">
            {userName.charAt(0).toUpperCase()}
          </div>

          <h2>{userName}</h2>

          <p className="profile-email">
            {userEmail}
          </p>

          <div className="profile-details">

            <div className="profile-detail">
              <span>Full Name</span>
              <strong>{userName}</strong>
            </div>

            <div className="profile-detail">
              <span>Email</span>
              <strong>{userEmail}</strong>
            </div>

            <div className="profile-detail">
              <span>Account Type</span>
              <strong>
                {userRole === "admin" ? "Admin" : "User"}
              </strong>
            </div>

            <div className="profile-detail">
              <span>Messages Analyzed</span>
              <strong>12</strong>
            </div>

          </div>

          <div className="profile-actions">

            <button className="primary-btn">
              Edit Profile
            </button>

            <Link to="/analyze" className="secondary-btn">
              Analyze Message
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;