import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyB3ei2j4PGJ_aDTSn1VCdna-onxdL8SskA",
  authDomain: "netflix-clone-1a1ea.firebaseapp.com",
  projectId: "netflix-clone-1a1ea",
  storageBucket: "netflix-clone-1a1ea.firebasestorage.app",
  messagingSenderId: "562663832372",
  appId: "1:562663832372:web:d10cd011e106e1baa60361"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc (collection(db, "user"),{
            uid:user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error)
        alert(error);
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error)
    }
}

const logout= () =>{
    signOut(auth);
}

export {auth, db, login, signup, logout};