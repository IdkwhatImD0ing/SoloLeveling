import firebase_admin
from firebase_admin import credentials, db
from dotenv import load_dotenv
from fastapi import FastAPI
import asyncio
from socket_wrapper import socketio_mount  # Ensure this is correctly implemented


load_dotenv()

cred = credentials.Certificate("./firebase.json")
firebase_admin.initialize_app(cred)

from fastapi import FastAPI, HTTPException, Path
from pydantic import BaseModel, EmailStr
from user import create_initial_user, update_user_stat
from quests import get_or_create_daily_quest, generate_normal_fitness_quest, update_quest_exercise, delete_quest_document

app = FastAPI()
sio = socketio_mount(app)

@app.route('/')
def index():
    return "landmark position"

@sio.on('connect')
async def connect(sid, environ):
    print("Client connected", sid)

class User(BaseModel):
    email: EmailStr
    name: str
    class_type: str


class StatUpdate(BaseModel):
    stat_name: str
    new_level: int



@sio.on("create_user")
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


@sio.on("update_stat")
async def update_stat(user_email: EmailStr, stat_update: StatUpdate):
    try:
        update_user_stat(user_email, stat_update.stat_name, stat_update.new_level)
        return {"message": "Stat updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@sio.on("get_daily_quest")
async def get_daily_quest(user_email: EmailStr = Path(..., example="user@example.com")):
    try:
        daily_quest = get_or_create_daily_quest(user_email)
        return {"daily_quest": daily_quest}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@sio.on("generate_normal_quest")
async def generate_normal_quest(user_email: str, selected_muscle_group: str):
    try:
        normal_quest = generate_normal_fitness_quest(user_email, selected_muscle_group)
        return {"normal_quest": normal_quest}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@sio.on("update_quest")
async def update_quest(user_email: EmailStr, quest_id: str, exercise_name: str, reps: str = None):
    try:
        print(exercise_name)
        progress_reps = update_quest_exercise(user_email, quest_id, exercise_name.strip(), reps)
        return {"message": f"Exercise {exercise_name} updated successfully to {progress_reps}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@sio.on("delete_quest")
async def delete_quest(user_email: EmailStr, quest_id: str):
    try:
        delete_quest_document(user_email, quest_id)
        return {"message": f"Quest {quest_id} deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


    
@sio.on('disconnect')
async def disconnect(sid):
    print('Client disconnected', sid)


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)