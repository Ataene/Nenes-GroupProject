import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { Box } from "@mui/system";

const OnlineStatus = ({ uid}) => {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [online, setOnline] = useState(false);
useEffect(() => {
        if (db && uid) {
          let docRef = doc(db, "users", uid);
          const unsubscribe = onSnapshot(docRef, (querySnap) => {
            if (querySnap.empty) {
            } else {
              let usersData = querySnap.data()
              setOnline(usersData?.isOnline);
            }
          });
          return unsubscribe;
        }
      }, [db]);
  return (
    <Box>
        <div className={online ? `user_status online` : `user_status offline`}></div>
    </Box>
  );
};

export default OnlineStatus;
