import React from 'react';
import { app } from './config';
import { auth } from './config';
import { db } from './config';
import { store } from './config';
import { cloudFuncs } from './config';

export const FirebaseContext = React.createContext();

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