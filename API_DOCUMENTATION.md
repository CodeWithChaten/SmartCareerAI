# PM Internship Scheme - API Documentation

## Base URL
```
http://localhost:8000
```

## API Endpoints

### 🏠 General Endpoints

#### Health Check
```http
GET /health
```
Returns system health status.

#### Root
```http
GET /
```
Returns API information and documentation links.

---

### 👨‍🎓 Student Endpoints

#### Create Student Profile
```http
POST /api/students/profile
Content-Type: application/json

{
  "user_id": "user123",
  "education": "Bachelor of Technology",
  "institution": "IIT Delhi",
  "graduation_year": 2025,
  "skills": ["Python", "React", "MongoDB", "FastAPI"],
  "interests": ["Web Development", "AI/ML"],
  "cgpa": 8.5,
  "resume_url": "https://example.com/resume.pdf",
  "github_url": "https://github.com/username",
  "linkedin_url": "https://linkedin.com/in/username",
  "preferred_locations": ["Delhi", "Bangalore", "Mumbai"],
  "preferred_domains": ["Technology", "Fintech"]
}
```

#### Get Student Profile
```http
GET /api/students/profile/{user_id}
```

#### Update Student Profile
```http
PUT /api/students/profile/{user_id}
Content-Type: application/json
```

#### Get All Profiles (Admin)
```http
GET /api/students/profiles
```

---

### 💼 Internship Endpoints

#### Create Internship
```http
POST /api/internships
Content-Type: application/json

{
  "title": "Full Stack Developer Intern",
  "description": "Work on cutting-edge web applications...",
  "organization_id": "org123",
  "organization_name": "Tech Mahindra",
  "location": "Bangalore",
  "duration_months": 6,
  "stipend": 15000,
  "required_skills": ["React", "Node.js", "MongoDB"],
  "preferred_skills": ["TypeScript", "Docker"],
  "eligibility_criteria": "BE/BTech in CSE, 7+ CGPA",
  "vacancies": 5,
  "application_deadline": "2025-11-30T23:59:59",
  "status": "active"
}
```

#### Get All Internships
```http
GET /api/internships?status=active&organization_id=org123&limit=50
```

#### Get Internship by ID
```http
GET /api/internships/{internship_id}
```

#### Update Internship
```http
PUT /api/internships/{internship_id}
Content-Type: application/json
```

#### Delete Internship
```http
DELETE /api/internships/{internship_id}
```

#### Search by Skills
```http
GET /api/internships/search/skills?skills=Python&skills=React
```

---

### 📝 Application Endpoints

#### Submit Application
```http
POST /api/applications
Content-Type: application/json

{
  "student_id": "student123",
  "internship_id": "internship456",
  "cover_letter": "I am interested in this position because..."
}
```

#### Get Student Applications
```http
GET /api/applications/student/{student_id}
```

#### Get Internship Applications
```http
GET /api/applications/internship/{internship_id}
```

#### Update Application Status
```http
PUT /api/applications/{application_id}/status?new_status=shortlisted
```

Status options: `applied`, `under_review`, `shortlisted`, `rejected`, `accepted`

#### Get Application by ID
```http
GET /api/applications/{application_id}
```

---

### 🎯 AI Matching Endpoint

#### Get AI-Powered Recommendations
```http
POST /api/applications/match
Content-Type: application/json

{
  "student_id": "student123",
  "limit": 10
}
```

**Response:**
```json
[
  {
    "internship_id": "67890",
    "internship_title": "Full Stack Developer Intern",
    "organization_name": "Tech Mahindra",
    "match_score": 92.5,
    "matching_skills": ["React", "Node.js", "MongoDB"],
    "location": "Bangalore",
    "stipend": 15000,
    "duration_months": 6
  }
]
```

---

## Data Models

### Student Profile
```typescript
{
  user_id: string
  education: string
  institution: string
  graduation_year: number
  skills: string[]
  interests: string[]
  cgpa?: number (0-10)
  resume_url?: string
  github_url?: string
  linkedin_url?: string
  preferred_locations: string[]
  preferred_domains: string[]
}
```

### Internship
```typescript
{
  title: string
  description: string
  organization_id: string
  organization_name: string
  location: string
  duration_months: number (1-12)
  stipend?: number
  required_skills: string[]
  preferred_skills: string[]
  eligibility_criteria: string
  vacancies: number
  application_deadline: datetime
  status: "draft" | "active" | "closed" | "filled"
}
```

### Application
```typescript
{
  student_id: string
  internship_id: string
  cover_letter?: string
  status: "applied" | "under_review" | "shortlisted" | "rejected" | "accepted"
  match_score?: number
}
```

---

## AI Matching Algorithm

The matching algorithm considers:
1. **Required Skills Match** (50% weight) - Essential skills alignment
2. **Preferred Skills Match** (20% weight) - Additional skills bonus
3. **Location Preference** (30% weight) - Geographic preference

**Match Score Calculation:**
```
Score = (Required Skills Match × 50) + (Preferred Skills Match × 20) + (Location Match × 30)
```

Only internships with >40% match score are returned.

---

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid input format"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## Interactive Documentation

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
