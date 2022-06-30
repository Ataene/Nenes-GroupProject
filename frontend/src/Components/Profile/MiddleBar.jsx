import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Button } from "@mui/material";
import DropSelections from "../DropSelections";
import Wish from "./WishList"
import Want from "../WantList/Want";
import ProductScreen from '../ProductPage/Product';
import WishList from "./WishList";
import Market from "./Market";
import Swipe from "./Swipe";
import Settings from "./Settings";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";

import { WantContext } from "../../providers/WantProvider";

const MiddleBar = () => {

  //Auth and DB Context
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const wantContext = useContext(WantContext);

  const db = fbContext.db;
  const { user } = authContext;
  const { addToWantList, removeFromWantList } = wantContext;

  const [active, setActive] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [postedAds, setSetAllPostedAds] = useState([]);
  const [loading, setLoading] = useState(false);
//useEffect to call db
  useEffect(() => {
    if (db && user) {
      let collectionRef = collection(db, "postedAds");
      let queryRef = query(collectionRef, orderBy("timeStamp"));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("Ads not found");
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return { ...doc.data(), DOC_ID: doc.id };
          });
          setSetAllPostedAds(usersData);
          setLoading(true)
        }
      });
      return unsubscribe;
    }
  }, [db, user]);
  //Handle add to WantList
  const handleClick = (item) => {
    addToWantList(item)
  }
  //Handle Remove from wantList
  const removeItem = (removedItem) => {
    removeFromWantList(removedItem)
  }

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
          {active === "market" && <Market  postedAds ={postedAds}  handleClick={handleClick} loading={loading}/>}
          {active === "swipe" && <Swipe />}
          {active === "wantList" && <Want />}
          {active === "settings" && <Settings />}
        </>
      </Container>
    </Box>
  );
};

export default MiddleBar;
