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
from vision import convert_image_to_b64, get_landmarks, get_exercise_label

app = FastAPI()
sio = socketio_mount(app)

import tensorflow as tf
model = tf.keras.models.load_model("best_model_grid_search.h5")

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
async def create_user(sid, user):
    try:
        create_initial_user(
            user.email, user.name, user.class_type
        )  # Use the helper function
        await sio.emit('success', {'detail': f"User created successfully"}, to=sid)
    except ValueError as e:
        # Handle the ValueError raised if the user already exists
        await sio.emit('error_occurred', {'detail': f"An error occurred: {str(e)}"}, to=sid)
    except Exception as e:
        # Handle any other exceptions
        await sio.emit('error_occurred', {'detail': f"An error occurred: {str(e)}"}, to=sid)


@sio.on("update_stat")
async def update_stat(sid, message):
    try:
        user_email = message.get("user_email")
        stat_update = message.get("stat_update")
        update_user_stat(user_email, stat_update.stat_name, stat_update.new_level)
        await sio.emit('success', {'detail': f"Stat updated successfully"}, to=sid)
    except Exception as e:
        await sio.emit('error_occurred', {'detail': f"An error occurred: {str(e)}"}, to=sid)


@sio.on("get_daily_quest")
async def get_daily_quest(sid, user_email):
    try:
        daily_quest = get_or_create_daily_quest(user_email)
        return {"daily_quest": daily_quest}
    except Exception as e:
        await sio.emit('error_occurred', {'detail': f"An error occurred: {str(e)}"}, to=sid)


@sio.on("generate_normal_quest")
async def generate_normal_quest(sid, message):
    try:
        user_email = message.get("user_email")
        selected_muscle_group = message.get("selected_muscle_group")
        print(user_email)
        print(selected_muscle_group)
        normal_quest = generate_normal_fitness_quest(user_email, selected_muscle_group)
        return {"normal_quest": normal_quest}
    except ValueError as e:
        await sio.emit('error_occurred', {'detail': f"An error occurred: {str(e)}"}, to=sid)
    except Exception as e:
        await sio.emit('error_occurred', {'detail': f"An error occurred: {str(e)}"}, to=sid)


@sio.on("update_quest")
async def update_quest(sid, message):
    try:
        user_email = message.get("user_email")
        quest_id = message.get("quest_id")
        exercise_name = message.get("exercise_name")
        reps = message.get("reps")
        # print(exercise_name)
        progress_reps = update_quest_exercise(user_email, quest_id, exercise_name.strip(), reps)
        await sio.emit('success', {'detail': f"Exercise {exercise_name} updated successfully to {progress_reps}"}, to=sid)
    except Exception as e:
        await sio.emit('error_occurred', {'detail': f"An error occurred: {str(e)}"}, to=sid)
    
@sio.on("delete_quest")
async def delete_quest(sid, message):
    try:
        user_email = message.get("user_email")
        quest_id = message.get("quest_id")
        delete_quest_document(user_email, quest_id)
        await sio.emit('success', {'detail': f"Quest {quest_id} deleted successfully"}, to=sid)
    except Exception as e:
        await sio.emit('error_occurred', {'detail': f"An error occurred: {str(e)}"}, to=sid)
    
@sio.on('disconnect')
async def disconnect(sid):
    print('Client disconnected', sid)


@sio.on('receive_image')
async def receive_image(sid, message):
    
    # Get data from JSON
    user_email = message.get("user_email")
    b64_str = message.get("image")
    
    # Convert base64 to image
    image, image_rgb = convert_image_to_b64(b64_str)
    
    landmarks = get_landmarks(image, image_rgb)
    
    label = get_exercise_label(model, landmarks)
    
    print(label)   

    await sio.emit('label', label, to=sid)


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)