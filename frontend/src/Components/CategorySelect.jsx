import React, { useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { Button, Modal, TextField, Chip,Select, FormControl, MenuItem, InputLabel, OutlinedInput, Box, Typography } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FirebaseContext } from "../auth/FirebaseProvider";
import ImageUpload from "./ImageUpload";
import { useNavigate } from "react-router-dom";

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

function getStyles(Category, CategoryName, theme) {
  return {
    fontWeight:
      CategoryName.indexOf(Category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const CategorySelect = ({ visible, onCancel }) => {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const ModalStyle = {
    backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
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
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [CategoryName, setCategoryName] = useState([]);

  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const postAds = async (e) => {
    e.preventDefault();
    try {
      let collectionRef = collection(db, "postedAds");
      const response = await addDoc(collectionRef, {
        CategoryName,
        title,
        condition,
        description,
        timeStamp: serverTimestamp(),
      });
      console.log(response);
      navigate("/profile");
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
          <form onSubmit={postAds}>
          <Typography variant="h3" sx={{color: "green", marginLeft: "100px", marginTop: "10px"}}>Post Your Ads</Typography>
            <FormControl sx={{ m: 10, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={CategoryName}
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
                    style={getStyles(Category, CategoryName, theme)}
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
              <ImageUpload />
              <Button
                sx={{
                  width: "30rem",
                  margin: "2px",
                  backgroundColor: "#005555",
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
