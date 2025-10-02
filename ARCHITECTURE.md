# System Architecture - PM Internship Scheme

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│   │   Student    │  │ Organization │  │    Admin     │         │
│   │  Dashboard   │  │  Dashboard   │  │  Dashboard   │         │
│   └──────────────┘  └──────────────┘  └──────────────┘         │
│          │                  │                  │                 │
│          └──────────────────┴──────────────────┘                │
│                       │                                          │
│              React + Vite + Tailwind CSS                        │
│              (Port 5173)                                        │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        │ HTTP/REST API
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│                      API GATEWAY LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│                    FastAPI Framework                             │
│                      (Port 8000)                                 │
│                                                                   │
│   ┌──────────────────────────────────────────────────────┐     │
│   │              API Router Layer                         │     │
│   ├──────────────────────────────────────────────────────┤     │
│   │  /api/students      │  Student Profile Management    │     │
│   │  /api/internships   │  Internship CRUD Operations   │     │
│   │  /api/applications  │  Application & AI Matching    │     │
│   │  /api/items         │  General CRUD (Sample)        │     │
│   └──────────────────────────────────────────────────────┘     │
│                                                                   │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌────────────────────────────────────────────────────┐        │
│   │         AI Matching Engine                         │        │
│   ├────────────────────────────────────────────────────┤        │
│   │  • Skill-based matching (50% weight)              │        │
│   │  • Preferred skills (20% weight)                  │        │
│   │  • Location preference (30% weight)               │        │
│   │  • Score calculation & ranking                    │        │
│   │  • Threshold filtering (>40%)                     │        │
│   └────────────────────────────────────────────────────┘        │
│                                                                   │
│   ┌────────────────────────────────────────────────────┐        │
│   │         Pydantic Models (Validation)               │        │
│   ├────────────────────────────────────────────────────┤        │
│   │  • UserBase, StudentProfile                       │        │
│   │  • Internship, Application                        │        │
│   │  • MatchResult, MatchRequest                      │        │
│   └────────────────────────────────────────────────────┘        │
│                                                                   │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        │ Motor (Async Driver)
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│                    DATABASE LAYER                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│                      MongoDB Atlas                               │
│                (or Local MongoDB Instance)                       │
│                                                                   │
│   ┌─────────────────────────────────────────────────┐           │
│   │  Collections:                                    │           │
│   ├─────────────────────────────────────────────────┤           │
│   │  • users              - Authentication data     │           │
│   │  • student_profiles   - Skills & preferences    │           │
│   │  • internships        - Postings & requirements │           │
│   │  • applications       - Submissions & status    │           │
│   │  • items              - Sample CRUD data        │           │
│   └─────────────────────────────────────────────────┘           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagrams

### 1. Student Application Flow

```
┌─────────┐     ┌────────────┐     ┌──────────┐     ┌─────────┐
│ Student │────▶│  Frontend  │────▶│ FastAPI  │────▶│ MongoDB │
└─────────┘     └────────────┘     └──────────┘     └─────────┘
     │               │                   │                │
     │               │                   │                │
     │  1. Browse    │                   │                │
     │  Internships  │                   │                │
     │               │                   │                │
     │◀──────────────│◀──────────────────│◀───────────────│
     │               │                   │                │
     │  2. Request   │                   │                │
     │  AI Match     │────▶ POST /match │────▶ Calculate │
     │               │                   │      Score     │
     │               │                   │                │
     │◀──────────────│◀──────────────────│◀───────────────│
     │ Ranked List   │                   │                │
     │               │                   │                │
     │  3. Apply     │                   │                │
     │  to Position  │────▶ POST /apply │────▶ Store     │
     │               │                   │                │
     │◀──────────────│◀──────────────────│◀───────────────│
     │ Confirmation  │                   │                │
```

### 2. Organization Posting Flow

```
┌──────────────┐     ┌────────────┐     ┌──────────┐     ┌─────────┐
│ Organization │────▶│  Frontend  │────▶│ FastAPI  │────▶│ MongoDB │
└──────────────┘     └────────────┘     └──────────┘     └─────────┘
       │                  │                   │                │
       │  1. Create       │                   │                │
       │  Internship      │────▶ POST /int    │────▶ Insert   │
       │                  │                   │                │
       │◀─────────────────│◀──────────────────│◀───────────────│
       │ Posted           │                   │                │
       │                  │                   │                │
       │  2. Get AI       │                   │                │
       │  Matches         │────▶ GET /match   │────▶ Calculate│
       │                  │                   │      & Sort    │
       │◀─────────────────│◀──────────────────│◀───────────────│
       │ Candidates       │                   │                │
       │                  │                   │                │
       │  3. Shortlist    │                   │                │
       │  Candidate       │────▶ PUT /status  │────▶ Update   │
       │                  │                   │                │
       │◀─────────────────│◀──────────────────│◀───────────────│
       │ Updated          │                   │                │
```

### 3. AI Matching Process

