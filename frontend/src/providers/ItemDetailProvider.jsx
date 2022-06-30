import React, { useState, useEffect, createContext, useContext } from 'react';

import { FirebaseContext } from '../auth/FirebaseProvider';
import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { AuthContext } from "../auth/AuthProvider";

import { useParams } from "react-router-dom";

export const ItemContext = createContext();

const DetailPageProvider = (props) => {

  const params = useParams();
  const children = props.children;

  const fbContext = useContext(FirebaseContext);
  const auth = fbContext.auth;
  const db = fbContext.db;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [postedAds, setSetAllPostedAds] = useState([]);

  const showInDetailedPage = (newItem) => {
    let newPostedAds = [...postedAds, newItem];
    let docRef = doc(db, "postedAds", user.uid);
    setDoc(docRef, { items: newPostedAds });
  };

  useEffect(() => {
    if (db && user) {
      let docRef = doc(db, "postedAds", user.uid);
      const unsubscribe = onSnapshot(docRef, (querySnap) => {
        if (querySnap.empty) {
          setDoc(docRef, { items: [] });
          setSetAllPostedAds([]);
        } else {
          let Data = querySnap.data().items;
          setSetAllPostedAds(Data);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);

  const theValues = {
    showInDetailedPage,
  };
  return (
    <ItemContext.Provider value={theValues}>{children}</ItemContext.Provider>
  );
};
export default DetailPageProvider;
