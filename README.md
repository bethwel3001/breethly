## Breethly - Your breathing exercise app

*Breethly* is a simple, calming breathing exercise application that I built as my first mobile development project. The app guides users through various breathing techniques with visual animations and optional ambient sounds to help with relaxation, focus, and sleep.

This project represents my journey into mobile app development using React Native and Expo. I created it to learn the fundamentals of building Android applications while making something useful that could help people manage stress and anxiety through controlled breathing.

# Features
1. Three breathing exercise presets (Box Breathing, 4-7-8 Relaxation, Simple Deep Breaths)
2. Animated visual guide that expands and contracts with your breath
3. Timer display for each breathing phase
4. Play, pause, and reset controls
5. Optional ambient sounds during sessions
6. Settings screen to customize audio preferences
7. Settings persistence using AsyncStorage
8. Screen stays awake during active sessions

# Technologies Used
- React Native
- Expo (SDK 52)
- TypeScript
- Expo Router for navigation
- Expo AV for audio playback
- React Native Safe Area Context
- AsyncStorage for local data persistence

## Prerequisites
Before building the APK, ensure you have the following installed:

~ Node.js (v20.x recommended)
~ npm or yarn
~ Expo CLI
~ Android Studio (for building APK)

# Installation
Clone the repository:

`` bash
git clone 
cd breethly
Install dependencies:
``
`` bash
npm install
Start the development server:
``
`` bash
npx expo start
Run on your device:
``

Install the Expo Go app on your Android phone
Scan the QR code displayed in the terminal
The app will load on your device

Clone the repository:

```bash
git clone https://github.com/bethwel3001/breethly
cd breethly

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

Run on your device:

1. Install the Expo Go app on your Android phone
2. Scan the QR code displayed in the terminal
3. The app will load on your device

# What I Learnt
Building this first mobile app taught me:

- React Native fundamentals and component architecture
- Navigation between screens using Expo Router
- Managing state with React hooks
- Working with device features (audio playback, keep-awake)
- Handling user preferences with AsyncStorage
- Creating smooth animations with React Native Animated
- Debugging mobile applications
- The importance of safe area handling for different device notches

# Future Improvements
- As I continue learning, I plan to add:
- Progress tracking and session history
- More breathing exercise patterns
- Customizable animation speeds
- Dark mode support
- Haptic feedback
- Guided breathing tutorials for beginners

# Acknowledgments
This project was built while learning React Native development. Special thanks to the Expo and React Native communities for their excellent documentation and tools that made this first mobile app possible.

Built with React Native + Expo

