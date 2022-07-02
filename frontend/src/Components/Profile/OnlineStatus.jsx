import React, { useContext, useEffect, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";

const OnlineStatus = () => {
  const fbContext = useContext(FirebaseContext);
  const authContext = useContext(AuthContext);
  const db = fbContext.db;
  const { user } = authContext;

  const [online, setOnline] = useState([]);

  useEffect(() => {
    if (db && user) {
      let collectionRef = collection(db, "users");
      let queryRef = query(collectionRef, orderBy("timeStamp"));
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        let online =[];
        querySnapshot.forEach((doc) => {
                online.push(doc.data());
        })
        setOnline(online);
        console.log("++++++++", online);
      });
      return unsubscribe;
    }
  }, [db, user]);
  return (
    <di>
    {online.map((item) => {
        if(item.isOnline == true){
                return <div className={`user_status ${"online"}`}></div>
        } else if(item.isOnline == false) {
                return  <div className={`user_status ${"offline"}`}></div>
        }
        })}
    </di>
  );
};

export default OnlineStatus;
