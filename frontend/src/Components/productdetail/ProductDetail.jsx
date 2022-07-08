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
  import {Link, CardHeader, Button,
  Rating,
} from "@mui/material";
// import cardImage from "../../images/Alaf.jpg"
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
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


// function SlideTransition(props) {
//   return <Slide direction="down" {...props} />;
// }

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
  console.log("options", options)
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
      //TransitionComponent={SlideTransition}
      variant="permanent"
      open={open}
      fullScreen
    >
      <DialogTitle sx={{ background: Colors.secondary }}>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          {item.title}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card
            sx={{ maxWidth: 800, height: 500 }}
            onClick={() => console.log(item)}
          >
            <Grid className="details" container spacing={1}>
              <Grid
                item
                md={4}
                key={item.uid}
                //onClick={(e) => setPostedAds(item)}
                onClick={(e) => console.log(item)}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "red"[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                />
                <CardMedia
                  component="img"
                  sx={{ height: "350px" }}
                  image={item.url}
                  title={item.title}
                  //onClick={() => setPostedAds(item)}
                  onClick={() => console.log(item)}
                ></CardMedia>
              </Grid>
              <Grid item md={4} xs={6}>
                <List>
                  <ListItem>
                    <Typography component="h4" variant="h6">
                      {item.title}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>item: {item.displayName}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Category: {item.category}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Brand: {item.brand}</Typography>
                  </ListItem>
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
                </List>
              </Grid>
              <Grid item md={4} xs={12}>
                <Card
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "420px",
                  }}
                >
                  <List>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>I Want:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>{item.want}</Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Status</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {item.countInStock > 0 ? "In stock" : "Unavailable"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon sx={{ color: "red" }} />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon sx={{ color: "#62b4f9" }} />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ChatIcon sx={{ color: "green" }} />
                    </IconButton>

                    <ListItem>
                      <Button fullWidth variant="contained" color="primary">
                        Add to My List
                      </Button>
                    </ListItem>
                    <RatingComponent productDetail={item} />
                    <ListItem></ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </DialogContent>
      <Footer />
    </Dialog>
  );
}

export default ItemDetail;
