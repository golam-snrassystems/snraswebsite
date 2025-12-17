const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const mqtt = require("mqtt");
const cors = require("cors"); // Import the cors package
const { db, ref, set, get } = require("./firebase"); // Import Firebase Realtime DB

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Enable CORS for all routes
app.use(cors());

// Store the latest coordinates
//CHANGE REQUIRED
let latestCoordinates87 = { latitude: null, longitude: null, lastSeen: null, offline: false };
let lastKnownLocation87 = { latitude: null, longitude: null, lastSeen: null };

let latestCoordinates92 = { latitude: null, longitude: null, lastSeen: null, offline: false };
let lastKnownLocation92 = { latitude: null, longitude: null, lastSeen: null };

let latestCoordinates93 = { latitude: null, longitude: null, lastSeen: null, offline: false };
let lastKnownLocation93 = { latitude: null, longitude: null, lastSeen: null };

let latestCoordinates94 = { latitude: null, longitude: null, lastSeen: null, offline: false };
let lastKnownLocation94 = { latitude: null, longitude: null, lastSeen: null };

let latestCoordinates95 = { latitude: null, longitude: null, lastSeen: null, offline: false };
let lastKnownLocation95 = { latitude: null, longitude: null, lastSeen: null };

let latestCoordinates96 = { latitude: null, longitude: null, lastSeen: null, offline: false };
let lastKnownLocation96 = { latitude: null, longitude: null, lastSeen: null };

let latestCoordinates97 = { latitude: null, longitude: null, lastSeen: null, offline: false };
let lastKnownLocation97 = { latitude: null, longitude: null, lastSeen: null };

let latestCoordinates98 = { latitude: null, longitude: null, lastSeen: null, offline: false };
let lastKnownLocation98 = { latitude: null, longitude: null, lastSeen: null };

let latestCoordinates99 = { latitude: null, longitude: null, lastSeen: null, offline: false };
let lastKnownLocation99 = { latitude: null, longitude: null, lastSeen: null };

let latestCoordinates500 = { latitude: null, longitude: null, lastSeen: null, offline: false };
let lastKnownLocation500 = { latitude: null, longitude: null, lastSeen: null };

// Connect to MQTT broker
const mqttClient = mqtt.connect('mqtt://34.100.201.70:8883', {
    username: 'snras_client_un',
    password: 'SnraS_ProJ',
    clientId: Math.random().toString(16) // Generates a random string
});

mqttClient.on('connect', function () {
    console.log("Connected to MQTT broker");

    //CHANGE REQUIRED
    // Subscribe to the topic
    mqttClient.subscribe('water_quality/Y041653632892487/masterPublish', function (err) {
        if (err) {
            console.error("Error subscribing to topic 87:", err.message);
        } else {
            console.log("Subscribed to topic successfully 87");
        }
    });

     mqttClient.subscribe('water_quality/Y041653632892492/masterPublish', function (err) {
        if (err) {
            console.error("Error subscribing to topic 92:", err.message);
        } else {
            console.log("Subscribed to topic successfully 92");
        }
    });

     mqttClient.subscribe('water_quality/Y041653632892493/masterPublish', function (err) {
        if (err) {
            console.error("Error subscribing to topic 93:", err.message);
        } else {
            console.log("Subscribed to topic successfully 93");
        }
    });

     mqttClient.subscribe('water_quality/Y041653632892494/masterPublish', function (err) {
        if (err) {
            console.error("Error subscribing to topic 94:", err.message);
        } else {
            console.log("Subscribed to topic successfully 94");
        }
    });

     mqttClient.subscribe('water_quality/Y041653632892495/masterPublish', function (err) {
        if (err) {
            console.error("Error subscribing to topic 95:", err.message);
        } else {
            console.log("Subscribed to topic successfully 95");
        }
    });


    mqttClient.subscribe('water_quality/Y041653632892496/masterPublish', function (err) {
        if (err) {
            console.error("Error subscribing to topic 96:", err.message);
        } else {
            console.log("Subscribed to topic successfully 96");
        }
    });

     mqttClient.subscribe('water_quality/Y041653632892497/masterPublish', function (err) {
        if (err) {
            console.error("Error subscribing to topic 97:", err.message);
        } else {
            console.log("Subscribed to topic successfully 97");
        }
    });

     mqttClient.subscribe('water_quality/Y041653632892498/masterPublish', function (err) {
        if (err) {
            console.error("Error subscribing to topic 98:", err.message);
        } else {
            console.log("Subscribed to topic successfully 98");
        }
    });

     mqttClient.subscribe('water_quality/Y041653632892499/masterPublish', function (err) {
        if (err) {
            console.error("Error subscribing to topic 99:", err.message);
        } else {
            console.log("Subscribed to topic successfully 99");
        }
    });

     mqttClient.subscribe('water_quality/Y041653632892500/masterPublish', function (err) {
        if (err) {
            console.error("Error subscribing to topic 500:", err.message);
        } else {
            console.log("Subscribed to topic successfully 500");
        }
    });


});

