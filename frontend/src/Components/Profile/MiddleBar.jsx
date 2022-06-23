import React, { useState } from "react";
import { Box, Container, Button } from "@mui/material";
import TopProfile from "./Market";
import DropSelections from "../DropSelections";
import Wish from "./WishList"
import Want from "../WantList/Want";
import ProductScreen from '../ProductPage/Product';
import WishList from "./WishList";
import Market from "./Market";
import Swipe from "./Swipe";
import Settings from "./Settings";

const MiddleBar = () => {
  const [active, setActive] = useState("market");
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <Box sx={{ flex: "8.5", backgroundColor: "#B8F1B0" }}>
      <Container>
        <Box sx={{ justifyContent: "center", display: "flex"}}>
          <Button
            onClick={() => setActive("market")}
            sx={{ margin: "5px" }}
            variant="outlined"
            size="large"
          >
            Market
          </Button>
          <Button
            onClick={() => setActive("swipe")}
            sx={{ margin: "5px" }}
            variant="outlined"
            size="large"
          >
            Swipe
          </Button>
          <Button
            onClick={() => setActive("settings")}
            sx={{ margin: "5px" }}
            variant="outlined"
            size="large"
          >
            Settings
          </Button>
          <Button
            onClick={() => setActive("wantList")}
            sx={{ margin: "5px" }}
            variant="outlined"
            size="large"
          >
            Want List
          </Button>
          <Button
            onClick={handleModalOpen}
            sx={{ margin: "5px" }}
            variant="outlined"
            size="large"
          >
            Post Ad
          </Button>
          {modalVisible && (
            <DropSelections
              visible={modalVisible}
              onCancel={handleCancel}
              sx={{ margin: "5px" }}
              variant="outlined"
              size="large"
            />
          )}
        </Box>
        <hr />
        <>
          {active === "market" && <Market />}
          {active === "swipe" && <Swipe />}
          {active === "wantList" && <Want />}
          {active === "settings" && <Settings />}
        </>
      </Container>
    </Box>
  );
};

export default MiddleBar;
