import React, { useContext, useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { AuthContext } from "../../auth/AuthProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { collection, query, onSnapshot, limit, orderBy, doc} from "firebase/firestore";

const ChatRoom = () => {
  const chatroom = {
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    width: " 100%",
    height: "90vh",
    zIndex: 1,
  };
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user, isOnline, userToMessage } = authContext;
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  useEffect(() => {
    if (db && userToMessage) {
      let docRef = doc(db, "users", userToMessage);
      const unsubscribe = onSnapshot(docRef, (querySnap) => {
        let userToMessageData = querySnap.data();
      });
      return unsubscribe;
    }
  }, [db, userToMessage]);

  useEffect(() => {
    if (db && user) {
      let collectionRef = collection(db, "users");
      let queryRef = query(collectionRef, orderBy("timeStamp"));
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

  //User's Messages from DB.
  useEffect(() => {
    if (db && user) {
      let collectionRef = collection(db, "messages");
      let queryRef = query(collectionRef, orderBy("uid", "desc"), limit(50));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("Ads not found");
        } else {
          let usersMessages = querySnap.docs.map((doc) => {
            return { ...doc.data(), DOC_ID: doc.id };
          });
          setMessages(usersMessages);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);

  return (
    <>
      <Box style={chatroom}>
        <ChatHeader />
        <div>
          {messages.map((item) => (
            <div>
              <div key={user.uid}>
                <p>{item.newChat}</p>
              </div>
            </div>
          ))}
        </div>
        <ChatInput scroll={scroll}  />
        <div ref={scroll}></div>
      </Box>
    </>
  );
};

export default ChatRoom;
