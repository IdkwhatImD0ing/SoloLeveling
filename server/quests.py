from firebase_admin import firestore
import random
from datetime import date
from openai import OpenAI
import json
import uuid

client = OpenAI()

db = firestore.client()

exercise_pool = {
    "Arms": [
        "Bicep Curls",
        "Tricep Dips",
        "Push-Ups",
        "Hammer Curls",
        "Tricep Kickbacks",
    ],
    "Chest": [
        "Chair Dips",
        "Incline Push-Ups",
        "Standard Push-Ups",
        "Decline Push-Ups",
        "Wide Grip Push-Ups",
    ],
    "Core": ["Plank", "Russian Twists", "Sit-Ups", "Leg Raises", "Bicycle Crunches"],
    "Back": [
        "Superman Lifts",
        "Bird Dogs",
        "Reverse Snow Angels",
        "Dumbbell Rows",
        "Pull-Ups",
    ],
    "Thigh": ["Squats", "Lunges", "Sumo Squats", "Side Lunges", "Glute Bridges"],
    "Calves": [
        "Calf Raises",
        "Jumping Jacks",
        "High Knees",
        "Box Jumps",
        "Seated Calf Raises",
    ],
}

# Updated targets with pure numbers
exercise_targets = {
    "Bicep Curls": 15,
    "Tricep Dips": 12,
    "Push-Ups": 10,
    "Hammer Curls": 12,
    "Tricep Kickbacks": 15,
    "Chair Dips": 10,
    "Incline Push-Ups": 12,
    "Standard Push-Ups": 10,
    "Decline Push-Ups": 15,
    "Wide Grip Push-Ups": 12,
    "Plank": 30,
    "Russian Twists": 20,
    "Sit-Ups": 15,
    "Leg Raises": 20,
    "Bicycle Crunches": 30,
    "Superman Lifts": 10,
    "Bird Dogs": 12,
    "Reverse Snow Angels": 15,
    "Dumbbell Rows": 12,
    "Pull-Ups": 10,
    "Squats": 10,
    "Lunges": 12,
    "Sumo Squats": 15,
    "Side Lunges": 12,
    "Glute Bridges": 15,
    "Calf Raises": 20,
    "Jumping Jacks": 15,
    "High Knees": 20,
    "Box Jumps": 15,
    "Seated Calf Raises": 20,
}


def generate_daily_fitness_challenge(class_type):
    today_str = date.today().isoformat()

    # Randomly select a muscle group and then an exercise within that group
    muscle_group = random.choice(list(exercise_pool.keys()))
    exercise = random.choice(exercise_pool[muscle_group])

    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": """You are the game master for a live-action RPG.
Backstory: The hero is a god summoned warrior to defend the land against an evil necromancer, but is currently too weak.
You'll receive an exercise and must create a quest name and description for a daily exercise challenge.
Provide a backstory for the quest, but since it is a daily quest, it should be mundane.
The user already knows the user's backstory, so no need to repeat it in the description.
The output should be in JSON format, like so:\n\n{\quest_name: quest_name,\ndescription: quest_description,\n}""",
            },
            {
                "role": "user",
                "content": f"User Class Type {class_type}, Exercise: {exercise}",
            },
        ],
        temperature=0.7,
        max_tokens=1024,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    quest = json.loads(response.choices[0].message.content)

    # Construct the points object for all muscle groups initialized to 0
    points = {mg: 0 for mg in exercise_pool}
    points[muscle_group] = 40  # Assign 40 points to the selected muscle group

    # Construct the challenge object
    daily_challenge = {
        "date": today_str,
        "quest_name": quest["quest_name"],
        "description": quest["description"],
        "exercise": exercise,
        "muscle_group": muscle_group,
        "points": points,
        "XP Reward": 100,
        "Other Reward": f"{muscle_group} Daily Challenge Badge",
    }

    return daily_challenge


def get_or_create_daily_quest(user_email: str):
    user_ref = db.collection("users").document(user_email)

    # Get class type
    user_doc = user_ref.get()
    user_data = user_doc.to_dict()
    class_type = user_data.get("class")

    quests_ref = user_ref.collection("quests")
    today_str = date.today().isoformat()

    daily_quest_ref = quests_ref.document("daily_quest")
    daily_quest_doc = daily_quest_ref.get()

    if daily_quest_doc.exists:
        quest_data = daily_quest_doc.to_dict()
        if quest_data.get("date") == today_str:
            return quest_data  # Return today's quest if it exists
        else:
            new_quest = generate_daily_fitness_challenge(class_type)
            daily_quest_ref.set(new_quest)
            return new_quest
    else:
        new_quest = generate_daily_fitness_challenge(class_type)
        daily_quest_ref.set(new_quest)
        return new_quest


def generate_normal_fitness_quest(user_email: str, selected_muscle_group: str):
    if selected_muscle_group not in exercise_pool:
        raise ValueError("Selected muscle group is not valid.")

    user_ref = db.collection("users").document(user_email)

    # Get class type
    user_doc = user_ref.get()
    user_data = user_doc.to_dict()
    class_type = user_data.get("class")

    today_str = date.today().isoformat()
    exercise = random.choice(exercise_pool[selected_muscle_group])

    # Generate quest name and description through GPT-3
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": """You are the game master for a live-action RPG.
Backstory: The hero is a god summoned warrior to defend the land against an evil necromancer, but is currently too weak.
You\'ll receive an exercise and must create a quest name and description for a normal quest based on the selected muscle group.
Provide a backstory for the quest, but since it is a normal quest, it should represent a small challenge.
The user already knows the backstory, so no need to repeat it in the description.
The output should be in JSON format, like so:\n\n{\n"quest_name": "[quest_name]",\n"description": "[quest_description]"\n}""",
            },
            {
                "role": "user",
                "content": f"User Class Type: {class_type}, Exercise: {exercise}",
            },
        ],
        temperature=0.7,
        max_tokens=1024,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
    )

    # Parse the GPT-3 response
    quest = json.loads(response.choices[0].message.content)

    # Points object, assuming 40 points for targeted muscle group exercise
    points = {mg: 0 for mg in exercise_pool}  # Initialize all to 0
    points[selected_muscle_group] = 100

    # Construct the challenge object
    normal_challenge = {
        "date": today_str,
        "quest_name": quest["quest_name"],
        "description": quest["description"],
        "exercise": exercise,
        "muscle_group": selected_muscle_group,
        "points": points,
        "XP Reward": 100,
        "Other Reward": f"{selected_muscle_group} Master Badge",
    }

    # Store the quest in Firestore under the user's "quests" collection
    user_ref = db.collection("users").document(user_email)
    quests_ref = user_ref.collection("quests")
    uuid_string = str(uuid.uuid4())
    quest_id = f"normal_quest_{uuid_string}"
    quests_ref.document(quest_id).set(normal_challenge)

    return normal_challenge