```
┌──────────────┐
│ Match Request│
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────┐
│  1. Get Student Profile          │
│     • Skills: [A, B, C]          │
│     • Locations: [X, Y]          │
│     • Domains: [Tech, Finance]   │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  2. Get Active Internships       │
│     • Required: [A, B]           │
│     • Preferred: [D, E]          │
│     • Location: X                │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  3. Calculate Match Scores       │
│     ┌──────────────────────────┐ │
│     │ Skills Match:      70%   │ │
│     │ × 50% weight = 35 pts    │ │
│     ├──────────────────────────┤ │
│     │ Preferred Match:   40%   │ │
│     │ × 20% weight = 8 pts     │ │
│     ├──────────────────────────┤ │
│     │ Location Match:   100%   │ │
│     │ × 30% weight = 30 pts    │ │
│     ├──────────────────────────┤ │
│     │ Total Score:      73%    │ │
│     └──────────────────────────┘ │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  4. Filter & Sort Results        │
│     • Remove < 40% matches       │
│     • Sort by score (desc)       │
│     • Limit to top N             │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  5. Return Ranked Results        │
│     [                             │
│       {score: 95%, ...},          │
│       {score: 88%, ...},          │
│       {score: 73%, ...}           │
│     ]                             │
└───────────────────────────────────┘
```

---

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                       │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Layer 1: Transport Security                             │
│  ┌───────────────────────────────────────────────┐      │
│  │ • HTTPS (Production)                           │      │
│  │ • CORS Configuration                           │      │
│  │ • Rate Limiting (Future)                       │      │
│  └───────────────────────────────────────────────┘      │
│                                                           │
│  Layer 2: Authentication & Authorization                 │
│  ┌───────────────────────────────────────────────┐      │
│  │ • JWT Tokens (To be implemented)               │      │
│  │ • Role-Based Access Control                    │      │
│  │ • Session Management                           │      │
│  └───────────────────────────────────────────────┘      │
│                                                           │
│  Layer 3: Input Validation                               │
│  ┌───────────────────────────────────────────────┐      │
│  │ • Pydantic Schema Validation                   │      │
│  │ • SQL/NoSQL Injection Prevention               │      │
│  │ • XSS Protection                               │      │
│  └───────────────────────────────────────────────┘      │
│                                                           │
│  Layer 4: Data Protection                                │
│  ┌───────────────────────────────────────────────┐      │
│  │ • Password Hashing (To be implemented)         │      │
│  │ • Sensitive Data Encryption                    │      │
│  │ • Environment Variable Protection              │      │
│  └───────────────────────────────────────────────┘      │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Component Interaction Matrix

```
┌─────────────┬──────────┬──────────────┬──────────────┬───────┐
│ Component   │ Student  │ Organization │    Admin     │  API  │
├─────────────┼──────────┼──────────────┼──────────────┼───────┤
│ Profile     │   R/W    │      R       │      R       │  ✓    │
│ Internship  │   R      │     R/W      │      R       │  ✓    │
│ Application │   R/W    │      R       │      R       │  ✓    │
│ AI Match    │   R      │      R       │      R       │  ✓    │
│ Analytics   │   R      │      R       │     R/W      │  ✓    │
│ Approval    │   -      │      -       │     R/W      │  ✓    │
└─────────────┴──────────┴──────────────┴──────────────┴───────┘

Legend: R = Read, W = Write, ✓ = Available
```

---

## 🚀 Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────────┐
│                      PRODUCTION SETUP                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│   ┌───────────────────────────────────────────────┐         │
│   │           CDN (Cloudflare/AWS CloudFront)     │         │
│   └───────────────┬───────────────────────────────┘         │
│                   │                                           │
│   ┌───────────────▼───────────────────────────────┐         │
│   │        Frontend (Vercel/Netlify)              │         │
│   │        React + Vite + Tailwind                │         │
│   └───────────────┬───────────────────────────────┘         │
│                   │                                           │
│   ┌───────────────▼───────────────────────────────┐         │
│   │       Load Balancer (AWS ALB/Nginx)           │         │
│   └───────────────┬───────────────────────────────┘         │
│                   │                                           │
│   ┌───────────────▼───────────────────────────────┐         │
│   │   Backend Instances (Railway/Render/AWS)      │         │
│   │   FastAPI + Gunicorn/Uvicorn Workers          │         │
│   └───────────────┬───────────────────────────────┘         │
│                   │                                           │
│   ┌───────────────▼───────────────────────────────┐         │
│   │       Database (MongoDB Atlas Cluster)        │         │
│   │       • Primary Node                          │         │
│   │       • Secondary Replicas                    │         │
│   │       • Automated Backups                     │         │
│   └───────────────────────────────────────────────┘         │
│                                                               │
│   Additional Services:                                       │
│   ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│   │ Email       │  │ File Storage │  │ Monitoring   │      │
│   │ (SendGrid)  │  │ (AWS S3)     │  │ (Datadog)    │      │
│   └─────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📈 Scalability Plan

```
Current Capacity:        Target Capacity:
┌──────────────┐        ┌──────────────┐
│ 1K users     │   ───▶ │ 1M users     │
│ 100 req/sec  │   ───▶ │ 10K req/sec  │
│ 1 server     │   ───▶ │ N servers    │
│ 1 DB         │   ───▶ │ Sharded DB   │
└──────────────┘        └──────────────┘

Scaling Strategy:
├─ Horizontal Scaling: Multiple backend instances
├─ Database Sharding: By region or user type
├─ Caching Layer: Redis for frequent queries
├─ CDN: Static asset delivery
├─ Load Balancing: Distribute traffic
└─ Async Processing: Background jobs queue
```

---

**🇮🇳 Built for PM Internship Scheme - Smart India Hackathon 2025**
