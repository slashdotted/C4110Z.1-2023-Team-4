# Crash Detection Application - Team 4

## Our Goal
The goal for this project is to create a prototype for an application to detect crashes while skiing, if a crash is detected the app will start a timer, after a certain amount of time is elapsed it will automatically call the rescuers that are on call at the ski resort.

## Development Plan
- Use gyroscope and accelerometer for sensing
- Avoid accidental readings
- Emergency button for manual calling
- Communication with ski patrol

- Pick 3 resorts and use trail map
  - Use inspiration from Epic
  - Live map for ski patrol
  - Live tracker (GPS for long/lat + altitude)
  - Show options for resorts based on proximity

## Outside Links
- https://patents.google.com/patent/US20190103007A1/en
- https://patents.google.com/patent/US8990041B2/en
- https://patents.google.com/patent/US9588135

## Install Information
- To run our application you need to install the ExpoGo App on your mobile phone.
- You also have to install the following libraries using npm:
  - `npm install expo-sensors`
  - `npm install @react-navigation/native`
  - `npm install @react-navigation/stack`
  - `npm install @react-native-maps`
  - `npm install expo-location`
- After having downloaded the libraries you can run the application using the command:
  - `expo start` or `expo start --tunnel`
  - `npm start` or `npm start --tunnel` are also alternative ways to start
- After waiting a couple of minutes a QR Code will appear along with the debug menu
- To start the application just scan the QR Code with the ExpoGo App
- You can also write the "a" command to open an Android emulator and run the application that way 
