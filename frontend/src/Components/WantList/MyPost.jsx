import React, { useEffect, useState, useContext } from "react";
import {Box, CardActions, Card, CardHeader, CardMedia, Grid, IconButton } from "@mui/material";
import { AuthContext } from "../../auth/AuthProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import ShareIcon from "@mui/icons-material/Share";
import ListAltIcon from "@mui/icons-material/ListAlt";
import useDialogModal from ".././productdetail/useDialogModal";
import ItemDetail from ".././productdetail/ProductDetail";
import CircleLoader from "react-spinners/CircleLoader";
import { collection, onSnapshot, orderBy, query, doc, setDoc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import OnlineStatus from "../../Components/Profile/OnlineStatus";
import { MyPostContext } from "../../providers/MyPostProvider";
// import { TradeContext } from "../../providers/TradedProvider";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DropSelections from "../DropSelections";

const MyPost = ( { visible, onCancel } ) => {
  const myPostContext = useContext(MyPostContext);
  const [myPostedAds, setMyPostedAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const authContext = useContext(AuthContext);
  const { user, setUserToMessage } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  //   const tradedContext = useContext(TradeContext);
  //   const { myPostList, removeFromMyPostList } = myPostContext;
  //   console.log("555", myPostList);
  useDialogModal(ItemDetail);

  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ItemDetail);

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };
  // const handleClick = (item) => {
  //         addToWantList(item);
  //       };

  // const handleClick = (item) => {
  //         addToWantList(item);
  //       };

  //       //Handle add to Traded
  //       const handleClickTraded = (item) => {
  //         addToTraded(item);
  //       };

  useEffect(() => {
    if (db && user) {
      setLoading(true);
      let collectionRef = collection(db, "postedAds");
      let queryRef = query(collectionRef, orderBy("timeStamp"));
      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if (querySnap.empty) {
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return { ...doc.data(), DOC_ID: doc.id };
          });
          setMyPostedAds(usersData);
          setLoading(false);
          console.log("333", myPostedAds);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);

  const removeFromMyPostList = async (DOC_ID) => {
    try {
      let docRef = doc(db, "postedAds", DOC_ID);
      await deleteDoc(docRef);
      // setMyPostedAds(myPostedAds.filter((item) => item !== itemToRemove));
    } catch (error) {
      console.log(error);
    }
  };

const editMyPostedAd = async (DOC_ID) => {
  try {
    const res = await updateDoc(doc(db, "postedAds", DOC_ID), {
//       ...formData,
      timeStamp: serverTimestamp(),
    });
    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
};

const handleModalOpen = () => {

setModalVisible(true);
const editMyPostedAd = async (DOC_ID) => {
        try {
          const res = await updateDoc(doc(db, "postedAds", DOC_ID), {
      //       ...formData,
            timeStamp: serverTimestamp(),
          });
          console.log(DOC_ID);
        } catch (error) {
          console.log(error.message);
        }
      };
};
const handleCancel = () => {
setModalVisible(false);
};

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
            myPostedAds
              .filter((item) => item.owner === user.uid)
              .map((item) => (
                <Grid item xs={6} md={6} lg={4} xl={3} key={item.timeStamp}>
                  <Card
                    elevation={10}
                    sx={{ height: "33rem", marginTop: "10px", margin: "10px" }}
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
                        {/* <IconButton
                          aria-label="chat"
                          onClick={() => setUserToMessage(item.uid)}
                        >
                          <EditIcon sx={{ color: "green" }} />
                        </IconButton> */}
                        <IconButton
                          aria-label="chat"
                          onClick={
                        //   editMyPostedAd(item.DOC_ID)
                          handleModalOpen
                          }
                        >
                          <EditIcon sx={{ color: "green" }} />
                        </IconButton>
                        {modalVisible && (
                        <DropSelections
                        visible={modalVisible}
                        onCancel={handleCancel}
                        sx={{ margin: "5px" }}
                        variant="outlined"
                        size="large"
                        />
                        )}
                        {/* <IconButton aria-label="share" type="click"  onClick={() => handleClick(item)}>
                          <ListAltIcon
                            sx={{ color: "purple" }}
                          />
                        </IconButton> */}
                        {/* <IconButton aria-label="share" type="click">
                        <ListAltIcon
                          sx={{ color: "purple" }}
                          onClick={() => handleClickTraded(item)}
                        />
                      </IconButton> */}
                        <IconButton
                          aria-label="share"
                          onClick={() => removeFromMyPostList(item.DOC_ID)}
                        >
                          <CancelPresentationIcon sx={{ color: "green" }} />
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

export default MyPost;
