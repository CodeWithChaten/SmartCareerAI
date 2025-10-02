# AI-Based Smart Allocation Engine for PM Internship Scheme

**SIH25033** - Intelligent internship matching and allocation system using AI algorithms to connect students with suitable internship opportunities under the PM Internship Scheme.

## Project Overview

This platform uses machine learning algorithms to match students with internship opportunities based on skills, preferences, academic performance, and organizational requirements. It streamlines the allocation process for government internship programs.

## Project Structure

```
SIH25033/
├── frontend/          # React + Vite + Tailwind CSS
├── backend/           # FastAPI + MongoDB + AI Engine
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- Python (v3.9 or higher)
- MongoDB (local installation or MongoDB Atlas account)

## 🚀 Quick Start with Demo

Try the application immediately with demo accounts - no setup required!

### Demo Credentials

Visit the login page and click on any demo button:

- **👨‍🎓 Student Demo:** `demo.student@pminternship.gov.in` / `student123`
- **🏢 Organization Demo:** `demo.org@company.com` / `org123`
- **👨‍💼 Admin Demo:** `admin@pminternship.gov.in` / `admin123`

See [DEMO_CREDENTIALS.md](./DEMO_CREDENTIALS.md) for detailed information.

## Setup Instructions

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

The backend will run on `http://localhost:8000`

### MongoDB Setup

1. Install MongoDB locally or create a MongoDB Atlas account
2. Update the MongoDB connection string in `backend/.env`

## Environment Variables

### Backend (.env)
```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=sih25033
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Development

- Frontend dev server: `npm run dev` (in frontend folder)
- Backend dev server: `uvicorn main:app --reload` (in backend folder)

## Key Features

### For Students
- Create detailed skill profiles
- AI-powered internship recommendations
- Application tracking and status updates
- Document upload (resume, certificates)
- Preference-based matching

### For Organizations
- Post internship opportunities
- Define skill requirements and criteria
- AI-assisted candidate shortlisting
- Application management
- Student evaluation and feedback

### For Admins
- Monitor allocation statistics
- Oversee matching algorithms
- Approve organizations and internships
- Generate reports and analytics
- System configuration and management

## Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios (for API calls)
- React Router DOM

### Backend
- FastAPI
- Motor (async MongoDB driver)
- Pydantic
- Python-dotenv
- Scikit-learn (for ML matching)
- Pandas (data processing)

### Database
- MongoDB
