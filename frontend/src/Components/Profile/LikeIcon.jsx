import React, { useContext, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActions, Card, CardHeader, CardMedia, Container, Grid, IconButton, ListItemButton, Paper, Tooltip, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import ShareIcon from "@mui/icons-material/Share";
import ListAltIcon from "@mui/icons-material/ListAlt";
import useDialogModal from "../productdetail/useDialogModal";
import ItemDetail from "../productdetail/ProductDetail";
import { AuthContext } from "../../auth/AuthProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import OnlineStatus from "./OnlineStatus";
import CircleLoader from "react-spinners/CircleLoader";
//import Likes from "./Likes";
import {
  addDoc,
  collection,
  FieldValue,
  serverTimestamp,
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";


  

function LikeIcon({item}) { 

const authContext = useContext(AuthContext);
  const { user } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
    const [open, setOpen] = useState(false);
        const [likes, setLikes] = useState([]);

//    const collectionRef = collection(db, "postedAds");
//    const docRef = doc(db, "postedAds", item.DOC_ID);
    const likesRef = doc(db, "postedAds", user.uid);

    const handleLikes = () => {
   if (likes?.includes(user.uid)) {
     updateDoc(likesRef, {
       likes: arrayRemove(user.uid),
     })
       .then(() => {
         console.log("unliked");
       })
       .catch((e) => {
         console.log(e);
       });
   } else {
     updateDoc(likesRef, {
       likes: arrayUnion(user.uid),
     })
       .then(() => {
         console.log("liked");
       })
       .catch((e) => {
         console.log(e);
       });
   }
    } 
    
    return (
        <IconButton>
             <Button onClick={handleLikes}>
            <FavoriteIcon sx={{ color: "red" }} />
            </Button>
        </IconButton>
        
    );

}

export default LikeIcon;







      




             


  
  