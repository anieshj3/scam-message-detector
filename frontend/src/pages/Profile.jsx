import { Link } from "react-router-dom";

function Profile() {
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
            A
          </div>

          <h2>Anish</h2>

          <p className="profile-email">
            anish@example.com
          </p>

          <div className="profile-details">

            <div className="profile-detail">
              <span>Full Name</span>
              <strong>Anish</strong>
            </div>

            <div className="profile-detail">
              <span>Email</span>
              <strong>anish@example.com</strong>
            </div>

            <div className="profile-detail">
              <span>Account Type</span>
              <strong>User</strong>
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