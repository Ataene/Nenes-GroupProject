import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AuthContext } from "../../auth/AuthProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import SendIcon from "@mui/icons-material/Send";
import { Paper } from "@mui/material";

const ChatBox = ({ setOpen }) => {
  const authContext = useContext(AuthContext);
  const { user, userToMessage, setUserToMessage } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [userPicture, setUserPicture] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [newChat, setNewChat] = useState("");
  const [messages, setMessages] = useState([]);

  //Get User to Message
  useEffect(() => {
    if (db && userToMessage) {
      let docRef = doc(db, "users", userToMessage);
      const unsubscribe = onSnapshot(docRef, (querySnap) => {
        if (querySnap.empty) {
        } else {
          let usersData = querySnap.data();
          setUserPicture(usersData.Avatar);
          setDisplayName(usersData.firstName);
        }
      });
      return unsubscribe;
    }
  }, [db, userToMessage]);

  useEffect(() => {
    if (db && userToMessage) {
      let collectionRef = collection(db, "messages");
      let queryRef = query(
        collectionRef,
        where("users." + user.uid, "==", true),
        where("users." + userToMessage, "==", true)
      );
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          setMessages([]);
        } else {
          let messagesData = querySnap.docs.map((message) => message.data());
          console.log(messagesData);
          setMessages(messagesData);
        }
      });
      return unsubscribe;
    }
  }, [db, userToMessage]);

  //Handle Create/Send Message
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let collectionRef = collection(db, "messages");
      await addDoc(collectionRef, {
        newChat,
        senderuid: user.uid,
        users: { [user.uid]: true, [userToMessage]: true },
        timeStamp: serverTimestamp(),
      });
      setNewChat("");
      // scroll.current.scrollIntoView({behavior: "smooth"})
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Paper elevation={6}>
      <div
        style={{
          // position: "fixed",
          bottom: "116px",
          right: "24px",
          position: "absolute", 

          bottom: "0",
          // Size
          width: "290px",
          height: "530px",
          maxWidth: "calc(40% - 38px)",
          maxHeight: "calc(40% - 38px)",
          backgroundColor: "white",
          // Border
          borderRadius: "12px",
          border: `2px solid #7a39e0`,
          overflow: "hidden",
          // Shadow
          boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
        }}
      >
        <Button onClick={() => setUserToMessage(false)}>Exit</Button>
        {messages.map((message) => {
          if (message.senderuid === user.uid) {
            return (
              <div>
                <p style={{ backgroundColor: "blue", marginLeft: "100px" }}>
                  {" "}
                  {message.newChat}: Me
                </p>
              </div>
            );
          } else {
            return (
              <div>
                <p style={{ backgroundolor: "gray" }}>
                  From {displayName}: {message.newChat}{" "}
                </p>
              </div>
            );
          }
        })}
        <form
          style={{ display: "flex", flexDirection: "row", position: "absolute", bottom: "0" }}
          onSubmit={handleSubmit}
        >
          <label>
            <AttachFileIcon />
          </label>
          <input
            type="file"
            id="img"
            accept="image/"
            style={{ display: "none", borderRadius: '5px' }}
          ></input>
          <div style={{ borderRadius: "20px solid" }}>
            <input
              style={{ border: "2px solid" }}
              type="text"
              placeholder="Enter message"
              value={newChat}
              onChange={(e) => setNewChat(e.target.value)}
            />
          </div>
          <Button type="submit">
            <SendIcon sx={{ color: "green" }} />
          </Button>
        </form>
      </div>
    </Paper>
  );
};
export default ChatBox;
