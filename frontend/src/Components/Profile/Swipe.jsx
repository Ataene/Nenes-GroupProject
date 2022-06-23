import React, { useState, useContext, useEffect } from "react";
import { CardActions, IconButton, Typography } from "@mui/material";
import TinderCard from "react-tinder-card";
import { Box, Container } from "@mui/system";

import { AuthContext } from "../../auth/AuthProvider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ShareIcon from "@mui/icons-material/Share";
import PreviewIcon from '@mui/icons-material/Preview';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';



const Swipe = () => {
  // const show = props.SwipCards;
  // const [data, setData ] = useState(show)

  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;
  const [postedAds, setSetAllPostedAds] = useState([]);

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

  const characters = postedAds;
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, url) => {
    console.log("removing: " + url);
    setLastDirection(direction);
  };

  const outOfFrame = (url) => {
    console.log(url + " left the screen!");
  };

  const card = {
    position: "absolute",
    backgroundColor: " #fff",
    width: "80vw",
    maxWidth: "360px",
    height: "600px",
    // boxShadow: "0px 0px 60px 0px rgba(0,0,0,0.30)",
    borderRadius: "20px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginBottom: "20px",
  };
  const infoText = {
    width: "100%",
    height: "28px",
    justifyContent: "center",
    display: "flex",
    color: "#fff",
    animationName: "popup",
    animationDuration: "800ms",
  };
  return (
    <>
      <Container>
        {/* <Typography>Swipable Products</Typography> */}
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
        <IconButton>
          <PersonIcon fontSize="large" style={{ color: "#ec5e6f" }} />
        </IconButton>
          <Typography variant="h3" style={{ color: "#ec5e6f" }}>Hundie</Typography>
        <IconButton>
          <ChatIcon fontSize="large" className="headerIcon" style={{ color: "#ec5e6f" }} />
        </IconButton>
        </Box>
        <Box
          style={{
            maxWidth: "100px",
            height: "200px",
            marginLeft: "400px",
            marginTop: "20px",
            marginBottom: "400px",
          }}
        >
          {characters.map((characters) => (
            <TinderCard
              style={{ position: "absolute" }}
              key={characters.timeStamp}
              onSwipe={(dir) => swiped(dir, characters.timeStamp)}
              onCardLeftScreen={() => outOfFrame(characters.url)}
            >
              <Box
                sx={{ backgroundImage: "url(" + characters.url + ")" }}
                style={card}
              >
                <Box
                  sx={{
                    display: "flex",
                    position: "relative",
                    marginTop: "450px",
                    flexDirection: "column",
                  }}
                >
                  <Typography sx={{ margin: "10px" }}>
                    {characters.title}
                  </Typography>
                  <CardActions disableSpacing>
                    <IconButton style={{ color: "#f5b748" }}>
                      <ReplayIcon fontSize="large" />
                    </IconButton>
                    <IconButton style={{ color: "#ec5e6f" }}>
                      <CloseIcon fontSize="large" />
                    </IconButton>
                    <IconButton style={{ color: "#62b4f9" }}>
                      <ShareIcon fontSize="large" />
                    </IconButton>
                    <IconButton style={{ color: "red" }}>
                      <FavoriteIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      style={{ color: "#915dd1" }}
                    >
                      <PreviewIcon fontSize="large" />
                    </IconButton>
                    <IconButton sx={{ color: "green" }}>
                      <ChatIcon fontSize="large" />
                    </IconButton>
                  </CardActions>
                </Box>
              </Box>
            </TinderCard>
          ))}
        </Box>
        {lastDirection ? (
          <Typography style={infoText}>{lastDirection}</Typography>
        ) : (
          <Typography stylex={infoText} />
        )}
      </Container>
    </>
  );
};

export default Swipe;
