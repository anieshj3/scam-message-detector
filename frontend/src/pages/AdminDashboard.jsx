import { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";

function AdminDashboard() {
  const { user } = useAuth();

  const [statistics, setStatistics] = useState(null);
  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://scam-message-detector-dadr.onrender.com/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Failed to load dashboard."
        );
        setLoading(false);
        return;
      }

      setStatistics(data.statistics);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to server. Make sure backend is running."
      );
    }

    setLoading(false);
  };

  const fetchReports = async () => {
    try {
      const response = await fetch(
        "https://scam-message-detector-dadr.onrender.com/api/reports"
      );

      const data = await response.json();

      if (response.ok) {
        setReports(data.reports);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchReports();
  }, []);

  const updateReportStatus = async (reportId, action) => {
    try {
      setActionLoading(reportId);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://scam-message-detector-dadr.onrender.com/api/reports/${reportId}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update report.");
        setActionLoading("");
        return;
      }

      alert(data.message);

      await fetchDashboard();
      await fetchReports();

      setActionLoading("");
    } catch (error) {
      console.error(error);

      alert("Unable to update report.");

      setActionLoading("");
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <h1>Admin Dashboard</h1>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Admin Dashboard</h1>

        <p className="error-message">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="admin-container">

        <h1>👨‍💼 Admin Dashboard</h1>

        <p>
          Welcome, {user?.name}. Manage and monitor the
          Scam Message Detector.
        </p>

        {/* Statistics */}

        <div className="admin-stats">

          <div className="admin-stat-card">
            <h2>👥</h2>
            <h3>{statistics.totalUsers}</h3>
            <p>Total Users</p>
          </div>

          <div className="admin-stat-card">
            <h2>🔍</h2>
            <h3>{statistics.totalAnalyses}</h3>
            <p>Total Analyses</p>
          </div>

          <div className="admin-stat-card">
            <h2>🚨</h2>
            <h3>{statistics.totalReports}</h3>
            <p>Total Reports</p>
          </div>

          <div className="admin-stat-card">
            <h2>⏳</h2>
            <h3>{statistics.pendingReports}</h3>
            <p>Pending Reports</p>
          </div>

          <div className="admin-stat-card">
            <h2>✅</h2>
            <h3>{statistics.verifiedReports}</h3>
            <p>Verified Reports</p>
          </div>

          <div className="admin-stat-card">
            <h2>❌</h2>
            <h3>{statistics.rejectedReports}</h3>
            <p>Rejected Reports</p>
          </div>

        </div>

        {/* Scam Reports */}

        <div className="admin-reports">

          <h2>🚨 Manage Scam Reports</h2>

          {reports.length === 0 ? (
            <p>No scam reports available.</p>
          ) : (
            reports.map((report) => (
              <div
                className="admin-report-card"
                key={report._id}
              >

                <div className="admin-report-header">

                  <div>
                    <h3>{report.category}</h3>

                    <span>
                      Status: <strong>{report.status}</strong>
                    </span>
                  </div>

                  <span>
                    {new Date(
                      report.createdAt
                    ).toLocaleString()}
                  </span>

                </div>

                <div className="admin-report-message">

                  <h4>📩 Message</h4>

                  <p>{report.message}</p>

                </div>

                {report.description && (
                  <div className="admin-report-description">

                    <h4>📝 Description</h4>

                    <p>{report.description}</p>

                  </div>
                )}

                {report.user && (
                  <p>
                    Reported by:{" "}
                    <strong>
                      {report.user.name}
                    </strong>
                  </p>
                )}

                {/* Buttons */}

                {report.status === "Pending" && (
                  <div className="admin-report-actions">

                    <button
                      className="verify-btn"
                      disabled={
                        actionLoading === report._id
                      }
                      onClick={() =>
                        updateReportStatus(
                          report._id,
                          "verify"
                        )
                      }
                    >
                      {actionLoading === report._id
                        ? "Updating..."
                        : "✅ Verify"}
                    </button>

                    <button
                      className="reject-btn"
                      disabled={
                        actionLoading === report._id
                      }
                      onClick={() =>
                        updateReportStatus(
                          report._id,
                          "reject"
                        )
                      }
                    >
                      {actionLoading === report._id
                        ? "Updating..."
                        : "❌ Reject"}
                    </button>

                  </div>
                )}

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;