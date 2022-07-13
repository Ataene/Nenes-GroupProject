import React, { useState, useEffect, createContext, useContext } from 'react';
import { FirebaseContext } from '../auth/FirebaseProvider';
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { AuthContext } from "../auth/AuthProvider";
import { useParams } from "react-router-dom";

export const WantContext = createContext();

const WantProvider = (props) => {

    const params = useParams();
    const children = props.children

    const fbContext = useContext(FirebaseContext);
    const authContext = useContext(AuthContext);
    const auth = fbContext.auth;
    const db = fbContext.db;
    const { user } = authContext; 

  const [wantList, setWantList] = useState([]);
  // const [traded, setTraded] = useState([]);

    const addToWantList = (newItem) =>{
        let newWantList = [...wantList, newItem]
        let docRef = doc(db, "wantlist", user.uid);
        setDoc(docRef, {items: newWantList})
  }
  
  //     const moveToTraded = (newItem) => {
  //       let newTraded = [...traded, newItem];
  //       let docRef = doc(db, "traded", user.uid);
  //       setDoc(docRef, { items: newTraded });
  // };
  
    const removeFromWantList = (itemToRemove) =>{
        let newWantList = wantList.filter((item) =>item !== itemToRemove);
        let docRef = doc(db, "wantlist", user.uid);
        setDoc(docRef, {items: newWantList})
}

useEffect(() => {
    console.log("3", user, "6", db)
        if (db && user) {
          
          let docRef = doc(db, "wantlist", user.uid);
          const unsubscribe = onSnapshot(docRef, (querySnap) => {
            if (querySnap.empty) {
              setDoc(docRef, {items: []});
              setWantList([])
            } else {
              let wantData = querySnap.data()?.items;
              console.log("555", wantData)
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