mqttClient.on('message', async function (topic, message) {
    console.log(`Message received on topic ${topic}: ${message.toString()}`);

    // Parse the JSON message
    try {
        const data = JSON.parse(message.toString());
        const latitude = data.LATITUDE;
        const longitude = data.LONGITUDE;

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        // Update the latest coordinates
        // // Emit/send the latitude and longitude to all connected/sends clients/frontend
        const currentTime = new Date().toISOString();


//if device/hardware/sensor is online then and then you will get those device id msg in console 
// and it will update that device id in firebase 
// otherwise send through mqtt for testing purpose

//topic - water_quality/Y041653632892495/masterPublish
//payload {"type":"config","HARDWARE_ID":"Y041653632892495","version":"3.1.0","DO":"6.38","TDS":"0","PH":"7.50","DO_PER":"0.88","TEMPERATURE":"31.51","AMBIENT_TEMPERATURE":"35.13","LATITUDE":"21.145800","LONGITUDE":"79.088158","GSM_STRENGTH":"4","GSM_NETWORK":"AirTel","RTC_TIMESTAMP":"2025-05-16 11:01:53","device_connection_mode":"1"}
//only change lat lang and HARDWARE_ID in mqtt

//CHANGE REQUIRED
        if (topic.includes('Y041653632892487')) {
        latestCoordinates87 = { latitude, longitude, lastSeen: currentTime, offline: false };
        // Check if latitude and longitude are valid means it has not empty or null values
        if (latitude && longitude) {
        lastKnownLocation87 = { latitude, longitude, lastSeen: currentTime };
        }
         // Save to Firebase Realtime Database
         await set(ref(db, "location/device87/latestCoordinates"), latestCoordinates87)
         await set(ref(db, "location/device87/lastKnownLocation"), lastKnownLocation87)
         .then(() => console.log("latestCoordinates87 and lastKnownLocation87 updated in Firebase"))
         .catch((error) => console.error("Error saving location:", error));
        io.emit("locationUpdate87", latestCoordinates87);
        }
         
        else if (topic.includes('Y041653632892492')) { // Device 92
            latestCoordinates92 = { latitude, longitude, lastSeen: currentTime, offline: false };
            if (latitude && longitude) {
                lastKnownLocation92 = { latitude, longitude, lastSeen: currentTime };
            }
            await set(ref(db, "location/device92/latestCoordinates"), latestCoordinates92);
            await set(ref(db, "location/device92/lastKnownLocation"), lastKnownLocation92)
             .then(() => console.log("latestCoordinates92 and lastKnownLocation92 updated in Firebase"))
         .catch((error) => console.error("Error saving location:", error));
            io.emit("locationUpdate92", latestCoordinates92);
        }


        else if (topic.includes('Y041653632892493')) { // Device 93
            latestCoordinates93 = { latitude, longitude, lastSeen: currentTime, offline: false };
            if (latitude && longitude) {
                lastKnownLocation93 = { latitude, longitude, lastSeen: currentTime };
            }
            await set(ref(db, "location/device93/latestCoordinates"), latestCoordinates93);
            await set(ref(db, "location/device93/lastKnownLocation"), lastKnownLocation93)
            .then(() => console.log("latestCoordinates93 and lastKnownLocation93 updated in Firebase"))
         .catch((error) => console.error("Error saving location:", error));
            io.emit("locationUpdate93", latestCoordinates93);
        }

        else if (topic.includes('Y041653632892494')) { // Device 94
            latestCoordinates94 = { latitude, longitude, lastSeen: currentTime, offline: false };
            if (latitude && longitude) {
                lastKnownLocation94 = { latitude, longitude, lastSeen: currentTime };
            }
            await set(ref(db, "location/device94/latestCoordinates"), latestCoordinates94);
            await set(ref(db, "location/device94/lastKnownLocation"), lastKnownLocation94)
            .then(() => console.log("latestCoordinates94 and lastKnownLocation94 updated in Firebase"))
         .catch((error) => console.error("Error saving location:", error));
            io.emit("locationUpdate94", latestCoordinates94);
        }

        else if (topic.includes('Y041653632892495')) { // Device 95
            latestCoordinates95 = { latitude, longitude, lastSeen: currentTime, offline: false };
            if (latitude && longitude) {
                lastKnownLocation95 = { latitude, longitude, lastSeen: currentTime };
            }
            await set(ref(db, "location/device95/latestCoordinates"), latestCoordinates95);
            await set(ref(db, "location/device95/lastKnownLocation"), lastKnownLocation95)
            .then(() => console.log("latestCoordinates95 and lastKnownLocation95 updated in Firebase"))
         .catch((error) => console.error("Error saving location:", error));
            io.emit("locationUpdate95", latestCoordinates95);
        }
        

        else if (topic.includes('Y041653632892496')) { // Device 96
            latestCoordinates96 = { latitude, longitude, lastSeen: currentTime, offline: false };
            if (latitude && longitude) {
                lastKnownLocation96 = { latitude, longitude, lastSeen: currentTime };
            }
            await set(ref(db, "location/device96/latestCoordinates"), latestCoordinates96);
            await set(ref(db, "location/device96/lastKnownLocation"), lastKnownLocation96)
            .then(() => console.log("latestCoordinates96 and lastKnownLocation96 updated in Firebase"))
         .catch((error) => console.error("Error saving location:", error));
            io.emit("locationUpdate96", latestCoordinates96);
        }

        else if (topic.includes('Y041653632892497')) { // Device 97
            latestCoordinates97 = { latitude, longitude, lastSeen: currentTime, offline: false };
            if (latitude && longitude) {
                lastKnownLocation97 = { latitude, longitude, lastSeen: currentTime };
            }
            await set(ref(db, "location/device97/latestCoordinates"), latestCoordinates97);
            await set(ref(db, "location/device97/lastKnownLocation"), lastKnownLocation97)
            .then(() => console.log("latestCoordinates97 and lastKnownLocation97 updated in Firebase"))
         .catch((error) => console.error("Error saving location:", error));
            io.emit("locationUpdate97", latestCoordinates97);
        }

        else if (topic.includes('Y041653632892498')) { // Device 98
            latestCoordinates98 = { latitude, longitude, lastSeen: currentTime, offline: false };
            if (latitude && longitude) {
                lastKnownLocation98 = { latitude, longitude, lastSeen: currentTime };
            }
            await set(ref(db, "location/device98/latestCoordinates"), latestCoordinates98);
            await set(ref(db, "location/device98/lastKnownLocation"), lastKnownLocation98)
            .then(() => console.log("latestCoordinates98 and lastKnownLocation98 updated in Firebase"))
         .catch((error) => console.error("Error saving location:", error));
            io.emit("locationUpdate98", latestCoordinates98);
        }

        else if (topic.includes('Y041653632892499')) { // Device 99
            latestCoordinates99 = { latitude, longitude, lastSeen: currentTime, offline: false };
            if (latitude && longitude) {
                lastKnownLocation99 = { latitude, longitude, lastSeen: currentTime };
            }
            await set(ref(db, "location/device99/latestCoordinates"), latestCoordinates99);
            await set(ref(db, "location/device99/lastKnownLocation"), lastKnownLocation99)
            .then(() => console.log("latestCoordinates99 and lastKnownLocation99 updated in Firebase"))
         .catch((error) => console.error("Error saving location:", error));
            io.emit("locationUpdate99", latestCoordinates99);
        }

        else if (topic.includes('Y041653632892500')) { // Device 500
            latestCoordinates500 = { latitude, longitude, lastSeen: currentTime, offline: false };
            if (latitude && longitude) {
                lastKnownLocation500 = { latitude, longitude, lastSeen: currentTime };
            }
            await set(ref(db, "location/device500/latestCoordinates"), latestCoordinates500);
            await set(ref(db, "location/device500/lastKnownLocation"), lastKnownLocation500)
            .then(() => console.log("latestCoordinates500 and lastKnownLocation500 updated in Firebase"))
         .catch((error) => console.error("Error saving location:", error));
            io.emit("locationUpdate500", latestCoordinates500);
        }







        else {
            console.log(`Received message for unknown topic: ${topic}`);
        }

    } catch (error) {
        console.error("Error parsing MQTT message:", error.message);
    }
});

