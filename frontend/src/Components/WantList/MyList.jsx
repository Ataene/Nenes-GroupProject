import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import Wishlist from "./Wishlist";
import Traded from "./Traded";
import Add from "./Add";
import "../font-awesome/css/all.min.css";
import "../WantList/WishList.css";
import { GlobalProvider } from "./GlobalState";
import { AuthContext } from "../../auth/AuthProvider";
import { WantContext } from "../../providers/WantProvider";
import { TradeContext } from "../../providers/TradedProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Box } from "@mui/system";
import MyPost from "./MyPost";

const MyList = () => {
  const [active, setActive] = useState("Wishlist");

  //Auth and DB Context
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const wantContext = useContext(WantContext);
  const tradeContext = useContext(TradeContext);

  const db = fbContext.db;
  const { user } = authContext;
  const { addToWantList, removeFromWantList } = wantContext;
  const { addToTraded, removeFromTraded } = tradeContext;

  const [postedAds, setPostedAds] = useState([]);

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
          setPostedAds(usersData);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);

  //Handle add to WantList
  const handleClick = (item) => {
    addToWantList(item);
  };

  //Handle add to Traded
  const handleClickTraded = (item) => {
    addToTraded(item);
  };

  //Handle Remove from wantList
  const removeItem = (removedItem) => {
    removeFromWantList(removedItem);
  };

  return (
    <>
      <div>
        <Box>
          <Container sx={{display: "flex", justifyContent: "center"}}>
          <Button
            sx={{ margin: 1, color: "green" }}
            color="success"
            variant="outlined"
            style={{ background: active === "WishList" ? "#F4E06D" : "#B8F1B0" }}
            onClick={() => setActive("WishList")}
          >
            Wishlist
          </Button>
          <Button
            sx={{ margin: 1 }}
            color="success"
            variant="outlined"
            style={{ background: active === "Mypost" ? "#F4E06D" : "#B8F1B0" }}
            onClick={() => setActive("Mypost")}
          >
            My Post
          </Button>
          <Button
            sx={{ margin: 1 }}
            color="success"
            variant="outlined"
            style={{ background: active === "Traded" ? "#F4E06D" : "#B8F1B0" }}
            onClick={() => setActive("Traded")}
          >
            Traded
          </Button>
          <Button
            sx={{ margin: 1 }}
            color="success"
            variant="outlined"
            style={{ background: active === "Add" ? "#F4E06D" : "#B8F1B0" }}
            onClick={() => setActive("Add")}
          >
          Add
          </Button>
          </Container>
        </Box>
      </div>
      <div>
        {active === "WishList" && (<Wishlist title="WishList" handleClick={handleClickTraded} />)}
        {active === "Traded" && (<Traded title="Traded" handleClick={handleClickTraded} />)}
        {active === "Add" && <Add title="Add" handleClick={handleClick} />}
        {active === "Mypost" && <MyPost title="Add" handleClick={handleClick} />}
      </div>
    </>
  );
};
export default MyList;
