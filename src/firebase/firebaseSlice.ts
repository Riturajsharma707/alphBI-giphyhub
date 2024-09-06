import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

//  Login | sign in
const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error: any) {
    return error;
  }
};

//sign up | log out
const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential;
  } catch (error: any) {
    return error;
  }
};

// add item to database
const addDataToFirebase = async (item: any, userId: any) => {
  try {
    const docRef = await doc(db, userId, item.id);
    await setDoc(docRef, item);
    return docRef;
  } catch (error: any) {
    return error.message;
  }
};

// remove item from databae

const removeFavorite = async (userId: any, id: any) => {
  try {
    await deleteDoc(doc(db, userId, id));
    return true;
  } catch (error: any) {
    return false;
  }
};

//  get favorite item from database
const getFavoritesFromFirebase = async (userId: any) => {
  const querySnapshot = await getDocs(collection(db, userId));

  const data: any = [];
  querySnapshot.forEach((doc: any) => data.push({ id: doc.id, ...doc.data() }));
  return data;
};

export {
  login,
  signUp,
  addDataToFirebase,
  removeFavorite,
  getFavoritesFromFirebase,
};
