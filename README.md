# AI Interview Preparation Platform

An AI-powered interview preparation platform that helps students and job seekers practice technical and HR interviews through intelligent question generation, resume-based assessments, detailed feedback, and performance analytics.

## Live Demo

https://ai-interview-platform-nu-henna.vercel.app

## Features

### Authentication System

* User Registration
* User Login
* Secure Session Management using Local Storage
* Personalized User Dashboard

### AI-Powered Interview Generation

* Generate technical interview questions
* Generate HR interview questions
* Multiple difficulty levels
* Role-based interview preparation

### Resume-Based Interviews

* Upload Resume
* AI analyzes resume content
* Generates personalized interview questions based on:

  * Skills
  * Projects
  * Technologies
  * Internship Experience
  * Academic Background

### AI Evaluation & Feedback

* Question-wise evaluation
* Score calculation
* Strengths analysis
* Weakness identification
* Improvement suggestions
* Overall interview summary

### Performance Dashboard

* Total interviews completed
* Average score tracking
* Best score achieved
* Recent interview performance
* Interview history
* Performance trend visualization

### Modern User Interface

* Professional landing page
* Responsive design
* Interactive dashboard
* Clean navigation
* Modern dark theme

---

## Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* React Router DOM

### AI Integration

* Google Gemini AI
* Gemini 2.5 Flash Model

### Visualization

* Recharts

### PDF & Reporting

* html2canvas
* jsPDF

### Deployment

* Vercel

---

## Project Structure

```bash
src/
│
├── pages/
│   ├── Base.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Interview.jsx
│   ├── ResumeInterview.jsx
│   ├── Feedback.jsx
│   └── Logout.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── QuestionCard.jsx
│   └── FeedbackCard.jsx
│
├── services/
│   └── gemini.js
│
├── App.jsx
└── main.jsx
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/prathyusha031/AI-Interview-Platform.git
```

### Move to Project Directory

```bash
cd AI-Interview-Platform
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Start Development Server

```bash
npm run dev
```

---

## Build for Production

```bash
npm run build
```

---

## Deployment

This project is deployed on Vercel.

### Vercel Configuration

Create `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Screenshots

### Landing Page

* Professional introduction page
* Login and Registration options
* Get Started workflow

### Dashboard

* User profile section
* Interview analytics
* Performance tracking
* Score trends

### Resume Interview

* Resume upload
* AI-generated questions
* Personalized assessment

---

## Future Enhancements

* Backend Integration with Django
* JWT Authentication
* PostgreSQL Database
* User Profile Management
* Leaderboards
* Mock Video Interviews
* Speech-to-Text Evaluation
* Interview Scheduling
* Email Notifications
* Cloud Storage for Reports

---

## Author

**Bailapudi Prathyusha**

* GitHub: https://github.com/prathyusha031
* LinkedIn: Add your LinkedIn profile link here
* Email: [bailapudiprathyusha@gmail.com](mailto:bailapudiprathyusha@gmail.com)

---

## License

This project is developed for educational, learning, and portfolio purposes.
