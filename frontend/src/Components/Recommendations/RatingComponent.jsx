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
  const [postedAds, setSetAllPostedAds] = useState("");
  const [ratingValue, setRatingValue] = useState(null);

  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (rating) {
      const SaveRating = async () => {
        const collectionRef = collection(db, "rating");
        await addDoc(collectionRef, {
          rating,
          user: user.uid,
          itemOwner: productDetail.itemOwner,
          postedAd: productDetail.uid,
          timeStamp: serverTimestamp(),
        });
      };
      SaveRating();
    }
  }, [rating]);

  return (
    <Box>
      <IconButton aria-label="share">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input
                type="radio"
                name="rating"
                value={rating}
                precision={0.1}
                onClick={(e) => setRating(e.target.value)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={40}
              />
            </label>
          );
        })}
      </IconButton>
      <Typography sx={{ display: "flex"}}>
        The rating is {rating}.
      </Typography>
    </Box>
  );
};

export default RatingComponent;