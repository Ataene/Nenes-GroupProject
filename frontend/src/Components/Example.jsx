import React, { useContext, useState } from 'react'
import { FirebaseContext } from "../auth/FirebaseProvider";
import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { Container } from '@mui/system';
import { TextField, Button } from '@mui/material';
const Example = () => {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const [ description, setDescription ] = useState('');
  const postAds = async (e) => {
    e.preventDefault()
    try {
        let collectionRef = collection(db, "postedAds");
        const response = await addDoc(collectionRef, {
            description,
            timeStamp: serverTimestamp(),
        }
        )
        console.log(response);
    } catch (error) {
        console.log(error.message);
    }
}
  return (
    <>  
        <Container sx={{margin: "50px"}}>
            <form onSubmit={postAds}>
                <TextField
                    sx={{ width: "30rem", margin: "2px" }}
                    placeholder="Enter the product category"
                    variant="filled"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                <Button type="submit">Submit</Button>
            </form>
        </Container>
    </>
  )
}

export default Example;