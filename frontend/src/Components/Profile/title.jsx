import { useReducer } from 'react'
import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
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
import WishList from "./WishList";
import Test from "../WantList/Want";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { Wishlist } from "../WantList/Wishlist";


export const ProductScreen = () => {
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
  
      const router = useReducer();
      const {title } = router.query;
      const product = postedAds.item.find((a) => a.title === title);
      if (!product) {
        return <div>Item Not Found</div>;
      }
      return (
        <div>
          <h1>{product.title}</h1>
        </div>
      );
}



