function detectScam(message) {
  const text = message.toLowerCase();

  let score = 0;
  const reasons = [];

  const patterns = [
    {
      words: [
        "registration fee",
        "processing fee",
        "security deposit",
        "joining fee",
        "pay money",
        "pay now",
        "payment required",
        "send money",
        "transfer money",
        "pay ₹",
        "pay rs",
      ],
      score: 25,
      reason: "Payment request detected",
    },

    {
      words: [
        "urgent",
        "immediately",
        "act now",
        "limited time",
        "today only",
        "within 24 hours",
      ],
      score: 10,
      reason: "Urgent or pressure-based language detected",
    },

    {
      words: [
        "guaranteed job",
        "guaranteed placement",
        "selected for the job",
        "job confirmation",
        "job offer",
        "work from home",
      ],
      score: 15,
      reason: "Suspicious job-related claim detected",
    },

    {
      words: [
        "otp",
        "bank account",
        "bank details",
        "password",
        "credit card",
        "debit card",
        "pin",
        "cvv",
      ],
      score: 20,
      reason: "Sensitive personal or financial information requested",
    },

    {
      words: [
        "earn ₹",
        "earn rs",
        "salary",
        "lakh per month",
        "per month",
        "high salary",
        "easy money",
      ],
      score: 10,
      reason: "Unusually attractive income claim detected",
    },

    {
      words: [
        "whatsapp only",
        "contact only on whatsapp",
        "telegram",
        "dm me",
      ],
      score: 10,
      reason: "Unusual recruitment communication method detected",
    },

    {
      words: [
        "no interview",
        "without interview",
        "no experience required",
        "instant job",
        "instant joining",
      ],
      score: 15,
      reason: "Unusual hiring promise detected",
    },

    {
      words: [
        "click this link",
        "click here",
        "verify your account",
        "verify immediately",
      ],
      score: 10,
      reason: "Suspicious link or verification request detected",
    },
  ];

  patterns.forEach((pattern) => {
    const matchedWords = pattern.words.filter((word) =>
      text.includes(word)
    );

    if (matchedWords.length > 0) {
      score += pattern.score;

      reasons.push(
        `${pattern.reason}: "${matchedWords[0]}"`
      );
    }
  });

  if (score > 100) {
    score = 100;
  }

  let riskLevel;

  if (score >= 80) {
    riskLevel = "VERY HIGH";
  } else if (score >= 60) {
    riskLevel = "HIGH";
  } else if (score >= 30) {
    riskLevel = "MEDIUM";
  } else {
    riskLevel = "LOW";
  }

  return {
    score,
    riskLevel,
    reasons,
  };
}

module.exports = detectScam;