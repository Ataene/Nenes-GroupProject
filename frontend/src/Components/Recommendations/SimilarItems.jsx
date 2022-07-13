import React, { useState, useContext, useEffect } from "react";
import {
  IconButton,
  Typography,
  Box,
  CardActions,
  Card,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  ListItemButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { AuthContext } from "../../auth/AuthProvider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import {
  onSnapshot,
  orderBy,
  query,
  collection,
 where,
  limit,
} from "firebase/firestore";
import ShareIcon from "@mui/icons-material/Share";
import PreviewIcon from "@mui/icons-material/Preview";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import useDialogModal from ".././productdetail/useDialogModal";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ItemDetail from ".././productdetail/ProductDetail";
import OnlineStatus from "../Profile/OnlineStatus";
import CircleLoader from "react-spinners/CircleLoader";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";



const SimilarItems = ({handleClick, newStatus, loading, options, item }) => {
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user, setUserToMessage } = authContext;
  // console.log("888888", user)
  const [postedAds, setPostedAds] = useState([]);
  const [character, setCharacter] = useState([]);

  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ItemDetail);

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  useEffect(() => {
    if (db) {
      let collectionRef = collection(db, "postedAds");
      let queryRef = query(
        collectionRef,
        orderBy("timeStamp"),
        limit(4)
      );
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setPostedAds(items);
      });
      return unsubscribe;
    }
  }, [db]);

  let characters = postedAds;

  useEffect(() => {
    const findSimilarItem = () => {
      //character
      let mySearch = characters.filter((postedAd) => {
        return postedAd.uid === user.uid;
      });
      console.log("333", mySearch);
      let myWantList = mySearch.map((ad) => {
        return ad.title.replace(/\s/g, "").toLowerCase();
      });
      setCharacter(myWantList);
    };
    findSimilarItem();
  }, [postedAds]);
    

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
              characters
                .filter((item) => item.uid !== user.uid)
                .filter((item) =>
                  character.includes(
                    item.title.replace(/\s/g, "").toLowerCase()
                  )
                )
                .map((characterItem) => (
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
                            <FavoriteIcon
                              sx={{ color: "red" }}
                            />
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

export default SimilarItems;
