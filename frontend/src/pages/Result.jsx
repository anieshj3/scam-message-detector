import { Link } from "react-router-dom";

function Result() {
  const savedResult = localStorage.getItem("analysisResult");

  console.log("Saved result:", savedResult);

  if (!savedResult) {
    return (
      <div className="result-container">
        <div className="result-message">
          <h1>No Analysis Result</h1>

          <p>
            No analysis result was found.
            Please analyze a message first.
          </p>

          <Link to="/analyze" className="primary-btn">
            Analyze Message
          </Link>
        </div>
      </div>
    );
  }

  const result = JSON.parse(savedResult);

  return (
    <div className="result-container">

      <h1>🔍 Scam Analysis Result</h1>

      <div className="result-score">
        <h2>{result.score}/100</h2>
        <p>Risk Score</p>
      </div>

      <div className="result-risk">
        <h2>{result.riskLevel}</h2>
        <p>Risk Level</p>
      </div>

      <div className="result-message">
        <h3>📩 Analyzed Message</h3>

        <p>{result.originalMessage}</p>
      </div>

      <div className="result-reasons">
        <h3>⚠️ Why This Message May Be Suspicious</h3>

        {result.reasons && result.reasons.length > 0 ? (
          <ul>
            {result.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        ) : (
          <p>No suspicious patterns were detected.</p>
        )}
      </div>

      <Link
        to="/analyze"
        className="primary-btn"
      >
        Analyze Another Message
      </Link>

    </div>
  );
}

export default Result;