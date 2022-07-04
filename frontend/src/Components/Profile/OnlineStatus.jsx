import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { Box } from "@mui/system";

const OnlineStatus = ({ uid}) => {
  const fbContext = useContext(FirebaseContext);
//   const authContext = useContext(AuthContext);
  const db = fbContext.db;
//   const { user } = authContext;

  const [online, setOnline] = useState(false);

//   useEffect(() => {
//     if (db && user) {
//       let collectionRef = collection(db, "users");
//       let queryRef = query(collectionRef, orderBy("uid"));
//       const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
//         let newOnline = [];
//         querySnapshot.forEach((doc) => {
//           newOnline.push(doc.data());
//         });
//         setOnline(newOnline);
//         console.log("+++++++++", newOnline);
//       });
//       return unsubscribe;
//     }
//   }, [db, user]);

useEffect(() => {
        if (db) {
          let docRef = doc(db, "users", uid);
          const unsubscribe = onSnapshot(docRef, (querySnap) => {
            if (querySnap.empty) {
            } else {
              let usersData = querySnap.data()
              setOnline(usersData.isOnline);
            }
          });
          return unsubscribe;
        }
      }, [db]);
      console.log("++++++///////", online)
  return (
    <Box>
        <div className={online ? `user_status online` : `user_status offline`}></div>
    </Box>
  );
};

export default OnlineStatus;
