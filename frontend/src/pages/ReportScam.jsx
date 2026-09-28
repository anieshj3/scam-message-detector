import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function ReportScam() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("Job Scam");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!message.trim()) {
      setError("Please enter the suspicious message.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://scam-message-detector-1.onrender.com/api/reports",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            message,
            category,
            description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to submit report.");
        setLoading(false);
        return;
      }

      setSuccess("Scam report submitted successfully!");

      setMessage("");
      setCategory("Job Scam");
      setDescription("");

      setTimeout(() => {
        navigate("/reports");
      }, 1500);
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

        <h1>🚨 Report a Scam</h1>

        <p>
          Help others by reporting suspicious messages,
          job offers, or online scams.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Suspicious Message</label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste the suspicious message here..."
              rows="8"
              required
            />
          </div>

          <div className="form-group">
            <label>Scam Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Job Scam">
                Job Scam
              </option>

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

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Explain why you think this message is a scam..."
              rows="5"
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {success && (
            <p className="auth-message">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Scam Report"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ReportScam;
