from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from database import db
from routers import items, students, internships, applications

# Load environment variables
load_dotenv()

app = FastAPI(
    title="PM Internship Scheme - Smart Allocation API",
    description="AI-Based Smart Allocation Engine for PM Internship Scheme",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(items.router, prefix="/api/items", tags=["items"])
app.include_router(students.router, prefix="/api/students", tags=["students"])
app.include_router(internships.router, prefix="/api/internships", tags=["internships"])
app.include_router(applications.router, prefix="/api/applications", tags=["applications"])

@app.on_event("startup")
async def startup_db_client():
    """Initialize database connection on startup"""
    await db.connect_to_database()
    print("Connected to MongoDB!")
    print("🇮🇳 PM Internship Scheme - Smart Allocation Engine is running!")

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection on shutdown"""
    await db.close_database_connection()
    print("Disconnected from MongoDB!")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "🇮🇳 Welcome to PM Internship Scheme - AI-Based Smart Allocation Engine",
        "description": "Intelligent matching system for students and internship opportunities",
        "docs": "/docs",
        "redoc": "/redoc",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "PM Internship Allocation Engine"
    }
