import { IconButton, Typography, Container } from "@mui/material";
import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from '@mui/icons-material/Person';
import TinderCards from "./TinderCards";

const ProductList = () => {

  const productStyles = {
    display: "flex",
    flexDirection: "row",
    alignItem: "center", 
    justifyContent: "space-between",
    marginBottom: "50px",
  }
  return (
    <>
      <Container style={productStyles}>
        <IconButton>
          <PersonIcon fontSize="large" />
        </IconButton>
          <Typography variant="h3">HundiePay</Typography>
        <IconButton>
          <ChatIcon fontSize="large" className="headerIcon" />
        </IconButton>
      </Container>
      <Container>
        <TinderCards />
      </Container>
    </>
  );
};

export default ProductList;
