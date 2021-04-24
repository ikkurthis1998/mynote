import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAUlDwdQaNVY1-6W85yCIm_oPnb2BPvScc",
    authDomain: "roc8-careers.firebaseapp.com",
    projectId: "roc8-careers",
    storageBucket: "roc8-careers.appspot.com",
    messagingSenderId: "323824466074",
    appId: "1:323824466074:web:82d2dc9932083d1bd8c723"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const dbRef = db.collection;

export { db, dbRef };