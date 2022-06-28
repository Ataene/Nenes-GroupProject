import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { AuthContext  } from '../../auth/AuthProvider'
import { FirebaseContext } from "../../auth/FirebaseProvider";
import {  doc, getDoc, onSnapshot, orderBy, query, collection } from "firebase/firestore";
import { addDoc, serverTimestamp } from "firebase/firestore";
  
const ChatInput = ({scroll}) => {
  // const [ text, setText ] = useState("")
  const [ newChat, setNewChat ] = useState("")
  const fbContext = useContext(FirebaseContext);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const db = fbContext.db;

    const styleInput = {
      padding: "20px",
      display: "flex",
      flexDirection: "row",
      borderRadius: "5px",
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // await db.collection("messages").add({
      //   newChat,
      //   // photoURL,
      //   uid,
      //   timeStamp: serverTimestamp()
      // })
      // setNewChat("")
      
      try {
        let collectionRef = collection(db, "messages");
        await addDoc(collectionRef, {
          newChat,
          uid: user.uid,
          // userPicture,
          timeStamp: serverTimestamp(),
        });
        setNewChat("")
        scroll.current.scrollIntoView({behavior: "smooth"})
      } catch (error) {
        console.log(error.message);
      }
    }
  return (
    <>
    <form style={styleInput} onSubmit={handleSubmit}>
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
    </>
  )
}

export default ChatInput;