from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from firebase_admin import firestore

app = FastAPI()

db = firestore.client()

class User(BaseModel):
    email: EmailStr
    name: str

@app.post("/create_user/")
async def create_user(user: User):
    user_ref = db.collection("users").document(user.email)
    doc = user_ref.get()
    if doc.exists:
        # If the user already exists, return an error
        raise HTTPException(status_code=400, detail="User already exists.")
    else:
        # Initialize user data with stats embedded
        user_data = {
            "name": user.name,
            "level": 1,
            "experience": 0,
            "experience_to_level_up": 100,
            "stamina": 100,
            "stats": {
                "arms": 5,
                "chest": 5,
                "core": 5,
                "back": 5,
                "thigh": 5,
                "calves": 5
            }
        }
        try:
            # Set the user document with the initial user data, including embedded stats
            user_ref.set(user_data)
            return {"message": "User created successfully", "email": user.email}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
