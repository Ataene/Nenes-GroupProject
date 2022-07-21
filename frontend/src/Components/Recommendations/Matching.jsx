import React, { useState, useContext, useEffect } from "react";
import { CardActions, IconButton, Typography } from "@mui/material";
import TinderCard from "react-tinder-card";
import { Box } from "@mui/system";
import { AuthContext } from "../../auth/AuthProvider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { onSnapshot, orderBy, query, collection, where } from "firebase/firestore";
import ShareIcon from "@mui/icons-material/Share";
import PreviewIcon from "@mui/icons-material/Preview";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";

const Matching = () => {
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;
  // console.log("888888", user)
  const [postedAds, setPostedAds] = useState([]);
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    if(db){
      let collectionRef = collection(db, "postedAds");
      let queryRef = query(collectionRef, orderBy("condition", "desc"))
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setPostedAds(items);
      });
      return unsubscribe;
    }
  }, [db])
  
  let characters = postedAds;
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, url) => {
    console.log("removing: " + url);
    setLastDirection(direction);
  };
  const outOfFrame = (url) => {
    console.log(url + " left the screen!");
  };
  useEffect(() => {
    const findWantItem = () => {
      //character
        let myAds = characters.filter((postedAd) =>{
            return postedAd.owner === user.uid;
        });
        console.log("333", myAds)
        let myWantList =  myAds.map((ad) => {
          return ad.want.replace(/\s/g,"").toLowerCase();
        })
          setCharacter(myWantList);
          }
findWantItem();
  }, [postedAds])

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
  //console.log("555", character)
  return (
    
    <>
        <Box
          style={{
            maxWidth: "100px",
            height: "200px",
            marginLeft: "400px",
            marginTop: "20px",
            marginBottom: "400px",
          }}
        >
          {characters.filter((item) => item.uid !==user.uid).filter((item) => character.includes(item.title.replace(/\s/g,"").toLowerCase()))
          .map((characterItem) => (
            <TinderCard
              style={{ position: "absolute" }}
              key={characterItem.timeStamp}
              onSwipe={(dir) => swiped(dir, characterItem.timeStamp)}
              onCardLeftScreen={() => outOfFrame(characterItem.url)}
            >
              <Box
                sx={{ backgroundImage: "url(" + characterItem.url + ")" }}
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
                    {characterItem.title}
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
                    <IconButton style={{ color: "#915dd1" }}>
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
    </>
  );
};

export default Matching;
