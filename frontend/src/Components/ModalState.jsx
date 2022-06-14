import React, { useState, useContext } from "react";
import { Modal, Button, Box, TextField } from "@mui/material";
import { addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import { FirebaseContext } from "../auth/FirebaseProvider";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const ModalState = () => {

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [progress, setProgress] = useState();

  const fbContext = useContext(FirebaseContext)
  const db = fbContext.db;
//   const store = fb.fbContext.store;

  const postAds = async (e) => {
      e.preventDefault()
      try {
          let collectionRef = collection(db, "postedAds");
          const response = await addDoc(collectionRef, 
            
            {
              category,
              title,
              condition,
              description,
              timeStamp: serverTimestamp(),
          }
          
          
          )
          console.log(response);
      } catch (error) {
          console.log(error.message);
      }
  }
  const ModalStyle = {
    backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 15,
    borderRadius: "20px",
  };

  return (
    <>
      {/* <Modal
        open={visible}
        onClose={onCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
        <Box sx={ModalStyle}>
          <form onSubmit={postAds}>
            <TextField
              sx={{ width: "30rem", margin: "2px" }}
              placeholder="Enter the product category"
              variant="filled"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <TextField
              sx={{ width: "30rem", margin: "2px" }}
              placeholder="Enter the product title"
              variant="filled"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              sx={{ width: "30rem", margin: "2px" }}
              placeholder="Enter the condition of the item"
              type="text"
              variant="filled"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
            <TextField
              sx={{ width: "30rem", margin: "2px" }}
              placeholder="Enter the description of the item"
              type="text"
              variant="filled"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <input
              style={{ width: "30rem", margin: "2px" }}
              className="file-uploader"
              type="file"
              onChange={(e) => setPicture(e.target.value)}
              placeholder="Upload a picture of your item"
              value={picture}
            /> */}
            <Button sx={{ width: "30rem", margin: "2px", backgroundColor: "green" }} type="submit">
              Submit
            </Button>
          </form>
        </Box>
      {/* </Modal> */}
    </>
  );
};

export default ModalState;
