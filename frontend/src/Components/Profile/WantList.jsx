import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  InputLabel,
  MenuItem,
  FormControl,
  FormLabel,
  Select,
  Box,
  Container,
} from "@mui/material";
//import FileBase from "react-file-base64";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";




const Want = () => {
  const fbContext = useContext(FirebaseContext);
    const db = fbContext.db;
  
    const [display, setDisplay] = useState("");
    const [title, setTitle] = useState("");
    const [item, setItem] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [condition, setCondition] = useState("");
    const [subscribe, setSubscribe] = useState("");


    
  const postWants = async (e) => {
    e.preventDefault();
    try {
      let collectionRef = collection(db, "wantlist");
      const response = await addDoc(collectionRef, {
        title,
        item,
        category,
        description,
        condition,
        timeStamp: serverTimestamp(),
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Box
        position="relative"
        marginLeft="0px"
        marginRight="60px"
        paddingBottom="20px"
        paddingTop="20px"
      >
        <Container maxWidth="md">
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={postWants}
          >
            <FormControl>
              <FormLabel>Display Option</FormLabel>
              <RadioGroup
                onChange={(e) => setDisplay(e.target.value)}
                name="display"
              >
                <FormControlLabel
                  value={display}
                  control={<Radio />}
                  label="Show in Ads"
                />
                <FormControlLabel
                  value="don't show"
                  control={<Radio />}
                  label="Don't Show"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type={"text"}
              sx={{ margin: 3 }}
              placeholder="Title"
              variant="outlined"
            />

            <TextField
              name="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              type={"text"}
              sx={{ margin: 3 }}
              placeholder="Item"
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel>Select Category</InputLabel>
              <Select
                name="category"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"Electronics"}>Electronics</MenuItem>
                <MenuItem value={"Services"}>Services</MenuItem>
                <MenuItem value={"Pets"}>Pets</MenuItem>
                <MenuItem value={"Groceries"}>Groceries</MenuItem>
                <MenuItem value={"Automobiles"}>Automobiles</MenuItem>
                <MenuItem value={"Vacation Rentals"}>Vacation Rentals</MenuItem>
                <MenuItem value={"Computer"}>Computer</MenuItem>
                <MenuItem value={"Furniture"}>Furniture</MenuItem>
                <MenuItem value={"Home"}>Home</MenuItem>
                <MenuItem value={"Recreation"}>Recreation</MenuItem>
                <MenuItem value={"Garden"}>Garden</MenuItem>
                <MenuItem value={"Tickets"}>Tickets</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type={"text"}
              sx={{ margin: 3 }}
              placeholder="Description"
              variant="outlined"
            />

            <FormControl fullWidth>
              <InputLabel>Select Condition</InputLabel>
              <Select
                name="condition"
                value={condition}
                label="Condition"
                onChange={(e) => setCondition(e.target.value)}
              >
                <MenuItem value={"New"}>New</MenuItem>
                <MenuItem value={"Used-Like New"}>Used-Like New</MenuItem>
                <MenuItem value={"Used"}>Good</MenuItem>
                <MenuItem value={"Used"}>Fair</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl fullWidth>

            </FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => setSubscribe(e.target.value)} />
                }
                label="I confirmed that all information provided are true."
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
            <Button type="submit">Delete</Button>
            <Button type="submit">Edit</Button>
          </form>
        </Container>
      </Box>
    </div>
  );
};

export default Want;
