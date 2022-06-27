import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { AuthContext  } from '../../auth/AuthProvider'
import { FirebaseContext } from "../../auth/FirebaseProvider";
import {collection, query,  onSnapshot, orderBy } from "firebase/firestore"

const ChatInput = () => {
  const [ text, setText ] = useState("")
  const [ chat, setChat ] = useState("")
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

    const styleInput = {
      padding: "20px",
      display: "flex",
      flexDirection: "row",
      borderRadius: "5px",
    }
    const handleSubmit = () => {
      // e.preventDefault();

      // const user2 = chat.uid

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

          />
        </div>
        <Button type="submit">Send</Button>
    </form>
    </>
  )
}

export default ChatInput;