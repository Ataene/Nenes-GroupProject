import React, { createContext } from 'react';

import { initializeApp } from 'firebase/app'; //Firebase Auth
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  }; 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const store = getStorage(app);
const cloudFuncs = getFunctions(app);

export const FirebaseContext = createContext();

const FirebaseProvider = (props) => {
    const children = props.children;
    const theValues = {app, auth, db, store, cloudFuncs}
  return (
    <FirebaseContext.Provider value={theValues}>
        {children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseProvider;