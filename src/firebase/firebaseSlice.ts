import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "./config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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

//sign up
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
const addDataToFirebase = async (item: any) => {
  try {
    const docRef = await addDoc(collection(db, "favorite"), {
      item,
    });
    return docRef;
  } catch (error: any) {
    return error.message;
  }
};

// remove item from databae

const removeFavorite = async (id: any) => {
  try {
    const deletedDocRef = await deleteDoc(doc(db, "favorite", id));
    return deletedDocRef;
  } catch (error: any) {
    return error.message;
  }
};

export { login, signUp, addDataToFirebase, removeFavorite };
