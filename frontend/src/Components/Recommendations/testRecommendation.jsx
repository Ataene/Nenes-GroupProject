import React, { useContext, useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  ListItemButton,
  Paper,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import ShareIcon from "@mui/icons-material/Share";
import ListAltIcon from "@mui/icons-material/ListAlt";
import useDialogModal from "../productdetail/useDialogModal";
import ItemDetail from "../productdetail/ProductDetail";
import { AuthContext } from "../../auth/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import OnlineStatus from "../Profile/OnlineStatus";
import CircleLoader from "react-spinners/CircleLoader";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  getDocs,
  where,
  collectionGroup,
} from "firebase/firestore";

const TestRecommendation = ({ handleClick, options, item }) => {
  const authContext = useContext(AuthContext);
  const { user, setUserToMessage } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [open, setOpen] = useState(false);

  const [postedAds, setPostedAds] = useState([]);
  const [character, setCharacter] = useState([]);
  const [rating, setRating] = useState([]);
  const [ratingData, setRatingData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ItemDetail);

  useEffect(() => {
    if (!db) {
      console.log("No dabase found");
    } else {
      const getData = async () => {
        const collectionRef = query(collection(db, "postedAds"));
        const snapshot = await getDocs(collectionRef);
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          DOC_ID: doc.id,
        }));
        console.log("data", data)
        for (let i = 0; i < data.length; i++) {
          const ratingQ = query(
            collection(db, `postedAds/${data[i].DOC_ID}/rating`)
          );
          const ratingDetails = await getDocs(ratingQ);
          const rating = ratingDetails.docs.map((doc) => {
            return doc.data()
            
          }).reduce((acc, doc) => {
          return acc+=doc.rating
          }, 0) / ratingDetails.docs.length
          console.log("rating", rating)
          data[i].rating=(isNaN(rating)?0:rating)
        }
        setPostedAds(data.sort((a, b) => {
          return  b.rating - a.rating
        }))
      };
      getData();
    }
  }, [db]);

  console.log("my rating", postedAds);

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  if (!postedAds) {
    return <p className="mx-auto">Loading Data...</p>;
  }
  return (
    <>
      <Box>
        <Grid container spacing={1}>
          {loading ? (
            <div
              style={{ display: "flex", marginLeft: "500px", marginTop: 150 }}
            >
              <CircleLoader color={"#FBB454"} loading={loading} size={100} />
            </div>
          ) : (
            postedAds
              .filter((item) => item.rating)
              .map((item) => (
                <Grid item xs={6} md={4} lg={3} key={item.timeStamp}>
                  <Card
                    elevation={10}
                    sx={{
                      height: "33rem",
                      marginTop: "10px",
                      margin: "10px",
                    }}
                    item={item}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: "red"[500] }}
                            aria-label="recipe"
                            src={item.userPicture}
                          />
                        }
                        title={item.displayName}
                        name="title"
                      />
                      <OnlineStatus uid={item.owner} />
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ height: "260px" }}
                      image={item.url}
                      title={item.title}
                      onClick={() => {
                        console.log(item);
                        showProductDetailDialog(item);
                      }}
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
                      <CardActions xs={6} sx={{ marginBottom: "20px" }}>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon sx={{ color: "red" }} />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon sx={{ color: "#62b4f9" }} />
                        </IconButton>
                        <IconButton
                          aria-label="chat"
                          onClick={() => setUserToMessage(item.uid)}
                        >
                          <ChatIcon sx={{ color: "green" }} />
                        </IconButton>
                        <IconButton
                          aria-label="share"
                          type="click"
                          onClick={() => handleClick(item)}
                        >
                          <ListAltIcon sx={{ color: "purple" }} />
                        </IconButton>
                        <ProductDetailDialog item={item} />
                      </CardActions>
                    </Box>
                  </Card>
                </Grid>
              ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default TestRecommendation;