// Check if the device is offline (No MQTT message in last 10 seconds)
setInterval(() => {
    const checkDeviceOffline = (latestCoordinates, deviceId) => {
    if (latestCoordinates.lastSeen) {
        const lastSeenTime = new Date(latestCoordinates.lastSeen);
        const timeElapsed = (new Date() - lastSeenTime) / 1000;

        if (timeElapsed > 4) { // Set to 4 seconds for quicker feedback
            latestCoordinates.offline = true;
            // Update Firebase with offline status
            set(ref(db, `location/device${deviceId}/latestCoordinates`), latestCoordinates);
        } else {
            latestCoordinates.offline = false; // Device is online
        }

         }
    };

    //CHANGE REQUIRED
    checkDeviceOffline(latestCoordinates87, 87);
    checkDeviceOffline(latestCoordinates92, 92);
    checkDeviceOffline(latestCoordinates93, 93);
    checkDeviceOffline(latestCoordinates94, 94);
    checkDeviceOffline(latestCoordinates95, 95);
    checkDeviceOffline(latestCoordinates96, 96);
    checkDeviceOffline(latestCoordinates97, 97);
    checkDeviceOffline(latestCoordinates98, 98);
    checkDeviceOffline(latestCoordinates99, 99);
    checkDeviceOffline(latestCoordinates500, 500);

    
}, 4000);




