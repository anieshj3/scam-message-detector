import { useEffect, useState } from "react";

function ScamReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filter states
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(
          "https://scam-message-detector-1.onrender.com/api/reports"
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message || "Failed to load scam reports."
          );
          setLoading(false);
          return;
        }

        setReports(data.reports);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to connect to server. Make sure backend is running."
        );
      }

      setLoading(false);
    };

    fetchReports();
  }, []);

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      report.message.toLowerCase().includes(searchText) ||
      report.category.toLowerCase().includes(searchText) ||
      (report.description &&
        report.description.toLowerCase().includes(searchText));

    const matchesCategory =
      categoryFilter === "All" ||
      report.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      report.status === statusFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });

  if (loading) {
    return (
      <div className="page-container">
        <h1>🚨 Scam Reports</h1>
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="reports-container">

        <h1>🚨 Scam Reports</h1>

        <p>
          View suspicious messages reported by users.
        </p>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {/* Search and Filters */}
        {!error && reports.length > 0 && (
          <div className="report-filters">

            <div className="form-group">
              <label>🔎 Search Reports</label>

              <input
                type="text"
                placeholder="Search message, category or description..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>🏷️ Category</label>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
              >
                <option value="All">All Categories</option>
                <option value="Job Scam">Job Scam</option>
                <option value="Payment Scam">
                  Payment Scam
                </option>
                <option value="OTP Scam">
                  OTP Scam
                </option>
                <option value="Investment Scam">
                  Investment Scam
                </option>
                <option value="Phishing">
                  Phishing
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>📌 Status</label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Verified">Verified</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

          </div>
        )}

        {/* No reports */}
        {!error && reports.length === 0 && (
          <div className="result-message">
            <h2>No Scam Reports</h2>

            <p>
              No scam reports have been submitted yet.
            </p>
          </div>
        )}

        {/* No matching reports */}
        {!error &&
          reports.length > 0 &&
          filteredReports.length === 0 && (
            <div className="result-message">
              <h2>No Matching Reports</h2>

              <p>
                No reports match your search or filters.
              </p>
            </div>
          )}

        {/* Reports */}
        {filteredReports.length > 0 && (
          <div className="reports-list">

            {filteredReports.map((report) => (
              <div
                className="report-card"
                key={report._id}
              >

                <div className="report-header">

                  <div>
                    <h2>{report.category}</h2>

                    <span className="report-status">
                      {report.status}
                    </span>
                  </div>

                  <span className="report-date">
                    {new Date(
                      report.createdAt
                    ).toLocaleString()}
                  </span>

                </div>

                <div className="report-section">
                  <h3>📩 Suspicious Message</h3>

                  <p>
                    {report.message}
                  </p>
                </div>

                {report.description && (
                  <div className="report-section">
                    <h3>📝 Description</h3>

                    <p>
                      {report.description}
                    </p>
                  </div>
                )}

                {report.user && (
                  <div className="report-user">
                    Reported by:{" "}
                    <strong>
                      {report.user.name}
                    </strong>
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default ScamReports;
