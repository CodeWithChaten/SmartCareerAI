from fastapi import APIRouter, HTTPException, status, Query
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from database import db
from models import (
    ApplicationCreate,
    ApplicationResponse,
    ApplicationStatus,
    MatchRequest,
    MatchResult
)

router = APIRouter()

def application_helper(application) -> dict:
    """Helper function to format application document"""
    return {
        "id": str(application["_id"]),
        "student_id": application["student_id"],
        "internship_id": application["internship_id"],
        "cover_letter": application.get("cover_letter"),
        "status": application.get("status", "applied"),
        "match_score": application.get("match_score"),
        "applied_at": application.get("applied_at"),
        "updated_at": application.get("updated_at"),
        "student_name": application.get("student_name"),
        "internship_title": application.get("internship_title"),
        "organization_name": application.get("organization_name")
    }

@router.post("/", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
async def create_application(application: ApplicationCreate):
    """Submit a new internship application"""
    collection = db.get_collection("applications")
    internships_collection = db.get_collection("internships")
    
    # Check if application already exists
    existing = await collection.find_one({
        "student_id": application.student_id,
        "internship_id": application.internship_id
    })
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Application already submitted for this internship"
        )
    
    # Verify internship exists
    internship = await internships_collection.find_one({"_id": ObjectId(application.internship_id)})
    if not internship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Internship not found"
        )
    
    application_dict = application.model_dump()
    application_dict["status"] = ApplicationStatus.APPLIED
    application_dict["applied_at"] = datetime.utcnow()
    application_dict["updated_at"] = datetime.utcnow()
    
    result = await collection.insert_one(application_dict)
    
    # Update internship application count
    await internships_collection.update_one(
        {"_id": ObjectId(application.internship_id)},
        {"$inc": {"applications_count": 1}}
    )
    
    created_application = await collection.find_one({"_id": result.inserted_id})
    return application_helper(created_application)

@router.get("/student/{student_id}", response_model=List[ApplicationResponse])
async def get_student_applications(student_id: str):
    """Get all applications for a student"""
    collection = db.get_collection("applications")
    applications = []
    
    async for application in collection.find({"student_id": student_id}):
        applications.append(application_helper(application))
    
    return applications

@router.get("/internship/{internship_id}", response_model=List[ApplicationResponse])
async def get_internship_applications(internship_id: str):
    """Get all applications for an internship"""
    collection = db.get_collection("applications")
    applications = []
    
    async for application in collection.find({"internship_id": internship_id}):
        applications.append(application_helper(application))
    
    return applications

@router.put("/{application_id}/status", response_model=ApplicationResponse)
async def update_application_status(application_id: str, new_status: ApplicationStatus):
    """Update application status (for organizations/admins)"""
    if not ObjectId.is_valid(application_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid application ID format"
        )
    
    collection = db.get_collection("applications")
    
    existing_application = await collection.find_one({"_id": ObjectId(application_id)})
    if not existing_application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with ID {application_id} not found"
        )
    
    await collection.update_one(
        {"_id": ObjectId(application_id)},
        {"$set": {"status": new_status, "updated_at": datetime.utcnow()}}
    )
    
    updated_application = await collection.find_one({"_id": ObjectId(application_id)})
    return application_helper(updated_application)

@router.post("/match", response_model=List[MatchResult])
async def get_ai_matches(match_request: MatchRequest):
    """Get AI-powered internship recommendations for a student"""
    # Get student profile
    profiles_collection = db.get_collection("student_profiles")
    student_profile = await profiles_collection.find_one({"user_id": match_request.student_id})
    
    if not student_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student profile not found"
        )
    
    # Get active internships
    internships_collection = db.get_collection("internships")
    matches = []
    
    student_skills = set(student_profile.get("skills", []))
    student_locations = set(student_profile.get("preferred_locations", []))
    student_domains = set(student_profile.get("preferred_domains", []))
    
    async for internship in internships_collection.find({"status": "active"}):
        # Calculate match score based on skills, location, and domain
        required_skills = set(internship.get("required_skills", []))
        preferred_skills = set(internship.get("preferred_skills", []))
        
        # Skills matching
        skills_match = len(student_skills & required_skills) / len(required_skills) if required_skills else 0
        preferred_match = len(student_skills & preferred_skills) / len(preferred_skills) if preferred_skills else 0
        
        # Location matching
        location_match = 1.0 if internship.get("location") in student_locations else 0.5
        
        # Calculate weighted score
        match_score = (
            skills_match * 50 +  # 50% weight on required skills
            preferred_match * 20 +  # 20% weight on preferred skills
            location_match * 30  # 30% weight on location
        )
        
        if match_score > 40:  # Only include matches above 40%
            matching_skills = list(student_skills & (required_skills | preferred_skills))
            matches.append(
                MatchResult(
                    internship_id=str(internship["_id"]),
                    internship_title=internship["title"],
                    organization_name=internship["organization_name"],
                    match_score=round(match_score, 2),
                    matching_skills=matching_skills,
                    location=internship["location"],
                    stipend=internship.get("stipend"),
                    duration_months=internship["duration_months"]
                )
            )
    
    # Sort by match score and return top matches
    matches.sort(key=lambda x: x.match_score, reverse=True)
    return matches[:match_request.limit]

@router.get("/{application_id}", response_model=ApplicationResponse)
async def get_application(application_id: str):
    """Get a specific application by ID"""
    if not ObjectId.is_valid(application_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid application ID format"
        )
    
    collection = db.get_collection("applications")
    application = await collection.find_one({"_id": ObjectId(application_id)})
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Application with ID {application_id} not found"
        )
    
    return application_helper(application)
