

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
  Input,
  Link,
  TextField,
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
//import WishList from './WishList';
import Test from "./Want";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { Wishlist } from "../WantList/Wishlist";

import { textAlign } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

import { addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

  

export const ImageCard = () => {
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;
  // const [ allUsers, setAllUser ] = useState([])

  const [postedAds, setSetAllPostedAds] = useState([]);
  const items = postedAds.filter((value) => value.item === "item");

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
 

  useEffect(() => {
    if (db && user) {
      const collectionRef = collection(db, "postedAds");
      const queryRef = query(collectionRef, orderBy("timeStamp"));

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

const itemData = [
  {
    img: "gs://hundiepay.appspot.com/",
  },
];  

  return (
    <Box>
      <ImageList variant="standard" sx={{ width: 400, height: 400 }} cols={3}>
        {itemData.map((image, item) => (
          <ImageListItem key={item.timeStamp} image={item.url}>
            <img src={item.url} alt={image.title} loading="lazy" />
            <ImageListItemBar position="below" title={item.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};