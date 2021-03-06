import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";
import { IconButton, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/system";
import { FaStar } from "react-icons/fa";
import "./ProductDetail.css";
import { Typography } from "@material-ui/core";

const RatingComponent = (props) => {
  const productDetail = props.productDetail;
  const [rating, setRating] = useState(null);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const authContext = useContext(AuthContext);
  const { user, LogoutUser } = authContext;
 



  useEffect(() => {
    if (rating) {
      const SaveRating = async () => {
        const collectionRef = collection(
          db,
          `postedAds/${productDetail.DOC_ID}/rating`
        );
        let newDoc = {
          rating,
          user: user.uid,
          itemOwner: productDetail.owner || "",
          timeStamp: serverTimestamp(),
        };
        await addDoc(collectionRef, newDoc);
        const userRef = collection(
          db,
          `users/${productDetail.owner}/rating`
        );
          newDoc = {
          rating,
          user: user.uid,
          itemOwner: productDetail.owner || "",
          timeStamp: serverTimestamp(),
        };

        await addDoc(userRef, newDoc);
      };;
      SaveRating();
    }
    
  }, [rating]);

  return (
    <Box>
      <Rating
        precision={0.1}
        size="large"
        value={rating}
        onChange={(e, val) => setRating(val)}
      />
      <Typography>Rated {rating !== undefined ? rating : 0} Stars</Typography>
    </Box>
  );
};

export default RatingComponent;