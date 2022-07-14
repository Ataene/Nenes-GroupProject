import React, { useState, useEffect, createContext, useContext } from 'react';

import { FirebaseContext } from '../auth/FirebaseProvider';
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { AuthContext } from "../auth/AuthProvider";

export const TradeContext = createContext();
const TradedProvider = (props) => {

    const children = props.children

    const fbContext = useContext(FirebaseContext);
    const authContext = useContext(AuthContext);
    const auth = fbContext.auth;
    const db = fbContext.db;
    const { user } = authContext; 

    const [ traded, setTraded ] = useState([])

    const addToTraded = (newItem) =>{
        let newTraded = [...traded, newItem]
        let docRef = doc(db, "traded", user.uid);
        setDoc(docRef, {items: newTraded})
    }
    
  const removeFromTraded = (itemToRemove) =>{
        let newTraded = traded.filter((item) =>item !== itemToRemove);
        let docRef = doc(db, "traded", user.uid);
        setDoc(docRef, {items: newTraded})
}

useEffect(() => {
  if (db && user) {
    let docRef = doc(db, "traded", user.uid);
          const unsubscribe = onSnapshot(docRef, (querySnap) => {
            if (querySnap.empty) {
              setDoc(docRef, {items: []});
              setTraded([])
            } else {
              let tradeData = querySnap.docs;

              console.log("222", tradeData)
              setTraded(tradeData);
            }
          });
          return unsubscribe;
        }
      }, [db, user]);


    const theValues = {
       traded,
       addToTraded,
       removeFromTraded
    }
    return <TradeContext.Provider value={theValues}>{children}</TradeContext.Provider>
}
export default TradedProvider;
