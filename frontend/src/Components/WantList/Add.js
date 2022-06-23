
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
//import WishList from './WishList';
import Test from "./Want";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { Wishlist } from "../WantList/Wishlist";

import { textAlign } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";




export const Add = () => {

//    const [postedAds, setSetAllPostedAds] = useState([]);
//    const [query, setQuery] = useState("");
//    const [results, setResults] = useState([]);

//    const onChange = (e) => {
//        e.preventDefault();

//        setQuery(e.target.value);

//        const authContext = useContext(AuthContext);
//        const fbContext = useContext(FirebaseContext);
//        const db = fbContext.db;
//        const { user } = authContext;
        // const [ allUsers, setAllUser ] = useState([])
  return (
      <div className="add-page">
          <div className="container">
              <div className="add-content">
                  <div className="input-wrapper">
                      <input type="text" placeholder="Search for a items..."
                          value={query}

                      />
                  </div>
              </div>
          </div>
      </div>
  )
}
