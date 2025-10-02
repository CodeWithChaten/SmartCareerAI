from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

# ============= ENUMS =============
class UserRole(str, Enum):
    STUDENT = "student"
    ORGANIZATION = "organization"
    ADMIN = "admin"

class ApplicationStatus(str, Enum):
    APPLIED = "applied"
    UNDER_REVIEW = "under_review"
    SHORTLISTED = "shortlisted"
    REJECTED = "rejected"
    ACCEPTED = "accepted"

class InternshipStatus(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    CLOSED = "closed"
    FILLED = "filled"

# ============= USER MODELS =============
class UserBase(BaseModel):
    """Base model for User"""
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=100)
    role: UserRole

class UserCreate(UserBase):
    """Model for creating a user"""
    password: str = Field(..., min_length=6)

class UserResponse(UserBase):
    """Model for user response"""
    id: str
    created_at: datetime
    
    class Config:
        populate_by_name = True

# ============= STUDENT PROFILE MODELS =============
class StudentProfile(BaseModel):
    """Student profile with skills and preferences"""
    user_id: str
    education: str = Field(..., min_length=1)
    institution: str
    graduation_year: int
    skills: List[str] = Field(default_factory=list)
    interests: List[str] = Field(default_factory=list)
    cgpa: Optional[float] = Field(None, ge=0.0, le=10.0)
    resume_url: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    preferred_locations: List[str] = Field(default_factory=list)
    preferred_domains: List[str] = Field(default_factory=list)

class StudentProfileResponse(StudentProfile):
    """Student profile response"""
    id: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        populate_by_name = True

# ============= INTERNSHIP MODELS =============
class InternshipBase(BaseModel):
    """Base model for Internship"""
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=10)
    organization_id: str
    organization_name: str
    location: str
    duration_months: int = Field(..., ge=1, le=12)
    stipend: Optional[float] = Field(None, ge=0)
    required_skills: List[str] = Field(default_factory=list)
    preferred_skills: List[str] = Field(default_factory=list)
    eligibility_criteria: str
    vacancies: int = Field(..., ge=1)
    application_deadline: datetime
    status: InternshipStatus = InternshipStatus.ACTIVE

class InternshipCreate(InternshipBase):
    """Model for creating an internship"""
    pass

class InternshipUpdate(BaseModel):
    """Model for updating an internship"""
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    duration_months: Optional[int] = None
    stipend: Optional[float] = None
    required_skills: Optional[List[str]] = None
    preferred_skills: Optional[List[str]] = None
    eligibility_criteria: Optional[str] = None
    vacancies: Optional[int] = None
    application_deadline: Optional[datetime] = None
    status: Optional[InternshipStatus] = None

class InternshipResponse(InternshipBase):
    """Model for internship response"""
    id: str
    applications_count: int = 0
    created_at: datetime
    updated_at: datetime
    
    class Config:
        populate_by_name = True

# ============= APPLICATION MODELS =============
class ApplicationBase(BaseModel):
    """Base model for Application"""
    student_id: str
    internship_id: str
    cover_letter: Optional[str] = None
    
class ApplicationCreate(ApplicationBase):
    """Model for creating an application"""
    pass

class ApplicationResponse(ApplicationBase):
    """Model for application response"""
    id: str
    status: ApplicationStatus = ApplicationStatus.APPLIED
    match_score: Optional[float] = None
    applied_at: datetime
    updated_at: datetime
    student_name: Optional[str] = None
    internship_title: Optional[str] = None
    organization_name: Optional[str] = None
    
    class Config:
        populate_by_name = True

# ============= MATCHING MODELS =============
class MatchResult(BaseModel):
    """AI Matching result"""
    internship_id: str
    internship_title: str
    organization_name: str
    match_score: float = Field(..., ge=0.0, le=100.0)
    matching_skills: List[str]
    location: str
    stipend: Optional[float]
    duration_months: int

class MatchRequest(BaseModel):
    """Request for AI matching"""
    student_id: str
    limit: int = Field(default=10, ge=1, le=50)
