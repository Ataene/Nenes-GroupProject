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

  const [postedAds, setSetAllPostedAds] = useState([]);

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
            sx={{ margin: 1 }}
            color="success"
            variant="contained"
            // className={ative ? `button_Style online` : `button_Style offline`}
            onClick={() => setActive("WishList")}
          >
            Wishlist
          </Button>
          <Button
            sx={{ margin: 1 }}
            color="success"
            variant="contained"
            onClick={() => setActive("Traded")}
          >
            Traded
          </Button>
          <Button
            sx={{ margin: 1 }}
            color="success"
            variant="contained"
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
      </div>
    </>
  );
};
export default MyList;
