import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import ChatIcon from "@mui/icons-material/Chat";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { AuthContext } from "../../auth/AuthProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { addDoc, collection, doc, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';


// function TransitionUp(props) {
//   return <Slide {...props} direction="up" />;
// }
const ChatBox = ( { setOpen }) =>  {

  const authContext = useContext(AuthContext);
  const { user, userToMessage, setUserToMessage } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [userPicture, setUserPicture ] = useState("");
  const [displayName, setDisplayName ] = useState("");
  const [ newChat, setNewChat ] = useState("")
  const [ messages, setMessages ] = useState([])

  //Get User to Message
  useEffect(() => {
    if (db && userToMessage) {
      let docRef = doc(db, "users", userToMessage);
      const unsubscribe = onSnapshot(docRef, (querySnap) => {
        if (querySnap.empty) {
        } else {
          let usersData = querySnap.data()
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
      let queryRef = query(collectionRef, where("users." + user.uid, "==", true), where("users." + userToMessage, "==", true))
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          setMessages([])
        } else {
          let messagesData = querySnap.docs.map((message) => message.data())
          console.log(messagesData)
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
        users: {[user.uid]: true, [userToMessage]: true},
        timeStamp: serverTimestamp(),
      });
      setNewChat("")
      // scroll.current.scrollIntoView({behavior: "smooth"})
    } catch (error) {
      console.log(error.message);
    }
  }




  return (
    <div style={{position: "absolute", bottom: "0", right: "0"}}>
    <Button onClick={() =>setUserToMessage(false)}>Exit</Button>
    {messages.map((message) =>{ 
      if(message.senderuid === user.uid){
        return <div>
          <p>from Me: {message.newChat}</p>
        </div>
      } else{
        return <div>
          <p>From {displayName}: {message.newChat} </p>
        </div>
      }
    })}
      <form  onSubmit={handleSubmit}>
        <label>
          <AttachFileIcon />
        </label>
        <input
          type="file"
          id="img"
          accept= "image/"
          style={{display: "none"}}>
        </input>
        <div style={{borderRadius: "10px solid"}}>
          <input 
          type="text" 
          placeholder='Enter message'
          value={newChat}
          onChange={(e) => setNewChat(e.target.value)}
          />
        </div>
        <Button type="submit">Send</Button>
    </form>
    </div>
  );
}
export default ChatBox;
