import React, { createContext } from 'react';
import { collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore";
import db  from "./FirebaseProvider";

export const createUserDocument = async (user) => {
    try {
      const userProfile = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        address: "",
        province: "",
        city: "",
        postalCode: "",
        ProductWant: "",
        ProductNeeded: "",
      }
      let newUser = await setDoc(doc(db, "users", user.uid), userProfile)
      console.log("New user created!", newUser);
      return newUser;
    } catch (error) {
      console.log("Error creattting user data", error);
      return false;
    }
}

export const readUserDocument = async () => {
    const userDocRef = await getDocs(collection(db, "users"));
        userDocRef.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
    return userDocRef;
}

