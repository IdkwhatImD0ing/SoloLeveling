import firebase_admin
from firebase_admin import credentials
from dotenv import load_dotenv

load_dotenv()

cred = credentials.Certificate("./firebase.json")
firebase_admin.initialize_app(cred)

from fastapi import FastAPI, HTTPException, Path
from pydantic import BaseModel, EmailStr
from user import create_initial_user, update_user_stat
from quests import get_or_create_daily_quest

app = FastAPI()


class User(BaseModel):
    email: EmailStr
    name: str
    class_type: str = None


class StatUpdate(BaseModel):
    stat_name: str
    new_level: int


@app.post("/create_user/")
async def create_user(user: User):
    try:
        create_initial_user(
            user.email, user.name, user.class_type
        )  # Use the helper function
        return {"message": "User created successfully", "email": user.email}
    except ValueError as e:
        # Handle the ValueError raised if the user already exists
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Handle any other exceptions
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.put("/update_stat/{user_email}")
async def update_stat(user_email: EmailStr, stat_update: StatUpdate):
    try:
        update_user_stat(user_email, stat_update.stat_name, stat_update.new_level)
        return {"message": "Stat updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.get("/get_daily_quest/{user_email}")
async def get_daily_quest(user_email: EmailStr = Path(..., example="user@example.com")):
    try:
        daily_quest = get_or_create_daily_quest(user_email)
        return {"daily_quest": daily_quest}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
