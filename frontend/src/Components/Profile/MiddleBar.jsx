import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Button } from "@mui/material";
import DropSelections from "../DropSelections";
import MyList from "../WantList/MyList";
import Market from "./Market";
import Swipe from "./Swipe";
import Profile from "./Profile";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";
import { WantContext } from "../../providers/WantProvider";
import { ItemContext } from "../../providers/ItemDetailProvider";
import ProductDetails from "../productdetail/ProductDetail";
import Matching from "../Recommendations/Matching";
import CountingEffect from "./CountingEffect";

const MiddleBar = () => {
  //Auth and DB Context
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const wantContext = useContext(WantContext);
  const itemContext = useContext(ItemContext);

  const db = fbContext.db;
  const { user } = authContext;
  const { addToWantList, removeFromWantList } = wantContext;
  const { showInDetailedPage } = itemContext;

  const [active, setActive] = useState("market");
  const [modalVisible, setModalVisible] = useState(false);
  const [postedAds, setPostedAds] = useState([]);

  //useEffect to call db
  const [loading, setLoading] = useState(false);
  //useEffect to call db
  useEffect(() => {
    if (db && user) {
      setLoading(true);
      let collectionRef = collection(db, "postedAds");
      let queryRef = query(collectionRef, orderBy("timeStamp"));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return { ...doc.data(), DOC_ID: doc.id };
          });
          setPostedAds(usersData);
          setLoading(false);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);

  //Users Online Status
  const [status, setStatus] = useState([]);
  useEffect(() => {
    if (db && user) {
      let collectionRef = collection(db, "users");
      let queryRef = query(collectionRef, orderBy("uid"));
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        let newStatus = [];
        querySnapshot.forEach((doc) => {
          status.push(doc.data());
        });
        setStatus(status);
      });
      return unsubscribe;
    }
  }, [db, user]);

  //Handle add to WantList
  const handleClick = (item) => {
    addToWantList(item);
  };
  //Handle Remove from wantList
  const removeItem = (removedItem) => {
    removeFromWantList(removedItem);
  };

  const handleModalOpen = () => {
    setModalVisible(true);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };

  const showProductDetailDialog = (item) => {
    showInDetailedPage(item);
  };
  return (
    <Box sx={{ flex: "8.5", backgroundColor: "#B8F1B0" }}>
      <Container>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Button
            // className={active ? `user_status online` : `user_status offline`}
            onClick={() => setActive("market")}
            sx={{ margin: "5px", color: "green" }}
            style={{ background: active === "market" ? "yellow" : "#B8F1B0" }}
            variant="outlined"
            color="success"
            size="large"
          >
            Market
          </Button>
          <Button
            onClick={() => setActive("swipe")}
            sx={{ margin: "5px", color: "green" }}
            style={{ background: active === "swipe" ? "yellow" : "#B8F1B0" }}
            variant="outlined"
            color="success"
            size="large"
          >
            Swipe
          </Button>

          <Button
            onClick={() => setActive("matching")}
            style={{ background: active === "matching" ? "yellow" : "#B8F1B0" }}
            sx={{ margin: "5px", color: "green" }}
            variant="outlined"
            color="success"
            size="large"
          >
            Matching
          </Button>

          <Button
            onClick={() => setActive("profile")}
            style={{ background: active === "profile" ? "yellow" : "#B8F1B0" }}
            sx={{ margin: "5px", color: "green" }}
            variant="outlined"
            color="success"
            size="large"
          >
            Profile
          </Button>
          <Button
            onClick={() => setActive("myList")}
            style={{ background: active === "myList" ? "yellow" : "#B8F1B0" }}
            sx={{ margin: "5px", color: "green" }}
            variant="outlined"
            color="success"
            size="large"
          >
            My List
          </Button>
          <Button
            onClick={handleModalOpen}
            sx={{ margin: "5px", color: "green" }}
            variant="outlined"
            color="success"
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
            color="success"
              size="large"
            />
          )}
        </Box>
        <hr />
        <CountingEffect />
        <>
          {active === "market" && (
            <Market
              postedAds={postedAds}
              handleClick={handleClick}
              loading={loading}
              Click={showProductDetailDialog}
            />
          )}
          {active === "swipe" && <Swipe />}
          {active === "myList" && <MyList />}
          {active === "profile" && <Profile />}
          {active === "productdetail" && <ProductDetails />}
          {active === "matching" && <Matching />}
        </>
      </Container>
    </Box>
  );
};

export default MiddleBar;
