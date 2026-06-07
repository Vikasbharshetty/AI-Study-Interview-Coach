# AI Study & Interview Coach

A beginner-friendly full-stack project that helps users upload a resume, generate interview questions with Claude, practice topic-wise quizzes, save progress, and let an admin view users and activity.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Authentication: JWT
- AI: Claude API through the official Anthropic SDK
- File upload: Resume PDF upload with Multer and PDF text extraction

## Folder Structure

```text
ai-study-interview-coach/
  backend/
    src/
      config/
      middleware/
      models/
      routes/
      utils/
      server.js
    uploads/
    .env.example
    package.json
  frontend/
    src/
      api/
      components/
      context/
      pages/
      App.jsx
      main.jsx
      index.css
    index.html
    package.json
    postcss.config.js
    tailwind.config.js
  README.md
```

## Environment Variables

Create `backend/.env` from `backend/.env.example`.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai_study_interview_coach
JWT_SECRET=change_this_to_a_long_random_secret
CLAUDE_API_KEY=your_anthropic_api_key
CLAUDE_MODEL=claude-3-5-sonnet-latest
CLIENT_URL=http://localhost:5173
```

Create `frontend/.env` from `frontend/.env.example`.

```env
VITE_API_URL=http://localhost:5000/api
```

## Setup Commands

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend, in another terminal
cd frontend
npm install
npm run dev
```

Open:

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:5000/api/health`

## Backend API Routes

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create a user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/users/me` | Get logged-in user profile |
| POST | `/api/resumes/upload` | Upload resume PDF and extract text |
| GET | `/api/resumes/me` | Get logged-in user's resumes |
| POST | `/api/ai/questions` | Generate interview questions from resume |
| POST | `/api/ai/answers` | Generate answers for questions |
| GET | `/api/ai/history` | Show previous AI-generated questions |
| GET | `/api/topics` | List preparation topics |
| GET | `/api/topics/:topic` | Get topic content |
| POST | `/api/quizzes/:topic/submit` | Submit quiz and save score |
| GET | `/api/progress/me` | Get saved progress |
| GET | `/api/admin/users` | Admin: view users |
| GET | `/api/admin/activity` | Admin: view activity |

Protected routes need this header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Postman Testing Steps

1. Register:
   - `POST http://localhost:5000/api/auth/register`
   - Body:
     ```json
     {
       "name": "Vikas",
       "email": "vikas@example.com",
       "password": "password123"
     }
     ```
2. Login:
   - `POST http://localhost:5000/api/auth/login`
   - Copy the returned `token`.
3. Set Postman Authorization:
   - Type: Bearer Token
   - Token: paste JWT
4. Upload resume:
   - `POST http://localhost:5000/api/resumes/upload`
   - Body: `form-data`
   - Key: `resume`
   - Value: choose a PDF file
5. Generate questions:
   - `POST http://localhost:5000/api/ai/questions`
   - Body:
     ```json
     {
       "resumeId": "PASTE_RESUME_ID",
       "role": "Full Stack Developer",
       "count": 5
     }
     ```
6. Generate answers:
   - `POST http://localhost:5000/api/ai/answers`
   - Body:
     ```json
     {
       "questionSetId": "PASTE_QUESTION_SET_ID"
     }
     ```
7. Submit quiz:
   - `POST http://localhost:5000/api/quizzes/java/submit`
   - Body:
     ```json
     {
       "answers": [0, 1, 2]
     }
     ```
8. View progress:
   - `GET http://localhost:5000/api/progress/me`
9. Test admin routes:
   - Change one user's `role` to `admin` in MongoDB.
   - Login as that user and call `/api/admin/users`.

## Deployment Steps

### Backend

1. Create a MongoDB Atlas cluster.
2. Deploy backend to Render, Railway, or Fly.io.
3. Add environment variables from `backend/.env.example`.
4. Set `CLIENT_URL` to your deployed frontend URL.
5. Ensure the service starts with:
   ```bash
   npm start
   ```

### Frontend

1. Deploy to Vercel or Netlify.
2. Set:
   ```env
   VITE_API_URL=https://your-backend-url.com/api
   ```
3. Build command:
   ```bash
   npm run build
   ```
4. Output directory:
   ```text
   dist
   ```

## Resume Points

- Built a MERN full-stack AI Study & Interview Coach with JWT authentication and protected dashboards.
- Integrated Claude API to generate resume-based interview questions and structured answer explanations.
- Implemented PDF resume upload and text extraction using Multer and PDF parsing.
- Designed MongoDB schemas for users, resumes, AI question history, quiz attempts, user progress, and activity logs.
- Added topic-wise preparation modules for Java, SQL, MongoDB, Docker, DSA, OS, and Computer Networks.
- Built quiz scoring and progress tracking workflows persisted in MongoDB.
- Created an admin panel to monitor users and platform activity.

## Interview Explanation

This project is a MERN stack application that helps students prepare for technical interviews. Users register and log in with JWT authentication. After logging in, they can upload a resume PDF. The backend extracts text from the resume and sends a structured prompt to Claude, which generates interview questions based on the resume and selected role. Users can also generate answers, practice topic-wise content, take quizzes, and save their progress.

The backend is built with Express and MongoDB. Mongoose models separate users, resumes, AI question history, quiz attempts, progress, and activity logs. The frontend is built with React and Tailwind CSS, with protected pages for dashboard, resume upload, AI questions, preparation topics, quizzes, and admin views. Admin-only routes are protected with role-based middleware.

The main real-world value is personalization: instead of generic interview preparation, the app uses a candidate's actual resume to generate targeted questions and answers.
