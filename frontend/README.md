# JobSync

JobSync is a full-stack job portal built with React, Node.js, Express, MongoDB, and JWT authentication.

## Features

- Student and recruiter dashboards
- Job browsing and application flow
- Saved jobs
- AI Career Assistant with:
  - Interview question generation
  - Cover letter generation
  - Resume matching

## Setup

### 1. Install dependencies

```bash
npm install
cd backend && npm install
```

### 2. Configure environment variables

Create a `.env` file in the backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

### 3. Run the app

Start the backend:

```bash
cd backend
node server.js
```

Start the frontend:

```bash
cd frontend
npm run dev
```

### 4. Use the AI features

After logging in, open:

```text
/ai
```

You can use the three tabs for:
- Interview Questions
- Cover Letter
- Resume Match

## Notes

- The AI routes are protected with the existing JWT authentication.
- The Gemini API key is used only on the backend and is never exposed to the frontend.
