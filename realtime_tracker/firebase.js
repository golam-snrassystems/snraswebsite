//demo 

// // Import the functions you need from the SDKs you need
// //in react
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // import { getDatabase, ref, set, get } from "firebase/database";
// //in node
// const { initializeApp } = require("firebase/app");
// const { getDatabase, ref, set, get } = require("firebase/database");
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAjBiqTWxUFyIdCpJPHMj71urjcZCismIE",
//   authDomain: "fir-c6c06.firebaseapp.com",
//   projectId: "fir-c6c06",
//   storageBucket: "fir-c6c06.firebasestorage.app",
//   messagingSenderId: "1015371956271",
//   appId: "1:1015371956271:web:ed9c43687ff724f88986da",
//   measurementId: "G-TDEZ9NFE06",
//   databaseURL: "https://fir-c6c06-default-rtdb.firebaseio.com/" //change this 
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// const db = getDatabase(app);

// // export { db, ref, set, get };
// module.exports = { db, ref, set, get };













//original 

// ////////////////////firebase project water quality - goto project setting> general>scroll down> select webapp for website(waterquality)> copy code that is present in react form convert to nodejs and paste here >goto build>realtime db> copy db url and paste/////////////////////////////////
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get } = require("firebase/database");
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbcICT3ZbfJWFPLXzbG4UUeWG7Q2OQEjg",
  authDomain: "water-quality-35a00.firebaseapp.com",
  databaseURL: "https://water-quality-35a00-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "water-quality-35a00",
  storageBucket: "water-quality-35a00.firebasestorage.app",
  messagingSenderId: "138665105368",
  appId: "1:138665105368:web:0896a5e8062eb9e49844ad",
  measurementId: "G-NNCT5SYCJJ",
  databaseURL: "https://water-quality-35a00-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);
module.exports = { db, ref, set, get };
// ////////////////////////////////////////////////////