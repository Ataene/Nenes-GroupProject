import React, { useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { Button, Modal, TextField, Chip,Select, FormControl, MenuItem, InputLabel, OutlinedInput, Box  } from "@mui/material";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { FirebaseContext } from "../auth/FirebaseProvider";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import ModalState from './ModalState';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Category = [
  "Electronics",
  "Services",
  "Pets",
  "Livestock",
  "Groceries",
  "Automobiles",
  "Vacation Rentals",
  "Computer",
  "Furnitures",
  "Home",
  "Fashion",
  "Recreation",
  "Garden",
  "Tickets",
];

function getStyles(Category, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(Category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const CategorySelect = ({ visible, onCancel }) => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const ModalStyle = {
    backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 600,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 30,
    borderRadius: "5px",
  };

  const [title, setTitle] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [progress, setProgress] = useState();

  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  //   const store = fb.fbContext.store;

  const postAds = async (e) => {
    e.preventDefault();
    try {
      let collectionRef = collection(db, "postedAds");
      const response = await addDoc(collectionRef, {
        title,
        condition,
        description,
        timeStamp: serverTimestamp(),
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal
        open={visible}
        onClose={onCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={ModalStyle}>
          <form>
            <FormControl sx={{ m: 6, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.9 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {Category.map((Category) => (
                  <MenuItem
                    key={Category}
                    value={Category}
                    style={getStyles(Category, personName, theme)}
                  >
                    {Category}
                  </MenuItem>
                ))}
              </Select>
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
              <Button
                sx={{
                  width: "30rem",
                  margin: "2px",
                  backgroundColor: "green",
                  color: "white",
                }}
                type="submit"
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CategorySelect;
