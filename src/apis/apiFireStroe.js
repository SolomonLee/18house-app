import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCrETjeKDee8dRSsseVA4-kohZL3IGfSfQ",
    authDomain: "house-app-f82f2.firebaseapp.com",
    projectId: "house-app-f82f2",
    storageBucket: "house-app-f82f2.appspot.com",
    messagingSenderId: "639289463195",
    appId: "1:639289463195:web:a3f16fcfcc060d2d1a513e",
    measurementId: "G-ES7PPSCRHJ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
