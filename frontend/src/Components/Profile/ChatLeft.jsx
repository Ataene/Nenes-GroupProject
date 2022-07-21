import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AuthContext } from "../../auth/AuthProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import SendIcon from "@mui/icons-material/Send";
import { Box, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const ChatLeft = ({ setOpen }) => {
  const authContext = useContext(AuthContext);
  const { user, messageUser, setMessageUser } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [userPicture, setUserPicture] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [newChat, setNewChat] = useState("");
  const [messages, setMessages] = useState([]);

  //Get User to Message
  useEffect(() => {
    if (db && messageUser) {
      let docRef = doc(db, "users", messageUser);
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
  }, [db, messageUser]);

  useEffect(() => {
    if (db && messageUser) {
      let collectionRef = collection(db, "messages");
      let queryRef = query(
        collectionRef,
        where("users." + user.uid, "==", true),
        where("users." + messageUser, "==", true),
        // orderBy("timeStamp", "asc")
      );
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          setMessages([]);
        } else {
          let messagesData = querySnap.docs.map((message) => message.data());
          messagesData = messagesData.sort((a, b) => {
            return a.timeStamp.toString().localeCompare(b.timeStamp.toString())
          })
//          console.log(messagesData);
          setMessages(messagesData);
        }
      });
      return unsubscribe;
    }
  }, [db, messageUser]);
//console.log("888". messages);
  //Handle Create/Send Message
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let collectionRef = collection(db, "messages");
      await addDoc(collectionRef, {
        newChat,
        senderuid: user.uid,
        users: { [user.uid]: true, [messageUser]: true },
        timeStamp: serverTimestamp(),
      });
      setNewChat("");
      // scroll.current.scrollIntoView({behavior: "smooth"})
    } catch (error) {
      console.log(error.message);
    }
  };

  const [usePicture, setUsePicture] = useState();
  useEffect(() => {
    if (db && user) {
      let docRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(docRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("Ads not found");
        } else {
          let usersData = querySnap.data();
          setUsePicture(usersData?.Avatar);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);

  return (
    <Box
      sx={{
        border: "3px solid",
        height: "600px",
        position: "relative",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Button onClick={() => setMessageUser(false)}>Exit</Button>
      <Box sx={{ padding: "5px" }}>
        {messages.map((message, i) => {
          if (message.senderuid === user.uid) {
            return (
              <div key={i}>
                <div
                  style={{
                    backgroundColor: "#ABC9FF",
                    display: "flex",
                    flexDirection: "row",
                    margin: 8,
                    borderRadius: 8,
                    padding: 5,
                    justifyContent: "end",
                  }}
                >
                  {message.newChat} <Avatar sx={{marginLeft: "5px"}} src={usePicture} />
                </div>
              </div>
            );
          } else {
            return (
              <div>
                <p
                  style={{
                    backgroundColor: "#FFF2F2",
                    display: "flex",
                    flexDirection: "row",
                    margin: 8,
                    borderRadius: 8,
                    padding: 5,
                    justifyContent: "start",
                  }}
                >
                  <Avatar src={userPicture} /> {message.newChat}
                </p>
              </div>
            );
          }
        })}
        <Box sx={{ bottom: "0px" }}>
          <form
            style={{ display: "flex", flexDirection: "row" }}
            onSubmit={handleSubmit}
          >
            <label>
              <AttachFileIcon />
            </label>
            <input
              type="file"
              id="img"
              accept="image/"
              style={{ display: "none", borderRadius: "5px" }}
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
        </Box>
      </Box>
    </Box>
  );
};
export default ChatLeft;
