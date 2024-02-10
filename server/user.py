from firebase_admin import firestore

# Firestore DB instance
db = firestore.client()


def create_initial_user(user_email: str, user_name: str, user_class: str):
    user_ref = db.collection("users").document(user_email)
    doc = user_ref.get()
    if doc.exists:
        raise ValueError("User already exists.")
    else:
        # Initialize user data without embedded stats
        user_data = {
            "name": user_name,
            "class": user_class,
            "level": 1,
            "experience": 0,
            "experience_to_level_up": 100,
            "stamina": 100,
        }
        user_ref.set(user_data)

        # Initialize individual stats in a 'stats' subcollection
        stats = ["arms", "chest", "core", "back", "thigh", "calves"]
        stats_ref = user_ref.collection("stats")
        for stat in stats:
            stats_ref.document(stat).set({"level": 5})


def update_user_stat(user_email: str, stat_name: str, new_level: int):
    stat_ref = (
        db.collection("users")
        .document(user_email)
        .collection("stats")
        .document(stat_name)
    )
    stat_ref.update({"level": new_level})
