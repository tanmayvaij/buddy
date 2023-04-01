import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyD0T7-eE4eQ4WPGXevBJTtsw0PCV50qYDI",
  authDomain: "iron-envelope-379712.firebaseapp.com",
  projectId: "iron-envelope-379712",
  storageBucket: "iron-envelope-379712.appspot.com",
  messagingSenderId: "62030673710",
  appId: "1:62030673710:web:f9f694ae489d900ff46cbf",
  measurementId: "G-P35X579EBN"
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)
const db = getFirestore(app)
const docDb = getDatabase(app)
const auth = getAuth(app)

export { auth, storage, db, docDb }
