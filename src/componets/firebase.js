// src/firebase.js

// 1️⃣ Import Firebase services
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 2️⃣ Your Firebase configuration
// 🔹 Replace the placeholder strings with your actual Firebase project keys
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// 3️⃣ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 4️⃣ Initialize services
const auth = getAuth(app);       // User authentication (sign in/sign up)
const db = getFirestore(app);    // Firestore database (journal, nutrition, chat logs)
const storage = getStorage(app); // File storage (user uploads, progress pics)

// 5️⃣ Export services to use in your components
export { auth, db, storage };

/*
------------------------------------------------------------
💡 Example Usage:

1. Save a journal entry:

import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const saveJournal = async (entryText) => {
  await addDoc(collection(db, "journals"), {
    text: entryText,
    createdAt: new Date(),
  });
};

2. Log a chat message:

import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const logChat = async (message, sender) => {
  await addDoc(collection(db, "chatLogs"), {
    message,
    sender,
    timestamp: new Date(),
  });
};

3. Upload a file (like a progress picture):

import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadFile = async (file) => {
  const fileRef = ref(storage, `uploads/${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url; // Returns the download URL for the uploaded file
};
------------------------------------------------------------
*/
