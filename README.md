# Questify

## Overview
Transform exercise from a chore into an adventure! Featuring an AR app with real-time posture tracking for your workouts, and gamified quests for health gains!

## Contributors:
1.  [Bill Zhang](mailto:billzhangsc@gmail.com)
2.  [Jay Wu](mailto:jayqwu@gmail.com)
3.  [Ibrakhim Ustelvay](mailto:randizzys@gmail.com)
4.  [Hebe Huang](mailto:hebe383h@gmail.com)

## Table of Contents
  - [Overview](#overview)
  - [Contributors:](#contributors)
  - [Table of Contents](#table-of-contents)
  - [Inspiration](#inspiration)
  - [Goals](#goals)
  - [Built With](#built-with)
  - [Challenges](#challenges)
  - [Accomplishments](#accomplishments)
  - [How to run](#how-to-run)

## Inspiration
The app addresses a critical health problem: the sedentary lifestyle epidemic. With increasing numbers of people engaged in desk jobs and spending leisure time in front of screens, physical inactivity has become a pressing concern, linked to a host of chronic diseases such as obesity, diabetes, and heart disease.

Furthermore, for many, traditional exercise routines can be monotonous and uninspiring, leading to a lack of long-term commitment to fitness goals. The initial enthusiasm for getting fit often wanes without a compelling, engaging incentive to continue.

Additionally, incorrect exercise form is a widespread issue, often due to a lack of guidance when working out alone. This can result in ineffective workouts or, worse, injury.

Our AR app offers a multifaceted solution:

**Gamification**: By turning exercise into a series of quests, the app injects fun and a sense of progression into the fitness journey, making the user eager to 'play' again.

**Accountability**: The quest system encourages regular activity, helping users build and maintain a consistent exercise habit.

**Education**: Through AR, the app provides real-time feedback on the user's form, ensuring exercises are performed correctly for maximum effectiveness and safety.

**Accessibility**: As a web app, it's readily available without the need for specialized equipment or gym memberships, making it easier for users to start and stick with their fitness routines.

**Community**: Users can share their progress and achievements, fostering a sense of community and shared purpose, which is known to be a powerful motivator in maintaining a fitness regimen.

Our app leverages technology to make fitness more enjoyable, habitual, and safe, addressing the root causes of sedentary behavior.

## Goals
**Enhance Engagement**: Transform workouts into an engaging experience with gamification to combat sedentary lifestyles.

**Ensure Correct Form**: Use AR for real-time posture feedback, promoting safe and effective exercise.

**Encourage Habit Formation**: Motivate consistent exercise through a rewarding quest system.

**Improve Accessibility**: Provide a no-equipment-needed platform to facilitate fitness anywhere, anytime.

**Cultivate Community**: Foster a supportive network for shared motivation and accountability.

**Innovate with AR**: Leverage the latest AR technology for an immersive fitness journey.

**Educate and Empower**: Offer knowledge on exercise benefits and techniques, empowering users towards a healthier life.

## Built With

## Challenges
Unity Learning Curve: We dedicated over 10 hours to mastering Unity, enabling us to craft a mixed reality experience on the Oculus Quest. This effort was pivotal in bringing to life a user dashboard that showcases progress mid-workout, enhancing the immersive aspect of our app.

Posture Database Creation: The scarcity of accessible databases for ideal exercise postures presented a significant hurdle. This led us to take the initiative to build our own robust machine learning model, which we meticulously trained with over 500 unique data points to ensure precise posture recognition.

Real-time Data Syncing with Firebase: Achieving seamless real-time data transmission from Firebase proved to be complex. We navigated through these complexities to enable a live feed of workout data, ensuring that every rep and set is logged and analyzed without delay.

Integrating Backend AI with Frontend Capture: Bridging the gap between our backend machine learning model and the front-end video capture posed a technical challenge. We managed to integrate these components effectively, allowing for real-time posture correction and feedback directly through the user's camera.

## Accomplishments
We successfully dedicated over 10 hours to learning Unity, enabling the creation of an immersive mixed reality experience on the Oculus Quest to visualize user progress in real-time. Additionally, we overcame the lack of available posture databases by developing and training a bespoke machine learning model with more than 500 data points, ensuring accurate and reliable posture tracking. We also tackled and resolved the complexities of syncing real-time data with Firebase, achieving instantaneous logging and analysis of workout sessions. Seamlessly connected our sophisticated backend AI with the frontend camera feed, allowing for immediate posture correction and feedback during exercises.

## How to run
1. Clone the repository
2. Install dependencies
   1. `cd client`
   2. `npm install`
3. Run Project
   1. `npm run dev`


