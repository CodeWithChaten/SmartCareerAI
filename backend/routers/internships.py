from fastapi import APIRouter, HTTPException, status, Query
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from database import db
from models import (
    InternshipCreate, 
    InternshipUpdate, 
    InternshipResponse,
    InternshipStatus
)

router = APIRouter()

def internship_helper(internship) -> dict:
    """Helper function to format internship document"""
    return {
        "id": str(internship["_id"]),
        "title": internship["title"],
        "description": internship["description"],
        "organization_id": internship["organization_id"],
        "organization_name": internship["organization_name"],
        "location": internship["location"],
        "duration_months": internship["duration_months"],
        "stipend": internship.get("stipend"),
        "required_skills": internship.get("required_skills", []),
        "preferred_skills": internship.get("preferred_skills", []),
        "eligibility_criteria": internship["eligibility_criteria"],
        "vacancies": internship["vacancies"],
        "application_deadline": internship["application_deadline"],
        "status": internship.get("status", "active"),
        "applications_count": internship.get("applications_count", 0),
        "created_at": internship.get("created_at"),
        "updated_at": internship.get("updated_at")
    }

@router.post("/", response_model=InternshipResponse, status_code=status.HTTP_201_CREATED)
async def create_internship(internship: InternshipCreate):
    """Create a new internship posting"""
    collection = db.get_collection("internships")
    
    internship_dict = internship.model_dump()
    internship_dict["created_at"] = datetime.utcnow()
    internship_dict["updated_at"] = datetime.utcnow()
    internship_dict["applications_count"] = 0
    
    result = await collection.insert_one(internship_dict)
    created_internship = await collection.find_one({"_id": result.inserted_id})
    
    return internship_helper(created_internship)

@router.get("/", response_model=List[InternshipResponse])
async def get_all_internships(
    status_filter: Optional[InternshipStatus] = Query(None),
    organization_id: Optional[str] = Query(None),
    limit: int = Query(50, ge=1, le=100)
):
    """Get all internships with optional filters"""
    collection = db.get_collection("internships")
    
    query = {}
    if status_filter:
        query["status"] = status_filter
    if organization_id:
        query["organization_id"] = organization_id
    
    internships = []
    async for internship in collection.find(query).limit(limit):
        internships.append(internship_helper(internship))
    
    return internships

@router.get("/{internship_id}", response_model=InternshipResponse)
async def get_internship(internship_id: str):
    """Get a specific internship by ID"""
    if not ObjectId.is_valid(internship_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid internship ID format"
        )
    
    collection = db.get_collection("internships")
    internship = await collection.find_one({"_id": ObjectId(internship_id)})
    
    if not internship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Internship with ID {internship_id} not found"
        )
    
    return internship_helper(internship)

@router.put("/{internship_id}", response_model=InternshipResponse)
async def update_internship(internship_id: str, internship_update: InternshipUpdate):
    """Update an internship"""
    if not ObjectId.is_valid(internship_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid internship ID format"
        )
    
    collection = db.get_collection("internships")
    
    existing_internship = await collection.find_one({"_id": ObjectId(internship_id)})
    if not existing_internship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Internship with ID {internship_id} not found"
        )
    
    update_data = {k: v for k, v in internship_update.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await collection.update_one(
        {"_id": ObjectId(internship_id)},
        {"$set": update_data}
    )
    
    updated_internship = await collection.find_one({"_id": ObjectId(internship_id)})
    return internship_helper(updated_internship)

@router.delete("/{internship_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_internship(internship_id: str):
    """Delete an internship"""
    if not ObjectId.is_valid(internship_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid internship ID format"
        )
    
    collection = db.get_collection("internships")
    result = await collection.delete_one({"_id": ObjectId(internship_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Internship with ID {internship_id} not found"
        )
    
    return None

@router.get("/search/skills")
async def search_by_skills(skills: List[str] = Query(...)):
    """Search internships by required skills"""
    collection = db.get_collection("internships")
    
    internships = []
    async for internship in collection.find({
        "required_skills": {"$in": skills},
        "status": "active"
    }):
        internships.append(internship_helper(internship))
    
    return internships
