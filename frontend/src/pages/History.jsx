import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function History() {
  const { user } = useAuth();

  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `https://scam-message-detector-dadr.onrender.com/api/analysis/history/${user.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load history.");
          setLoading(false);
          return;
        }

        setAnalyses(data.analyses);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to connect to server. Make sure backend is running."
        );
      }

      setLoading(false);
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="page-container">
        <h1>Analysis History</h1>
        <p>Loading history...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="history-container">

        <h1>📋 Analysis History</h1>

        <p>
          View your previously analyzed messages.
        </p>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {!error && analyses.length === 0 && (
          <div className="result-message">
            <h2>No Analysis History</h2>

            <p>
              You have not analyzed any messages yet.
            </p>

            <Link
              to="/analyze"
              className="primary-btn"
            >
              Analyze a Message
            </Link>
          </div>
        )}

        {analyses.length > 0 && (
          <div className="history-list">

            {analyses.map((analysis) => (
              <div
                className="history-card"
                key={analysis._id}
              >
                <div className="history-card-top">

                  <div>
                    <h3>
                      {analysis.riskLevel}
                    </h3>

                    <p>
                      Risk Score: {analysis.score}/100
                    </p>
                  </div>

                  <span>
                    {new Date(
                      analysis.createdAt
                    ).toLocaleString()}
                  </span>

                </div>

                <p className="history-message">
                  {analysis.originalMessage}
                </p>

                {analysis.reasons &&
                  analysis.reasons.length > 0 && (
                    <ul>
                      {analysis.reasons.map(
                        (reason, index) => (
                          <li key={index}>
                            {reason}
                          </li>
                        )
                      )}
                    </ul>
                  )}
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default History;