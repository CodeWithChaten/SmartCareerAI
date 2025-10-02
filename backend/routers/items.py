from fastapi import APIRouter, HTTPException, status
from typing import List
from datetime import datetime
from bson import ObjectId

from database import db
from models import ItemCreate, ItemUpdate, ItemResponse

router = APIRouter()

def item_helper(item) -> dict:
    """Helper function to format item document"""
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "description": item.get("description"),
        "quantity": item.get("quantity", 0),
        "price": item.get("price", 0.0),
        "created_at": item.get("created_at"),
        "updated_at": item.get("updated_at")
    }

@router.post("/", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemCreate):
    """Create a new item"""
    collection = db.get_collection("items")
    
    item_dict = item.model_dump()
    item_dict["created_at"] = datetime.utcnow()
    item_dict["updated_at"] = datetime.utcnow()
    
    result = await collection.insert_one(item_dict)
    created_item = await collection.find_one({"_id": result.inserted_id})
    
    return item_helper(created_item)

@router.get("/", response_model=List[ItemResponse])
async def get_all_items():
    """Get all items"""
    collection = db.get_collection("items")
    items = []
    
    async for item in collection.find():
        items.append(item_helper(item))
    
    return items

@router.get("/{item_id}", response_model=ItemResponse)
async def get_item(item_id: str):
    """Get a specific item by ID"""
    if not ObjectId.is_valid(item_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid item ID format"
        )
    
    collection = db.get_collection("items")
    item = await collection.find_one({"_id": ObjectId(item_id)})
    
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found"
        )
    
    return item_helper(item)

@router.put("/{item_id}", response_model=ItemResponse)
async def update_item(item_id: str, item_update: ItemUpdate):
    """Update an item"""
    if not ObjectId.is_valid(item_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid item ID format"
        )
    
    collection = db.get_collection("items")
    
    # Get existing item
    existing_item = await collection.find_one({"_id": ObjectId(item_id)})
    if not existing_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found"
        )
    
    # Update only provided fields
    update_data = {k: v for k, v in item_update.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await collection.update_one(
        {"_id": ObjectId(item_id)},
        {"$set": update_data}
    )
    
    updated_item = await collection.find_one({"_id": ObjectId(item_id)})
    return item_helper(updated_item)

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: str):
    """Delete an item"""
    if not ObjectId.is_valid(item_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid item ID format"
        )
    
    collection = db.get_collection("items")
    result = await collection.delete_one({"_id": ObjectId(item_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with ID {item_id} not found"
        )
    
    return None
