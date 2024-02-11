import cv2
import numpy as np
import base64
import mediapipe as mp

map = {0: "squat_up", 1: "squat_down", 2: 'jumping_jack_down', 3: 'jumping_jack_up', 4: 'curl_down', 5: 'curl_up', 6: 'lunge_up', 7: 'lunge_down', 8: 'high_knee_down', 9: 'high_knee_up', 10: 'push_up_up', 11: 'push_up_down', 12: 'back_row_down', 13: 'back_row_up'}


def convert_image_to_b64(b64_string):
    
    if b64_string.startswith("data:image/jpeg;base64,"):
        raw_b64_string = b64_string.replace("data:image/jpeg;base64,", "")
    else:
        # Handle case where the string is not in the expected format
        raw_b64_string = b64_string  # Or set to None, raise an error, etc.
    
    # Decode the Base64 string
    image_data = base64.b64decode(raw_b64_string)
    # Convert the bytes data to a numpy array
    nparr = np.frombuffer(image_data, np.uint8)
    # Decode image from numpy array
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    image_rgb = None
    # print("IMAGE")
    # print(image)
    if image is not None:
        # print("converted to RGB")
        #convert the image to RGB
        image_rgb =  cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    return image, image_rgb

def get_landmarks(image, image_rgb):
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose()
    landmarks = None
    # print("Image")
    # print(image)
    # Process the frame with MediaPipe Pose
    results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    if results.pose_landmarks:
        # Draw the pose annotations on the frame
        mp.solutions.drawing_utils.draw_landmarks(
            image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS
        )

        # Extract landmarks
        landmarks = (
            [landmark.x for landmark in results.pose_landmarks.landmark]
            + [landmark.y for landmark in results.pose_landmarks.landmark]
            + [landmark.z for landmark in results.pose_landmarks.landmark]
        )

        # Flatten the landmarks into a single array
        landmarks = np.array(landmarks).flatten()
        landmarks = landmarks.reshape(1, -1)
    
    return landmarks
        
        
def get_exercise_label(model, landmarks):
    
    # Make a prediction
    prediction = model(landmarks, training=False)
    
    # Convert prediction to numpy array if it's not already (for TensorFlow 2.x)
    prediction = prediction.numpy()

    # Get the index of the max confidence
    predicted_index = np.argmax(prediction)

    # Get the max confidence value
    confidence = np.max(prediction)

    # Check if the confidence is above the threshold
    if confidence > 0.5:
        # Display the class with the highest confidence
        label = map[predicted_index]
    else:
        # Display 'Unknown' if confidence is not high enough
        label = "Unknown"
        
    return label