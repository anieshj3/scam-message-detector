function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <p className="home-badge">🛡️ Smart Scam Detection</p>

        <h1>
          Stay Safe From <span>Online Scams</span>
        </h1>

        <p>
          Analyze suspicious job offers, SMS messages, WhatsApp messages,
          and online recruitment messages before you trust them.
        </p>

        <button className="primary-btn">
          Analyze a Message
        </button>

        <div className="home-features">
          <div>
            <strong>🔍</strong>
            <span>Message Analysis</span>
          </div>

          <div>
            <strong>⚡</strong>
            <span>Instant Risk Score</span>
          </div>

          <div>
            <strong>🛡️</strong>
            <span>Scam Detection</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;