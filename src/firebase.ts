import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyD9ViO_hqAwKY3tyGVaZiQ1Cf6cwrpwu-U",
    authDomain: "scoreboard-6b0b2.firebaseapp.com",
    projectId: "scoreboard-6b0b2",
    storageBucket: "scoreboard-6b0b2.appspot.com",
    messagingSenderId: "538406489094",
    appId: "1:538406489094:web:d7c3237982de2368618787",
    measurementId: "G-GZB8BWKG4L"
};

const app = initializeApp(firebaseConfig);

const firebase = getFirestore(app);
const firebaseAnalytics = getAnalytics(app);

export { firebase, firebaseAnalytics };