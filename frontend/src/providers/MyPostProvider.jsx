import React, { useState, useEffect, createContext, useContext } from "react";
import { FirebaseContext } from "../auth/FirebaseProvider";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthContext } from "../auth/AuthProvider";
import { useParams } from "react-router-dom";

export const MyPostContext = createContext();
const MyPostProvider = (props) => {
  const params = useParams();
  const children = props.children;

  const fbContext = useContext(FirebaseContext);
  const auth = fbContext.auth;
  const db = fbContext.db;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [myPostList, setMyPostList] = useState([]);
  const [traded, setTraded] = useState([]);

  //     const addToWantList = (newItem) =>{
  //         let newWantList = [...wantList, newItem]
  //         let docRef = doc(db, "wantlist", user.uid);
  //         setDoc(docRef, {items: newWantList})
  //   }

  //       const moveToTraded = (newItem) => {
  //         let newTraded = [...traded, newItem];
  //         let docRef = doc(db, "traded", user.uid);
  //         setDoc(docRef, { items: newTraded });
  //   };

  const removeFromMyPostList = (itemToRemove) => {
    let newMyPostList = myPostList.filter((item) => item !== itemToRemove);
    let docRef = doc(db, "postedAds", user.uid);
    setDoc(docRef, { items: newMyPostList });
  };

  useEffect(() => {
    if (db && user) {
      let docRef = doc(db, "postedAds", user.uid);
      const unsubscribe = onSnapshot(docRef, (querySnap) => {
        if (querySnap.empty) {
          setDoc(docRef, { items: [] });
          setMyPostList([]);
        } else {
          let myPostData = querySnap.data()?.items;
          setMyPostList(myPostData);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);
        console.log("myPostList is :", myPostList)
  const theValues = {
    myPostList,
    //       addToWantList,
    //        moveToTraded,
    removeFromMyPostList,
  };
  return (
    <MyPostContext.Provider value={theValues}>
      {children}
    </MyPostContext.Provider>
  );
};
export default MyPostProvider;
