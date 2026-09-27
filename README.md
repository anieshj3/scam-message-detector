# Scam Message Detector

A MERN stack web application that analyzes suspicious job offers, SMS, WhatsApp messages, and other text messages to identify possible scam indicators.

## Features

### User Features
- User registration and login
- JWT-based authentication
- Analyze suspicious messages
- Risk score from 0–100
- Risk levels: Low, Medium, High, Very High
- Display reasons behind the detected risk
- View analysis history
- Report suspected scams
- View scam reports
- User profile

### Admin Features
- Admin authentication
- Admin dashboard
- View application statistics
- View submitted scam reports
- Verify scam reports
- Reject scam reports

## Risk Classification

| Score | Risk Level |
|---|---|
| 0–29 | LOW |
| 30–59 | MEDIUM |
| 60–79 | HIGH |
| 80–100 | VERY HIGH |

## Scam Detection

The application uses rule-based detection to identify suspicious patterns such as:

- Upfront payment requests
- Registration fees
- Security deposits
- Guaranteed job offers
- Urgent language
- WhatsApp-only recruitment
- OTP requests
- Bank or password requests
- Fake company or government claims
- Unusually high salary promises

The application calculates a risk score and provides reasons explaining why a message may be suspicious.

## Tech Stack

### Frontend
- React
- React Router
- Vite
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Tools
- Git
- GitHub
- Postman
- VS Code

## Project Structure

```text
scam-message-detector/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/anieshj3/scam-message-detector.git
cd scam-message-detector
```

## Backend Setup

Open a terminal:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/scamMessageDetector
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on the Vite development URL shown in the terminal, normally:

```text
http://localhost:5173
```

## Application Flow

```text
User
  ↓
Register / Login
  ↓
Analyze Message
  ↓
Scam Detection Engine
  ↓
Risk Score + Reasons
  ↓
Save Analysis History
  ↓
Report Scam (optional)
  ↓
Admin Reviews Reports
```

## Database Models

### User
Stores:
- Name
- Email
- Password
- Role

### Analysis
Stores:
- User
- Original message
- Risk score
- Risk level
- Detection reasons
- Timestamp

### Scam Report
Stores:
- User
- Reported message
- Category
- Description
- Status
- Timestamp

## Authentication

The application uses JWT authentication.

Passwords are protected using bcryptjs.

Admin-only actions are protected using admin middleware.

## Application Pages

- Home
- Login
- Register
- Analyze
- Result
- History
- Scam Reports
- Report Scam
- Profile
- Admin Dashboard

## Testing

The application was tested for:

- User registration
- User login
- Admin login
- Message analysis
- Risk score generation
- Analysis history
- Scam reporting
- Admin report verification
- Admin report rejection
- Protected routes
- Frontend and backend integration

## Future Improvements

- Machine learning based scam detection
- Email and SMS integrations
- More advanced scam categories
- Improved analytics
- Cloud deployment
- Email notifications
- More secure API authorization
- Mobile-friendly improvements

## Developer

**Aniesh J.**

B.E. Computer Science and Engineering

MERN Stack Developer

GitHub: https://github.com/anieshj3
