import React, { useContext, useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import ChatHeader from './ChatHeader'
import ChatInput from "./ChatInput"
import UsersDisplay from './UsersDisplay'
import { AuthContext  } from '../../auth/AuthProvider'
import { FirebaseContext } from "../../auth/FirebaseProvider";
import {collection, query,  onSnapshot, orderBy } from "firebase/firestore"

const ChatRoom = () => {
  const chatroom =  {
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    width:" 100%",
    height: "90vh",
    zIndex: 1,
}
const authContext = useContext(AuthContext);
const fbContext = useContext(FirebaseContext);
const db = fbContext.db;
const { user, isOnline } = authContext;
const [onlineUsers, setOnlineUsers ] = useState([])
const [ messages, setMessages ] = useState([])

useEffect(() => {
        if (db && user) {
          let collectionRef = collection(db, "users");
          let queryRef = query(collectionRef, orderBy("uid"));
          const unsubscribe = onSnapshot(queryRef, (querySnap) => {
            if (querySnap.empty) {
              console.log("Ads not found");
            } else {
              let usersData = querySnap.docs.map((doc) => {
                return { ...doc.data(), DOC_ID: doc.id };
              });
              setOnlineUsers(usersData);
            }
          });
          return unsubscribe;
        }
      }, [db, user]);

      // useEffect(() => {
      //   if (db && user) {
      //     let messageRef = collection(db, "messages");
      //     let queryRef = query(messageRef, orderBy("createdAt").limit(50));

      //     const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      //       if (querySnap.empty) {
      //         console.log("Ads not found");
      //       } else {
      //         let usersData = querySnap.docs.map((doc) => {
      //           return { ...doc.data(), DOC_ID: doc.id };
      //         });
      //         setMessages(usersData);
      //       }
      //     });
      //     return unsubscribe;
      //   }
      // }, [db, user]);
  return (
    <>
    <Box style={chatroom}>
        <ChatHeader />
        <UsersDisplay onlineUsers={onlineUsers} />
        <ChatInput />
    </Box>
    </>
  )
}

export default ChatRoom