import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import postalImage from "../../images/computer.png";
import { AuthContext  } from '../../auth/AuthProvider';

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

export default function NestedModal() {
  const [open, setOpen] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/wishlist");
  };

  return (
    <div>
      <Button onClick={handleOpen}>Trade Preferences</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <form onSubmit={handleSubmit}>
            <text>
              Enter your postal code to see potential trades near you!
            </text>
            <TextField
              placeholder="Enter your Postal Code"
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
