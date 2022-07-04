import { IconButton, Typography, Container } from "@mui/material";
import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import TinderCards from "./TinderCards";

const ProductList = () => {
  const productStyles = {
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "space-between",
    marginBottom: "50px",
  };
  return (
    <>
      <Container style={productStyles}>
        <div
          class="w-full h-screen
        bg-[url('https://www.kindacode.com/wp-content/uploads/2022/06/hero-image-example.jpeg')]
        bg-cover bg-center"
        >
          <div class="w-full h-full flex flex-col justify-center items-center backdrop-blur-lg">
            <IconButton>
              <PersonIcon fontSize="large" />
            </IconButton>
            <Typography variant="h3">HundiePay</Typography>
            <IconButton>
              <ChatIcon fontSize="large" className="headerIcon" />
            </IconButton>
          </div>
        </div>
      </Container>
      <Container>
        <TinderCards />
      </Container>
    </>
  );
};

export default ProductList;
