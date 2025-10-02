from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os

class Database:
    client: Optional[AsyncIOMotorClient] = None
    database = None

    async def connect_to_database(self):
        """Create database connection"""
        mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        database_name = os.getenv("DATABASE_NAME", "sih25033")
        
        self.client = AsyncIOMotorClient(mongodb_url)
        self.database = self.client[database_name]
        
        # Test the connection
        await self.client.admin.command('ping')
        print(f"Connected to MongoDB database: {database_name}")

    async def close_database_connection(self):
        """Close database connection"""
        if self.client:
            self.client.close()
            print("Closed MongoDB connection")

    def get_collection(self, collection_name: str):
        """Get a collection from the database"""
        if self.database is None:
            raise Exception("Database not initialized")
        return self.database[collection_name]

db = Database()
