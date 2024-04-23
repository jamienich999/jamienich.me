import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyDwPRdA1aNOZFBO09d-jqo8T-419fhpfEo",
    authDomain: "notescs52.firebaseapp.com",
    databaseURL: "https://notescs52-default-rtdb.firebaseio.com",
    projectId: "notescs52",
    storageBucket: "notescs52.appspot.com",
    messagingSenderId: "535405363864",
    appId: "1:535405363864:web:2c878fe10feb1b4e6946ed",
    measurementId: "G-YN2930CTFR"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database(); // Initialize Realtime Database

export function onNotesValueChange(callback) {
    db.ref('notes').on('value', snapshot => {
        const notesData = snapshot.val(); // Get the data from the snapshot
        if (notesData) {
            const newNoteState = new Map(Object.entries(notesData)); // Convert data to Map
            callback(newNoteState);
        } else {
            callback(new Map()); // If notesData is null, pass an empty Map
        }
    });
}

export default db;