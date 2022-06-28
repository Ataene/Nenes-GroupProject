import CloseIcon from "@mui/icons-material/Close";
import {
    CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
} from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../styles/theme";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../../auth/AuthProvider";

import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  CardHeader,
  Container,
  Link,
} from "@mui/material";
// import cardImage from "../../images/Alaf.jpg"
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import { addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Image } from "@mui/icons-material";



function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
}

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

function ItemDetail({ open, onClose, item }) {
  const theme = useTheme();

  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;
  const [title, setTitle] = useState("");
  // const [ allUsers, setAllUser ] = useState([])

  const [postedAds, setPostedAds] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

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

  return (
    <Dialog
      TransitionComponent={SlideTransition}
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
          Item Title
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          {postedAds
            .filter((item) => item.uid !== user.uid)
            .map((item) => (
              <Grid item md={3} key={item.timeStamp}>
                <Card
                  sx={{ height: "33rem", marginTop: "10px", margin: "10px" }}
                  item={item}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: "red"[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    title={item.title}
                    name="title"
                  />
                  <CardMedia
                    component="img"
                    sx={{ height: "280px" }}
                    image={item.url}
                    title={item.title}
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
                      <IconButton aria-label="share">
                        <ChatIcon sx={{ color: "green" }} />
                      </IconButton>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default ItemDetail;
