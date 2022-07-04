import React, { useState, useEffect, Fragment, useContext } from "react";
import firebase from "./firebase";
import { AuthContext } from "./auth/Auth";
import { Avatar, Box, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, Paper, Typography } from "@mui/material";
import OnlineStatus from "../Profile/OnlineStatus";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ItemDetail from ".././productdetail/ProductDetail";
import { query, where } from "firebase/firestore";  

function MostPopularTrade() {
  const { user } = useContext(AuthContext);
  const [postedAds, setPostedAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(null);

  const ref = firebase.firestore().collection("postedAds");

  //REALTIME GET FUNCTION
  function getPostedAds() {
    setLoading(true);
    ref
      //.where('owner', '==', currentUserId)
      .where('item', '==', 'rating') // 
      .where('rating', '>=', 4)    // 
      .orderBy('owner', 'desc')
      .limit(4)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setPostedAds(items);
        setLoading(false);
      });
  }

  useEffect(() => {
     getPostedAds();
    // eslint-disable-next-line
  }, []);

     const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
       useDialogModal(ItemDetail);

  return (
    <>
      <Container>
        <Box>
          <Grid container spacing={1}>
            {postedAds
              .filter((item) => item.uid !== user.uid)
              .map((item) => (
                <Grid item md={3} key={item.uid}>
                  <Paper
                    elevation={10}
                    sx={{ height: "33rem", marginTop: "10px", margin: "10px" }}
                    item={item}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: "red"[500] }}
                          aria-label="recipe"
                          src={item.userPicture}
                        />
                      }
                      title={item.displayName}
                      name="title"
                    />
                    <OnlineStatus />
                    <CardMedia
                      component="img"
                      sx={{ height: "280px" }}
                      image={item.url}
                      title={item.title}
                      onClick={() => showProductDetailDialog()}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{item.name}</Typography>
                    </CardContent>
                    <Box
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography>{item.description}</Typography>
                      <Typography>Condition: {item.condition}</Typography>
                      <Typography>I want : {item.want}</Typography>
                      <CardActions sx={{ marginBottom: "20px" }}>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon sx={{ color: "red" }} />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon sx={{ color: "#62b4f9" }} />
                        </IconButton>
                        <IconButton aria-label="chat">
                          <ChatIcon
                            sx={{ color: "green" }}
                            onClick={() => setUserToMessage(item.uid)}
                          />
                        </IconButton>
                        <IconButton aria-label="share" type="click">
                          <ListAltIcon
                            sx={{ color: "purple" }}
                            onClick={() => handleClick(item)}
                          />
                        </IconButton>
                        <ProductDetailDialog item={item} />
                      </CardActions>
                    </Box>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default MostPopularTrade;
