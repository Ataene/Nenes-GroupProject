import React, { useContext, useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardActions,
  Card,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  ListItemButton,
  Paper,
  Tooltip,
  Button,
} from "@mui/material";
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
  onSnapshot,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

function LikeIcon({ item }) {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState([]);

  //    const collectionRef = collection(db, "postedAds");
  //    const docRef = doc(db, "postedAds", item.DOC_ID);

  const [postedAd, setPostedAd] = useState();
  const [loading, setLoading] = useState(false);


//   useEffect(() => {
//     if (db && user) {
//       setLoading(true);
//       let collectionRef = collection(db, "postedAds");
//       let queryRef = query(collectionRef, orderBy("timeStamp"));
//       const unsubscribe = onSnapshot(queryRef, (querySnap) => {
//         if (querySnap.empty) {
//         } else {
//           let usersData = querySnap.docs.map((doc) => {
//             return { ...doc.data(), DOC_ID: doc.id };
//           });
//           setPostedAds(usersData);
//           setLoading(false);
//         }
//       });
//       return unsubscribe;
//     }
//   }, [db, user]);

  const handleLikes = async () => {
    const docRef = doc(db, "postedAds", item.DOC_ID);
    if (item.like?.includes(user.uid)) {
        updateDoc(docRef,{
            like: item.like.filter((like) => {
                return like!==user.uid;
            })
        });
    } else {
        updateDoc(docRef,{
            like: [...item.like, user.uid]
        });
    }
    } 
    
    return (
        <IconButton>
             <Button onClick={handleLikes}>
            <FavoriteIcon sx={{ color: item?.like?.includes(user.uid)?"red":"grey" }} />
            </Button>
        </IconButton>
        
    );

}


export default LikeIcon;
