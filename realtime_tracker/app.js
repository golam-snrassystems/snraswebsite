// const express = require("express");
// const path = require("path");
// const http = require("http");
// const socketio = require("socket.io");
// const mqtt = require("mqtt");
// const cors = require("cors"); // Import the cors package
// const { db, ref, set, get } = require("./firebase"); // Import Firebase Realtime DB

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);

// // Enable CORS for all routes
// app.use(cors());

// // Store the latest coordinates
// // let latestCoordinates = { latitude: null, longitude: null };

// let latestCoordinates = { latitude: null, longitude: null, lastSeen: null, offline: false };
// let lastKnownLocation = { latitude: null, longitude: null, lastSeen: null };

// // Connect to MQTT broker
// const mqttClient = mqtt.connect('mqtt://34.100.201.70:8883', {
//     username: 'snras_client_un',
//     password: 'SnraS_ProJ',
//     clientId: Math.random().toString(16) // Generates a random string
// });

// mqttClient.on('connect', function () {
//     console.log("Connected to MQTT broker");

//     // Subscribe to the topic
//     mqttClient.subscribe('water_quality/Y041653632892487/masterPublish', function (err) {
//         if (err) {
//             console.error("Error subscribing to topic:", err.message);
//         } else {
//             console.log("Subscribed to topic successfully");
//         }
//     });


// });

// mqttClient.on('message', async function (topic, message) {
//     console.log(`Message received on topic ${topic}: ${message.toString()}`);

//     // Parse the JSON message
//     try {
//         const data = JSON.parse(message.toString());
//         const latitude = data.LATITUDE;
//         const longitude = data.LONGITUDE;

//         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//         // Update the latest coordinates
//         // latestCoordinates = { latitude, longitude };

//         // // Emit/send the latitude and longitude to all connected/sends clients/frontend
//         // io.emit("locationUpdate", { latitude, longitude });
//         const currentTime = new Date().toISOString();
//         latestCoordinates = { latitude, longitude, lastSeen: currentTime, offline: false };
       
//         // Check if latitude and longitude are valid means it has not empty or null values
//         if (latitude && longitude) {
//         lastKnownLocation = { latitude, longitude, lastSeen: currentTime };
//         }

//          // Save to Firebase Realtime Database
//          await set(ref(db, "location/device87/latestCoordinates"), latestCoordinates)
//          await set(ref(db, "location/device87/lastKnownLocation"), lastKnownLocation)
//          .then(() => console.log("latestCoordinates and lastKnownLocation updated in Firebase"))
//          .catch((error) => console.error("Error saving location:", error));




//         io.emit("locationUpdate", latestCoordinates);

//     } catch (error) {
//         console.error("Error parsing MQTT message:", error.message);
//     }
// });

// // API endpoint to get the latest coordinates
// // app.get("/api/coordinates", (req, res) => {
// //     res.json(latestCoordinates);
// // });
// // API to check if the device is online

// /////////////////////////////////////////////////////////////////////////////////
// // ** Check if the device is offline (No MQTT message in last 60s) **
// // setInterval(() => {
// //     if (latestCoordinates.lastSeen) {
// //         const lastSeenTime = new Date(latestCoordinates.lastSeen);
// //         const timeElapsed = (new Date() - lastSeenTime) / 1000;

// //         if (timeElapsed > 60) {
// //             latestCoordinates.offline = true;
// //         }
// //     }
// // }, 10000); // Check every 10 seconds


// // // API - Latest Coordinates
// // app.get("/api/coordinates", (req, res) => {
// //     res.json(latestCoordinates);
// // });

// // // API - Last Known Location
// // app.get("/api/last-known-location", (req, res) => {
// //     if (lastKnownLocation.latitude && lastKnownLocation.longitude) {
// //         res.json(lastKnownLocation);
// //     } else {
// //         res.json({}); 
// //     }
// // });

// //firebase
// // Check if the device is offline (No MQTT message in last 10 seconds)
// setInterval(() => {
//     if (latestCoordinates.lastSeen) {
//         const lastSeenTime = new Date(latestCoordinates.lastSeen);
//         const timeElapsed = (new Date() - lastSeenTime) / 1000;

//         if (timeElapsed > 4) { // Set to 4 seconds for quicker feedback
//             latestCoordinates.offline = true;
//             // Update Firebase with offline status
//             set(ref(db, "location/device87/latestCoordinates"), latestCoordinates);
//         } else {
//             latestCoordinates.offline = false; // Device is online
//         }
//     }
// }, 4000); // Check every 4 seconds
// app.get("/api/coordinates", async (req, res) => {
//     try {
//         const snapshot = await get(ref(db, "location/device87/latestCoordinates"));
//         if (snapshot.exists()) {
//             res.json(snapshot.val());
//         } else {
//             res.status(404).json({ error: "No latest coordinates found." });
//         }
//     } catch (error) {
//         console.error("Error fetching latest coordinates:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // API to get the last known location
// app.get("/api/last-known-location", async (req, res) => {
//     try {
//         const snapshot = await get(ref(db, "location/device87/lastKnownLocation"));
//         if (snapshot.exists()) {
//             res.json(snapshot.val());
//         } else {
//             res.status(404).json({ error: "No last known location found." });
//         }
//     } catch (error) {
//         console.error("Error fetching last known location:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });


// ///////////////////////////////////////////////////////////////////////////////

// // Start the server
// server.listen(3001, () => {
//     console.log("Server is running on http://localhost:3001");
// });