# 🚀 JobSync - AI-Powered Job Portal & Career Suite

<p align="center">
  <strong>A modern, full-stack recruitment platform with role-based workflows and intelligent AI career tools powered by Google Gemini.</strong>
</p>

<p align="center">
  <a href="https://frontend-sepia-five-80.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-Visit_JobSync-0070F3?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5.0-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Google_Gemini-2.0_Flash-8E75B2?style=flat-square&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

---

## 🌐 Live Deployment Links

- **Frontend App**: [https://frontend-sepia-five-80.vercel.app](https://frontend-sepia-five-80.vercel.app) (Hosted on Vercel)
- **Backend API**: Hosted as a Web Service on Render
- **Database**: Cloud-hosted on MongoDB Atlas

---

## 📌 About The Project

**JobSync** bridges the gap between ambitious job seekers and forward-thinking recruiters. It combines essential applicant tracking system (ATS) capabilities with cutting-edge **Generative AI** features to help candidates prepare and recruiters find the right match faster.

---

## ✨ Key Features

### 👨‍🎓 For Candidates / Students
- 🔍 **Smart Job Search & Filters**: Search jobs in real-time by title, location, type (Remote/On-site), and domain.
- ⚡ **1-Click Application**: Apply directly with auto-populated profile details.
- 📌 **Saved Jobs**: Bookmark interesting openings to review or apply later.
- 📊 **Application Status Tracker**: Monitor application stages in real-time (`Pending`, `Shortlisted`, `Accepted`, `Rejected`).
- 🤖 **AI Career Assistant**:
  - **Resume Matcher**: Upload your PDF resume against a Job Description to get an ATS-style match percentage, missing keywords, and actionable recommendations.
  - **Cover Letter Generator**: Generate professional, role-tailored cover letters tailored to your profile.
  - **Interview Prep Coach**: Practice role-specific technical and behavioral questions with AI-generated tips.

### 👔 For Recruiters
- 📝 **Job Posting & Management**: Create, edit, update, or archive job openings with detailed requirements and salary ranges.
- 👥 **Candidate Pipeline**: Review applicant profiles, download attached resumes, and change candidate statuses with one click.
- 📈 **Recruiter Dashboard**: Quick overview of active job listings, total applicants, and recruitment metrics.

### 🔒 Security & Architecture
- **Role-Based Access Control (RBAC)**: Distinct permissions and protected routes for candidates and recruiters.
- **Secure Authentication**: Passwords hashed with `bcryptjs` and session management via JSON Web Tokens (`JWT`).
- **In-Memory File Processing**: Resumes processed securely in-memory using `multer` and `pdf-parse` without leaving sensitive files on disk.

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router 7, Axios, React Hot Toast, Heroicons |
| **Backend** | Node.js, Express 5, Mongoose, Multer, PDF-Parse, CORS, Dotenv |
| **Database** | MongoDB Atlas |
| **AI Integration** | Google Gemini AI (`@google/genai`) |
| **Deployment** | Vercel (Frontend SPA with rewrite rules), Render (Backend Node service) |

---

## 📂 Project Architecture

```bash
JOBSYNC/
├── backend/
│   ├── config/          # MongoDB connection & DNS setup
│   ├── controllers/     # Handlers (Auth, Jobs, Applications, AI, Dashboard)
│   ├── middleware/      # JWT auth verification, error handler
│   ├── models/          # Mongoose Schemas (User, Job, Application)
│   ├── routes/          # Express API routes
│   ├── services/        # Google Gemini AI services
│   └── server.js        # Main backend server entry
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components (Navbar, Cards, Modals)
│   │   ├── context/     # Auth Context & global state
│   │   ├── pages/       # Dashboard, Job Listings, AI Career Studio, Auth
│   │   ├── services/    # Centralized Axios API instances
│   │   └── routes/      # Client-side protected route wrappers
│   ├── vercel.json      # SPA routing fallback rules
│   └── vite.config.js
│
└── package.json         # Root scripts for monorepo management
```

---

## 🔗 Key API Endpoints

### Auth Routes (`/api/auth`)
- `POST /register` - Register a new candidate or recruiter
- `POST /login` - Authenticate user & receive JWT

### Job Routes (`/jobs`)
- `GET /` - Fetch all active jobs (with filters)
- `POST /` - Create a new job (Recruiter only)
- `GET /my-jobs` - Get jobs posted by the logged-in recruiter
- `PUT /:id` - Update job listing
- `DELETE /:id` - Delete job listing

### Application Routes (`/api/applications`)
- `POST /apply` - Submit application for a job
- `GET /my-applications` - Get candidate's applied jobs
- `GET /job/:jobId` - Get all applicants for a recruiter's job
- `PATCH /:id/status` - Update application status

### AI Career Routes (`/api/ai`)
- `POST /match-resume` - Upload PDF resume & compare against job description
- `POST /cover-letter` - Generate customized cover letter
- `POST /interview-prep` - Generate role-specific interview Q&As

---

## ⚙️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/Yogesh-giri1015/JOBSYNC.git
cd JOBSYNC
```

### 2. Install dependencies
```bash
# Installs backend and frontend dependencies
npm run install:all
```

### 3. Setup Environment Variables

Create `.env` in `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Create `.env` in `frontend/`:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Start Development Servers

```bash
# Start backend (Port 5000)
npm run backend

# Start frontend (Port 5173)
npm run frontend
```

---

## 👨‍💻 Author

**Yogesh Giri**
- GitHub: [@Yogesh-giri1015](https://github.com/Yogesh-giri1015)
- Project: [JobSync](https://github.com/Yogesh-giri1015/JOBSYNC)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
