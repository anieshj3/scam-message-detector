import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function Analyze() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (e) => {
    e.preventDefault();

    setError("");

    if (!message.trim()) {
      setError("Please enter a message to analyze.");
      return;
    }

    if (!user) {
      setError("Please login first.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://scam-message-detector-dadr.onrender.com/api/analysis/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            userId: user.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Analysis failed.");
        setLoading(false);
        return;
      }

      // Save result for Result page
      localStorage.setItem(
        "analysisResult",
        JSON.stringify(data)
      );

      // Go to result page
      navigate("/result");
    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to server. Make sure backend is running."
      );
    }

    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="analyze-container">
        <h1>🔍 Scam Message Detector</h1>

        <p>
          Paste a suspicious job offer, SMS, WhatsApp message,
          email, or other message below.
        </p>

        <form onSubmit={handleAnalyze}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste your suspicious message here..."
            rows="10"
          />

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Analyze;