//CHANGE REQUIRED
// API endpoint to get the latest coordinates for device 87
app.get("/api/coordinates/device87", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device87/latestCoordinates"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No latest coordinates found for device 87." });
        }
    } catch (error) {
        console.error("Error fetching latest coordinates for device 87:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// API endpoint to get the last known location for device 87
app.get("/api/last-known-location/device87", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device87/lastKnownLocation"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No last known location found for device 87." });
        }
    } catch (error) {
        console.error("Error fetching last known location for device 87:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// API endpoint to get the latest coordinates for device 92
app.get("/api/coordinates/device92", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device92/latestCoordinates"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No latest coordinates found for device 92." });
        }
    } catch (error) {
        console.error("Error fetching latest coordinates for device 92:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// API endpoint to get the last known location for device 92
app.get("/api/last-known-location/device92", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device92/lastKnownLocation"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No last known location found for device 92." });
        }
    } catch (error) {
        console.error("Error fetching last known location for device 92:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// API endpoint to get the latest coordinates for device 93
app.get("/api/coordinates/device93", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device93/latestCoordinates"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No latest coordinates found for device 93." });
        }
    } catch (error) {
        console.error("Error fetching latest coordinates for device 93:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// API endpoint to get the last known location for device 93
app.get("/api/last-known-location/device93", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device93/lastKnownLocation"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No last known location found for device 93." });
        }
    } catch (error) {
        console.error("Error fetching last known location for device 93:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// API endpoint to get the latest coordinates for device 94
app.get("/api/coordinates/device94", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device94/latestCoordinates"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No latest coordinates found for device 94." });
        }
    } catch (error) {
        console.error("Error fetching latest coordinates for device 94:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// API endpoint to get the last known location for device 94
app.get("/api/last-known-location/device94", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device94/lastKnownLocation"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No last known location found for device 94." });
        }
    } catch (error) {
        console.error("Error fetching last known location for device 94:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});




// API endpoint to get the latest coordinates for device 95
app.get("/api/coordinates/device95", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device95/latestCoordinates"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No latest coordinates found for device 95." });
        }
    } catch (error) {
        console.error("Error fetching latest coordinates for device 95:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// API endpoint to get the last known location for device 95
app.get("/api/last-known-location/device95", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device95/lastKnownLocation"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No last known location found for device 95." });
        }
    } catch (error) {
        console.error("Error fetching last known location for device 95:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});







// API endpoint to get the latest coordinates for device 96
app.get("/api/coordinates/device96", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device96/latestCoordinates"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No latest coordinates found for device 96." });
        }
    } catch (error) {
        console.error("Error fetching latest coordinates for device 96:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// API endpoint to get the last known location for device 96
app.get("/api/last-known-location/device96", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device96/lastKnownLocation"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No last known location found for device 96." });
        }
    } catch (error) {
        console.error("Error fetching last known location for device 96:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





// API endpoint to get the latest coordinates for device 97
app.get("/api/coordinates/device97", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device97/latestCoordinates"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No latest coordinates found for device 97." });
        }
    } catch (error) {
        console.error("Error fetching latest coordinates for device 97:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// API endpoint to get the last known location for device 97
app.get("/api/last-known-location/device97", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device97/lastKnownLocation"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No last known location found for device 97." });
        }
    } catch (error) {
        console.error("Error fetching last known location for device 97:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





// API endpoint to get the latest coordinates for device 98
app.get("/api/coordinates/device98", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device98/latestCoordinates"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No latest coordinates found for device 98." });
        }
    } catch (error) {
        console.error("Error fetching latest coordinates for device 98:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// API endpoint to get the last known location for device 98
app.get("/api/last-known-location/device98", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device98/lastKnownLocation"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No last known location found for device 98." });
        }
    } catch (error) {
        console.error("Error fetching last known location for device 98:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// API endpoint to get the latest coordinates for device 99
app.get("/api/coordinates/device99", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device99/latestCoordinates"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No latest coordinates found for device 99." });
        }
    } catch (error) {
        console.error("Error fetching latest coordinates for device 99:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// API endpoint to get the last known location for device 99
app.get("/api/last-known-location/device99", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device99/lastKnownLocation"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No last known location found for device 99." });
        }
    } catch (error) {
        console.error("Error fetching last known location for device 99:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// API endpoint to get the latest coordinates for device 500
app.get("/api/coordinates/device500", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device500/latestCoordinates"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No latest coordinates found for device 500." });
        }
    } catch (error) {
        console.error("Error fetching latest coordinates for device 500:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// API endpoint to get the last known location for device 500
app.get("/api/last-known-location/device500", async (req, res) => {
    try {
        const snapshot = await get(ref(db, "location/device500/lastKnownLocation"));
        if (snapshot.exists()) {
            res.json(snapshot.val());
        } else {
            res.status(404).json({ error: "No last known location found for device 500." });
        }
    } catch (error) {
        console.error("Error fetching last known location for device 500:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Start the server
server.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});