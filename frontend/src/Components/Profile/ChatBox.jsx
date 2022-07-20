import React, { useContext, useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AuthContext } from "../../auth/AuthProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
const ChatBox = ({ setOpen }) => {
  const scrollRef = useRef()
  const authContext = useContext(AuthContext);
  const { user, userToMessage, setUserToMessage } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [userPicture, setUserPicture] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [newChat, setNewChat] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])
  
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
    if (db) {
      let collectionRef = collection(db, "messages");
      let queryRef = query(
        collectionRef,
        where("users." + user.uid, "==", true)
        // where("users." + userToMessage, "==", true)
      );
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          setMessages([]);
        } else {
          let messagesData = querySnap.docs.map((message) => message.data());
          setMessages(messagesData);
        }
      });
      return unsubscribe;

    }
  }, [db]);

   const [messageThreads, setMessageThreads ] = useState({})
  useEffect(() => {
    if (messages) {
      let newMessageThreads = messages.reduce((object, message) =>{
        let users = message.users;
        let otherUser = Object.keys(users).filter((theUser) =>theUser !== user.uid)[0]
        if(object[otherUser]){
          object[otherUser].push(message)
        } else {
          object[otherUser] = [message]
        } 
        return object

      }, {});
       let userList =Object.keys(newMessageThreads)

       userList = userList.map((theUser) =>{
         let docRef = doc(db, "users", theUser);
        let theUserData;
          getDoc(docRef).then( (querySnap) => {
           if (querySnap.empty) {
           } else {
             let usersData = querySnap.data();
             theUserData = {
                Avatar: usersData.Avatar, 
                displayName: usersData.firstName}
           }
         });
         return theUserData;
       })

    }
  }, [messages]);
  
  //Handle Create/Send Message
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let collectionRef = collection(db, "messages");
      await addDoc(collectionRef, {
        newChat,
        senderuid: user.uid,
        users: { [user.uid]: true, [userToMessage]: true },
        unread: true,
        timeStamp: serverTimestamp(),
      });
      //Notification setDocs - To setNew Messages as unread until the user reads the message
      // await setDoc(doc(db, "lastMessage", {
      //   newChat,
      //   senderuid: user.uid,
      //   users: { [user.uid]: true, [userToMessage]: true },
      //   timeStamp: serverTimestamp(),
      //   //End of Unread messages
      // })) 
      // alert(`User ${user.uid} Message ${userToMessage}`)
      setNewChat("");
    } catch (error) {
      console.log(error.message);
    }
  };

// User user Image on the Message Profile
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

  //Getting Access to the unread Message in the database
  // const [lastMessageData, setLastMessageData ] = useState('')
  // useEffect(() => {
  //   if (db) {
  //     // let users =  {[user.uid]: true, [userToMessage]: true}
  //     let docRef = doc(db, "lastMessage");
  //     const unsubscribe = onSnapshot(docRef, (querySnap) => {
  //       if (querySnap.empty) {
  //         console.log("Ads not found");
  //       } else {
  //         let usersData = querySnap.data();
  //         setLastMessageData(usersData);
  //         console.log(lastMessageData);
  //       }
  //     });
  //     return unsubscribe;
  //   }
  // }, [db]);



  return (
    <Box sx={{border: "3px solid", height: "800px", position: "relative"}} >
        <Button onClick={() => setUserToMessage(false)}>Exit</Button>
        <Box sx={{padding: "5px"}}>
        {messages.map((message, i) => {
          if (message.senderuid === user.uid) {
            return (
              <div key={i}>
                <p style={{backgroundColor: "#ABC9FF",  display: "flex", flexDirection: "column"}}>
                  {message.newChat}
                  <Avatar src={usePicture} 
                  />
                <br />
                </p>
              </div>
            );
          } else {
            return (
              <div>
                <p style={{ backgroundolor: "#FFF2F2", textAlign: "left" }}>
                <Avatar src={userPicture} />{message.newChat}{" "}
                </p>
              </div>
            );
          }
        })}
        </Box>
        {/* <div ref={scrollRef}>
        </div> */}
        <Box sx={{position: "absolute", bottom: "0px"}} ref={scrollRef}>
        <form
          style={{ display: "flex", flexDirection: "row"}}
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
        </Box>
    </Box>
  );
};
export default ChatBox;
