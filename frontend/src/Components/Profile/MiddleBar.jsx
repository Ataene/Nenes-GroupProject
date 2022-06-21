import React, { useState } from "react";
import { Box, Container, Button } from "@mui/material";
// import Feeds from '../Feeds';
import TopProfile from "./TopProfile";
import Feeds from '../Feeds';
import DropSelections from "../DropSelections";
import Wish from "./WishList"
import Test from "../WantList/Test";
import SwipCards from "./SwipCards";
import WishList from "./WishList";
import Market from "./Market";
import Settings from "./Settings";

const MiddleBar = () => {

  const [active, setActive] = useState("topProfile");
  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  
  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <Box sx={{ flex: "8.5", backgroundColor: "#FFE6E6" }}>
      <Container>
        <Box sx={{ margin: "5px" }}>
          <Button
            onClick={() => setActive("swipCards")}
            sx={{ margin: "5px" }}
            variant="outlined"
            size="large"
          >
            SwipCards
          </Button>
          <Button
            onClick={() => setActive("topProfile")}
            sx={{ margin: "5px" }}
            variant="outlined"
            size="large"
          >
            TopProfile
          </Button>
          <Button
            onClick={() => setActive("market")}
            sx={{ margin: "5px" }}
            variant="outlined"
            size="large"
          >
            Market
          </Button>
          <Button
            onClick={() => setActive("wishList")}
            sx={{ margin: "5px" }}
            variant="outlined"
            size="large"
          >
            WishList
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
            open={open}
            onClick={() => setOpen(false)}
            variant="outlined"
            size="large"
            href="/test"
          >
            Want List
          </Button>
          <Button onClick={handleModalOpen} sx={{ margin: "5px" }} variant="outlined" size="large">Post Ad</Button>
        {modalVisible && ( <DropSelections visible={modalVisible} onCancel={handleCancel} sx={{ margin: "5px" }}variant="outlined" size="large" />)}
        </Box>
        <hr />
        <>
          {active === "topProfile" && <TopProfile />}
          {active === "swipCards" && <SwipCards />}
          {active === "wishList" && <WishList />}
          {active === "market" && <Market />}
          {active === "test" && <Test />}
          {active === "settings" && <Settings />}
        </>
        {/* <Feeds /> */}
      </Container>
    </Box>
  );
};

export default MiddleBar;
