# 🚀 Quick Start Guide - PM Internship Scheme

## Prerequisites

- ✅ Node.js (v18 or higher)
- ✅ Python (v3.9 or higher)
- ✅ MongoDB (local or Atlas)

## 📦 Installation Steps

### 1️⃣ Frontend Setup

```powershell
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:5173**

### 2️⃣ Backend Setup

```powershell
# Navigate to backend folder (in new terminal)
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env
# Edit .env and update MongoDB connection string

# Start backend server
uvicorn main:app --reload
```

Backend will run on: **http://localhost:8000**

### 3️⃣ MongoDB Setup

#### Option A: Local MongoDB
```powershell
# Install MongoDB Community Edition
# Start MongoDB service
mongod --dbpath C:\data\db
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `.env` file:
```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
DATABASE_NAME=pm_internship_scheme
```

## 🎮 Using the Application

### Test Login Credentials (Mock)

**Student Account:**
- Email: student@example.com
- Password: (any)
- Role: Student

**Organization Account:**
- Email: org@techmahindra.com
- Password: (any)
- Role: Organization

**Admin Account:**
- Email: admin@gov.in
- Password: (any)
- Role: Admin

### Navigation Flow

1. **Home Page** → Click "Get Started"
2. **Login** → Select role and login
3. **Dashboard** → Explore role-specific features

## 📊 Testing the API

### Interactive Documentation
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

### Sample API Calls

#### 1. Create Student Profile
```bash
curl -X POST "http://localhost:8000/api/students/profile" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "student001",
    "education": "B.Tech Computer Science",
    "institution": "IIT Delhi",
    "graduation_year": 2025,
    "skills": ["Python", "React", "MongoDB", "FastAPI"],
    "cgpa": 8.5,
    "preferred_locations": ["Delhi", "Bangalore"]
  }'
```

#### 2. Create Internship
```bash
curl -X POST "http://localhost:8000/api/internships" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Full Stack Developer Intern",
    "description": "Work on cutting-edge projects",
    "organization_id": "org001",
    "organization_name": "Tech Mahindra",
    "location": "Bangalore",
    "duration_months": 6,
    "stipend": 15000,
    "required_skills": ["React", "Node.js"],
    "eligibility_criteria": "BE/BTech, 7+ CGPA",
    "vacancies": 5,
    "application_deadline": "2025-11-30T23:59:59"
  }'
```

#### 3. Get AI Recommendations
```bash
curl -X POST "http://localhost:8000/api/applications/match" \
  -H "Content-Type: application/json" \
  -d '{
    "student_id": "student001",
    "limit": 10
  }'
```

## 🛠️ Development Commands

### Frontend
```powershell
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```powershell
uvicorn main:app --reload          # Start with auto-reload
uvicorn main:app --host 0.0.0.0    # Expose to network
python -m pytest                    # Run tests (if configured)
```

## 📁 Project Structure

```
SIH25033/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Table.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── OrganizationDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx         # Main app with routing
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── routers/            # API endpoints
│   │   ├── students.py     # Student profile APIs
│   │   ├── internships.py  # Internship APIs
│   │   ├── applications.py # Application & AI matching
│   │   └── items.py        # Sample CRUD
│   ├── main.py             # FastAPI app
│   ├── models.py           # Pydantic models
│   ├── database.py         # MongoDB connection
│   └── requirements.txt
│
├── README.md
├── API_DOCUMENTATION.md
├── FEATURES.md
└── SETUP_GUIDE.md
```

## 🎯 Feature Checklist

### ✅ Completed Features
- [x] Student profile management
- [x] Internship posting system
- [x] Application submission
- [x] AI-powered matching algorithm
- [x] Role-based dashboards
- [x] Responsive UI design
- [x] API documentation
- [x] MongoDB integration

### 🔄 Pending Features (For Production)
- [ ] JWT authentication
- [ ] Password hashing
- [ ] Email notifications
- [ ] File upload (resume, documents)
- [ ] Advanced ML models
- [ ] Payment integration (if needed)
- [ ] Report generation
- [ ] Admin analytics

## 🐛 Troubleshooting

### Issue: MongoDB Connection Failed
```
Solution: Check MongoDB is running
- Local: Start MongoDB service
- Atlas: Verify connection string in .env
```

### Issue: Frontend Can't Connect to Backend
```
Solution: Check CORS settings
- Verify backend is running on port 8000
- Check frontend proxy in vite.config.js
```

### Issue: Module Not Found
```
Solution: Reinstall dependencies
Frontend: npm install
Backend: pip install -r requirements.txt
```

### Issue: Port Already in Use
```
Solution: Change port or kill process
Frontend: Update port in vite.config.js
Backend: uvicorn main:app --port 8001
```

## 📞 Support

For issues or questions:
1. Check API documentation: `/docs`
2. Review FEATURES.md for capabilities
3. Check error logs in terminal

## 🎓 Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Docs](https://www.mongodb.com/docs/)
- [Vite Guide](https://vitejs.dev/)

## 🚀 Deployment (Production Ready)

### Frontend (Vercel/Netlify)
```powershell
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/AWS)
```powershell
# Ensure requirements.txt is updated
pip freeze > requirements.txt

# Create Procfile
echo "web: uvicorn main:app --host 0.0.0.0 --port $PORT" > Procfile
```

### Database (MongoDB Atlas)
- Use production connection string
- Enable IP whitelist
- Set up backup policies

---

**🇮🇳 Built for PM Internship Scheme - Smart Allocation Engine**
