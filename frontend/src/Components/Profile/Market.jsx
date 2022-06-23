import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Link,
} from "@mui/material";
// import cardImage from "../../images/Alaf.jpg"
import { AuthContext } from "../../auth/AuthProvider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { addDoc, serverTimestamp } from "firebase/firestore";

const Market = (item) => {
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;

  const [postedAds, setSetAllPostedAds] = useState([]);

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const postWants = async (e) => {
    e.preventDefault();
    try {
      let collectionRef = collection(db, "wantlist");
      const response = await addDoc(collectionRef, {
        title,
        name,
        description,
        url,
        timeStamp: serverTimestamp(),
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

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

  return (
    <>
      <Container onClick={postWants}>
        <div>
          <h1>Items Up for Trade</h1>
          <Grid container spacing={1}>
            {postedAds.map((item) => (
              <Grid item md={3} key={item.timeStamp}>
                <Card
                  sx={{ height: "25rem", marginTop: "10px", margin: "10px" }}
                >
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: "red"[500] }}
                          aria-label="recipe"
                        >
                          R
                        </Avatar>
                      }
                      title={item.title}
                      onClick={(e) => setTitle(e.target.value)}
                      name="title"
                    />
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={item.url}
                        title={item.title}
                      ></CardMedia>
                      <CardContent>
                        <Typography>{item.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  <Box
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <Typography>{item.description}</Typography>
                    <Typography>Condition: {item.condition}</Typography>

                    <CardActions sx={{marginBottom: "20px"}}>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon sx={{color: "red"}} fontSize="large"/>
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon sx={{color: "#62b4f9" }} fontSize="large" />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ChatIcon sx={{color: "green"}} fontSize="large" />
                      </IconButton>
                      <IconButton aria-label="share" type="click">
                        <ListAltIcon sx={{color: "purple"}} fontSize="large" />
                      </IconButton>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
      <useDialogModal title={item.title} />
    </>
  );
};

export default Market;
