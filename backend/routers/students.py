from fastapi import APIRouter, HTTPException, status
from typing import List
from datetime import datetime
from bson import ObjectId

from database import db
from models import StudentProfile, StudentProfileResponse

router = APIRouter()

def profile_helper(profile) -> dict:
    """Helper function to format student profile document"""
    return {
        "id": str(profile["_id"]),
        "user_id": profile["user_id"],
        "education": profile["education"],
        "institution": profile["institution"],
        "graduation_year": profile["graduation_year"],
        "skills": profile.get("skills", []),
        "interests": profile.get("interests", []),
        "cgpa": profile.get("cgpa"),
        "resume_url": profile.get("resume_url"),
        "github_url": profile.get("github_url"),
        "linkedin_url": profile.get("linkedin_url"),
        "preferred_locations": profile.get("preferred_locations", []),
        "preferred_domains": profile.get("preferred_domains", []),
        "created_at": profile.get("created_at"),
        "updated_at": profile.get("updated_at")
    }

@router.post("/profile", response_model=StudentProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_student_profile(profile: StudentProfile):
    """Create a new student profile"""
    collection = db.get_collection("student_profiles")
    
    # Check if profile already exists for this user
    existing = await collection.find_one({"user_id": profile.user_id})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Profile already exists for this user"
        )
    
    profile_dict = profile.model_dump()
    profile_dict["created_at"] = datetime.utcnow()
    profile_dict["updated_at"] = datetime.utcnow()
    
    result = await collection.insert_one(profile_dict)
    created_profile = await collection.find_one({"_id": result.inserted_id})
    
    return profile_helper(created_profile)

@router.get("/profile/{user_id}", response_model=StudentProfileResponse)
async def get_student_profile(user_id: str):
    """Get student profile by user ID"""
    collection = db.get_collection("student_profiles")
    profile = await collection.find_one({"user_id": user_id})
    
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Profile not found for user {user_id}"
        )
    
    return profile_helper(profile)

@router.put("/profile/{user_id}", response_model=StudentProfileResponse)
async def update_student_profile(user_id: str, profile_update: StudentProfile):
    """Update student profile"""
    collection = db.get_collection("student_profiles")
    
    existing_profile = await collection.find_one({"user_id": user_id})
    if not existing_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Profile not found for user {user_id}"
        )
    
    update_data = profile_update.model_dump()
    update_data["updated_at"] = datetime.utcnow()
    
    await collection.update_one(
        {"user_id": user_id},
        {"$set": update_data}
    )
    
    updated_profile = await collection.find_one({"user_id": user_id})
    return profile_helper(updated_profile)

@router.get("/profiles", response_model=List[StudentProfileResponse])
async def get_all_student_profiles():
    """Get all student profiles (admin only)"""
    collection = db.get_collection("student_profiles")
    profiles = []
    
    async for profile in collection.find():
        profiles.append(profile_helper(profile))
    
    return profiles
