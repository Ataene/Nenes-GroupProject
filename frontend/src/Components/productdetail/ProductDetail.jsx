import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Slide,
} from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../styles/theme";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../../auth/AuthProvider";
import Footer from "../../Components/footer/index";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Link, CardHeader, Button, Rating } from "@mui/material";
// import cardImage from "../../images/Alaf.jpg"
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {
  addDoc,
  serverTimestamp,
  updateDoc,
  getFirestore,
  collection,
  onSnapshot,
  orderBy,
  query,
  getDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Image, Rowing } from "@mui/icons-material";
import { useStateValue } from "../../providers/StateProvider";
import { doc, setDoc } from "firebase/firestore";
import { Divider, Input, List, ListItem } from "@material-ui/core";
import { FaStar } from "react-icons/fa";

import { useParams } from "react-router-dom";
import RatingComponent from "../Recommendations/RatingComponent";
import useDialogModal from "./useDialogModal";
import PostComment from "../Profile/PostComment";
//import SimilarItems from "../Recommendations/SimilarItems";
import MostPopularTrade from "../Recommendations/RecommendationStrategies/ContentBased2";
import ContentBased2 from "../Recommendations/RecommendationStrategies/ContentBased2";
import SimilarItems from "../Recommendations/SimilarItems";
import Test from "../Recommendations/testSimilar";
import TestContentSimilar from "../Recommendations/testContentSimilar";


const ItemDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
}));

const ItemDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
}));

function ItemDetail({ open, options, onClose, item }) {
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;

  const [postedAds, setPostedAds] = useState([]);

  const [loading, setLoading] = useState("");
  const [selectedItem, setSelectedItem] = useState(options);

  // const nameOfItem = useParams();

  //   useEffect(() => {
  //     postedAds.forEach((item) => {
  //       if (postedAds.item === nameOfItem.name) {
  //         setSelectedItem(item);
  //       }
  //     });
  //   }, [postedAds]);

  //   async function handleChange(name, currStatus) {
  //     setPostedAds([
  //       ...postedAds.filter((val) => val.name !== name),
  //       { name, status: currStatus },
  //     ]);
  //     const postedAdsRef = doc(db, "postedAds", user.uid);
  //     await updateDoc(postedAdsRef, {
  //       rating: currStatus,
  //     });
  // }

  console.log("postedAds", postedAds);

  return (
    <Dialog
      style={{ outline: "2px solid red" }}
      //TransitionComponent={SlideTransition}
      // variant="permanent"
      open={open}
      fullScreen
    >
      <DialogTitle sx={{ background: Colors.secondary }}>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Link to="/dashboard">
            <Typography sx={{ fontSize: 20 }}>Hundie</Typography>
          </Link>
          {item.title}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ marginTop: "20px", overflow: "unset" }}>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card
            sx={{ width: "max-content", height: "max-content" }}
            onClick={() => console.log(item)}
          >
            <Grid className="details" container spacing={1}>
              <Box
                // sx={{ width: 800 }}
                item
                md={4}
                key={item.uid}
                //onClick={(e) => setPostedAds(item)}
                onClick={(e) => console.log(item)}
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
                />
                <CardMedia
                  component="img"
                  sx={{
                    height: "550px",
                    width: "450px",
                    margin: "10px",
                    borderRadius: "20px",
                  }}
                  image={item.url}
                  title={item.title}
                  //onClick={() => setPostedAds(item)}
                  onClick={() => console.log(item)}
                />
              </Box>
              <Box item md={4} xs={6}>
                <List style={{ marginLeft: "30px", marginTop: "50px" }}>
                  <ListItem>
                    <Typography component="h4" variant="h6">
                      {item.title}
                    </Typography>
                  </ListItem>
                  {/* <ListItem>
                    <Typography>Owner: {item.displayName}</Typography>
                  </ListItem> */}
                  <ListItem>
                    <Typography>Category: {item.category}</Typography>
                  </ListItem>
                  {/* <ListItem>
                    <Typography>Brand: {item.brand}</Typography>
                  </ListItem> */}
                  <ListItem>
                    <Typography>Quantity: {item.quantity}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Rating: {item.rating} stars ({item.numReviews} reviews)
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography> Condition: {item.condition}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography> Description: {item.description}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Owner Want: {item.want}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Status: {item.quantity > 0 ? "In stock" : "Unavailable"}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button fullWidth variant="contained" color="primary">
                      Add to My List
                    </Button>
                  </ListItem>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon sx={{ color: "red" }} />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon sx={{ color: "#62b4f9" }} />
                  </IconButton>
                  <IconButton aria-label="chat">
                    <ChatIcon
                      sx={{ color: "green" }}
                      // onClick={() => setUserToMessage(item.uid)}
                    />
                  </IconButton>
                  <IconButton aria-label="share" type="click">
                    <ListAltIcon
                      sx={{ color: "purple" }}
                      // onClick={() => handleClick(item)}
                    />
                  </IconButton>
                  <RatingComponent productDetail={item} />
                </List>
              </Box>
            </Grid>

            <PostComment />
          </Card>

          
          <Box
            display="flex"
            justifyContent="center"
            sx={{ p: 4, fontFamily: "Montserrat" }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "Montserrat", color: "green" }}
            >
              Hi {item.displayName}, Here Are Similar Items You Can Trade
            </Typography>
          </Box>
          <TestContentSimilar />
          <Test />
          {/*<ContentBased2 />*/}
          <Box
            display="flex"
            justifyContent="center"
            sx={{ p: 4, fontFamily: "Montserrat" }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "Montserrat", color: "green" }}
            >
              Most Popular Trades on Huddie
            </Typography>
          </Box>
          {/*<SimilarItems />*/}
          <MostPopularTrade />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ItemDetail;
