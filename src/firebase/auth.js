import { auth, db } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

setPersistence(auth, browserLocalPersistence);

export const authService = {
  async signup(email, password, userData) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      nombre: userData.nombre || "",
      direccion: userData.direccion || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return user;
  },

  async login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  async logout() {
    await signOut(auth);
  },

  async getUserData(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  async updateUserData(uid, userData) {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      ...userData,
      updatedAt: new Date(),
    });
  },
};
