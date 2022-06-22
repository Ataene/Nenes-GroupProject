
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
//import Layout from "../../components/Layout";
import useStyles from "./styles";
//import Product from "../../models/Product";
//import db from "../../utils/db";

import React, { useContext, useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent';
import { CardActions, CardHeader, CardMedia, Container, IconButton } from '@mui/material';
// import cardImage from "../../images/Alaf.jpg"
import { AuthContext  } from '../../auth/AuthProvider'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import Avatar from '@mui/material/Avatar';
import { FirebaseContext } from '../../auth/FirebaseProvider';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import WishList from "../Profile/WishList";
import Test from '../WantList/Test';
import { Box } from "@mui/system";

export default function ProductScreen(props) {

  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;
  // const [ allUsers, setAllUser ] = useState([])
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

  const { product } = props;
  const classes = useStyles();
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <>
      <Box>
        <ImageList variant="standard" sx={{ width: 400, height: 400 }} cols={3}>
          {postedAds.map((image, index) => (
            <ImageListItem key={index}>
              <img image={image.url} key={index.timeStamp} loading="lazy" />
              <ImageListItemBar
                position="below"
                subtitle={<span>Michael</span>}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}
