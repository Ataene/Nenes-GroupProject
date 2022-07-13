import React, { useContext, useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardActions,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  ListItemButton,
  Paper,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import ShareIcon from "@mui/icons-material/Share";
import ListAltIcon from "@mui/icons-material/ListAlt";
import useDialogModal from "../productdetail/useDialogModal";
import ItemDetail from "../productdetail/ProductDetail";
import { AuthContext } from "../../auth/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import OnlineStatus from "../Profile/OnlineStatus";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  getDocs,
  where,
  collectionGroup,
} from "firebase/firestore";

const Test = ({ handleClick, options }) => {
  const authContext = useContext(AuthContext);
  const { user, setUserToMessage } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [open, setOpen] = useState(false);

  const [postedAds, setPostedAds] = useState([]);
  const [rating, setRating] = useState([]);

  //useEffect to call db
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
        useDialogModal(ItemDetail);
    
    const SelectPostedAds = (items) => {
      setPostedAds(items);
      db
        .collection("cinemas")
        .doc(user.uid)
        .collection("rating")
        .get()
        .then((response) => {
          const fetchedRating = [];
          response.forEach((document) => {
            const fetchedRating = {
              id: document.id,
              ...document.data(),
            };
              fetchedRating.push(fetchedRating);
              console.log("rating", fetchedRating);
          });
          setRating(fetchedRating);
        })
        .catch((error) => {
          setError(error);
        });
    };  

   useEffect(() => {
     if (db && user) {
       let collectionRef = collection(db, "postedAds");
       let queryRef = query(collectionRef, orderBy("rating"), limit(4));
       const unsubscribe = onSnapshot(queryRef, (querySnap) => {
         if (querySnap.empty) {
         } else {
           let usersData = querySnap.docs.map((doc) => {
             return { ...doc.data(), DOC_ID: doc.id };
           });
           setPostedAds(usersData);
           setLoading(true);
         }
       });
       return unsubscribe;
     }
   }, [db, user]);   
     

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  if (!postedAds) {
    return <p className="mx-auto">Loading Data...</p>;
  }
  return (
    <>
      <Container
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box>
          <Grid container spacing={1}>
            {postedAds
              .filter((item) => item.owner !== user.uid)
              .map((item) => (
                <Grid item md={3} key={item.uid}>
                  <Paper
                    elevation={10}
                    sx={{ height: "33rem", marginTop: "10px", margin: "10px" }}
                    item={item}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                      <OnlineStatus uid={item.uid} />
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ height: "260px" }}
                      image={item.url}
                      title={item.title}
                      onClick={() => {
                        console.log(item);
                        showProductDetailDialog(item);
                      }}
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
};

export default Test;