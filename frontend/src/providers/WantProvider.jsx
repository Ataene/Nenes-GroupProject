import React, { useState, useEffect, createContext, useContext } from 'react';
import { FirebaseContext } from '../auth/FirebaseProvider';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { AuthContext } from "../auth/AuthProvider";

export const WantContext = createContext();

const WantProvider = (props) => {
    const children = props.children

    const fbContext = useContext(FirebaseContext);
    const authContext = useContext(AuthContext);
    const db = fbContext.db;
    const { user } = authContext; 

  const [wantList, setWantList] = useState([]);

    const addToWantList = (newItem) =>{
        let newWantList = [...wantList, newItem]
        let docRef = doc(db, "wantlist", user.uid);
        setDoc(docRef, {items: newWantList})
  }

    const removeFromWantList = (itemToRemove) =>{
        let newWantList = wantList.filter((item) =>item !== itemToRemove);
        let docRef = doc(db, "wantlist", user.uid);
        setDoc(docRef, {items: newWantList})
}

useEffect(() => {
        if (db && user) {
          let docRef = doc(db, "wantlist", user.uid);
          const unsubscribe = onSnapshot(docRef, (querySnap) => {
            if (!querySnap.exists()) {
              setDoc(docRef, {items: []});
              setWantList([])
            } else {
              let wantData = querySnap.data()?.items;
              setWantList(wantData);
            }
          });
          return unsubscribe;
        }
      }, [db, user]);
    const theValues = {
       wantList,
      addToWantList,
      //  moveToTraded,
       removeFromWantList,
    }
    return <WantContext.Provider value={theValues}>{children}</WantContext.Provider>
}
export default WantProvider;
