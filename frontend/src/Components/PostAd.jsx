import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const PostAdPage = () => {
  const [open, setOpen] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");


  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/postad");
  };

  const FileUploader = () => {
    const handleFileInput = () => {};
  };

  return (
    <div>
      <Button onClick={handleOpen}>Post your ad!</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ width: 400 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="Enter your Postal Code"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <TextField
              placeholder="Enter the product category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <TextField
              placeholder="Enter the condition of the item"
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
            <TextField
              placeholder="Enter the description of the item"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <input
              className="file-uploader"
              type="file"
              onChange={handleFileInput}
              placeholder="Upload a picture of your item"
              value={picture}
            /> */}

            <div></div>
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default PostAdPage;
