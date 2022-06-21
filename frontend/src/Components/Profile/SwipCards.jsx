import React, { useState, useContext, useEffect } from "react";
import { CardActions, IconButton, Typography } from "@mui/material";
import TinderCard from "react-tinder-card";
import { Box, Container } from "@mui/system";

import { AuthContext  } from '../../auth/AuthProvider'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import Avatar from '@mui/material/Avatar';
import { FirebaseContext } from '../../auth/FirebaseProvider';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';

const SwipCards = () => {

  // const show = props.SwipCards;
  // const [data, setData ] = useState(show)

  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;
  const [ postedAds , setSetAllPostedAds ] = useState([])

  useEffect(() => {
    if(db && user){
      let collectionRef = collection(db, "postedAds");
      let queryRef = query(collectionRef, orderBy("timeStamp"));

      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if(querySnap.empty){
          console.log("Ads not found");
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return {...doc.data(), DOC_ID: doc.id}
          });
          setSetAllPostedAds(usersData)
        }
      })
      return unsubscribe;
    }
  }, [db, user]);

  const characters = postedAds;
  const[ lastDirection, setLastDirection ] = useState()

  const swiped = (direction, url) => {
    console.log('removing: ' + url)
    setLastDirection(direction)
  }

  const outOfFrame = (url) => {
    console.log(url + ' left the screen!')
  }

  const card = {
    position: "absolute",
    backgroundColor:" #fff",
    width: "80vw",
    maxWidth: "360px",
    height: "600px",
    // boxShadow: "0px 0px 60px 0px rgba(0,0,0,0.30)",
    borderRadius: "20px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginBottom: "20px"
  }
const infoText = {
  width: "100%",
  height: "28px",
  justifyContent: "center",
  display: "flex",
  color: "#fff",
  animationName: "popup",
  animationDuration: "800ms",
}
  return(
    <>
      <Container SwipCards={SwipCards}>
      <Typography>Swipable Products</Typography>
          <Box style={{width: "90vw", maxWidth: "500px", height: "800px", marginLeft: "290px", marginTop: "20px"}}>
          {characters.map((characters) => (
            <TinderCard 
                style={{position: "absolute"}} 
                key={characters.timeStamp} 
                onSwipe={(dir) => swiped(dir, characters.timeStamp)} 
                onCardLeftScreen={() => outOfFrame(characters.url)}>
            <Box 
                sx={{backgroundImage: 'url(' + characters.url + ')'}} 
                style={card}>
              <Typography sx={{margin: "20px"}}>{characters.title}</Typography>
              <CardActions disableSpacing sx={{display: "flex", position: "relative", marginTop: "500px"}}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon  sx={{color: "red"}}/>
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon  sx={{color: "blue"}}/>
              </IconButton>
              <IconButton aria-label="share">
                <ChatIcon  sx={{color: "green"}} />
              </IconButton>
            </CardActions>
            </Box>
            </TinderCard>
          ))}
          </Box>
          {lastDirection ? <Typography style={infoText}>{lastDirection}</Typography>  : <Typography stylex={infoText} />}
      </Container>
    </>
  )
};

export default SwipCards;