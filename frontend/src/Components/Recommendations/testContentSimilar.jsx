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

import similarity from "compute-cosine-similarity";

const TestRecommendation = (props) => {
  const { handleClick, options, item, displayName, str, wordCountmap, dict } =
    props;
  const authContext = useContext(AuthContext);
  const { user, setUserToMessage } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [open, setOpen] = useState(false);

  const [postedAds, setPostedAds] = useState([]);
  const [character, setCharacter] = useState([]);
  

  const [loading, setLoading] = useState(false);
 

  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ItemDetail);

 function wordCountMap(str) {
   let title = str.split(" ");
   let wordCount = {};
   title.forEach((w) => {
     wordCount[w] = (wordCount[w] || 0) + 1;
   });
   return wordCount;
 }

 function addWordsToDictionary(wordCountmap, dict) {
   for (let key in wordCountmap) {
     dict[key] = true;
   }
 }

 function wordMapToVector(map, dict) {
   let wordCountVector = [];
   for (let term in dict) {
     wordCountVector.push(map[term] || 0);
   }
   return wordCountVector;
 }

 function dotProduct(vecA, vecB) {
   let product = 0;
   for (let i = 0; i < vecA.length; i++) {
     product += vecA[i] * vecB[i];
   }
   return product;
 }

 function magnitude(vec) {
   let sum = 0;
   for (let i = 0; i < vec.length; i++) {
     sum += vec[i] * vec[i];
   }
   return Math.sqrt(sum);
 }

 function cosineSimilarity(vecA, vecB) {
   return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
 }

 function textCosineSimilarity(txtA, txtB) {
   const wordCountA = wordCountMap(txtA);
   const wordCountB = wordCountMap(txtB);
   let dict = {};
   addWordsToDictionary(wordCountA, dict);
   addWordsToDictionary(wordCountB, dict);
   const vectorA = wordMapToVector(wordCountA, dict);
   const vectorB = wordMapToVector(wordCountB, dict);
   return cosineSimilarity(vectorA, vectorB);
 }

 function getSimilarityScore(val) {
   return Math.round(val * 100);
 }

 function checkSimilarity() {
   const text1 = "title1".val();
   const text2 = "title2".val();
   const similarity = getSimilarityScore(textCosineSimilarity(text1, text2));
 }

  useEffect(() => {
    if (db) {
      let collectionRef = collection(db, "postedAds");
      let queryRef = query(collectionRef, orderBy("description"), limit(4));
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        console.log(items);
        setPostedAds(items);
      });
      return unsubscribe;
    }
  }, [db]);
      
let characters = postedAds;

    useEffect(() => {
         const findSimilarItems = () => {
           //character
           let myAds = characters.filter((postedAd) => {
             return postedAd.uid === user.uid;
           });
           let myWantList = myAds.map((ad) => {
             return ad.title.toLowerCase();
           });
           function textCosineSimilarity(txtA, txtB) {
             const wordCountA = wordCountMap(txtA);
             const wordCountB = wordCountMap(txtB);
             let dict = {};
             addWordsToDictionary(wordCountA, dict);
             addWordsToDictionary(wordCountB, dict);
             const vectorA = wordMapToVector(wordCountA, dict);
             const vectorB = wordMapToVector(wordCountB, dict);
             return cosineSimilarity(vectorA, vectorB);
           }

           function getSimilarityScore(val) {
             return Math.round(val * 100);
           }

           function checkSimilarity() {
             const text1 = "title1".val();
             const text2 = "title2".val();
             const similarity = getSimilarityScore(
               textCosineSimilarity(text1, text2)
             );
           }

           setCharacter(myWantList);
         };
         findSimilarItems();
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
      <Container
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            sx={{ p: 4, fontFamily: "Montserrat" }}
          >
            <Typography
              variant="h4"
              sx={{ fontFamily: "Montserrat", color: "green" }}
            >
              Recommendations for {user.firstName}
            </Typography>
          </Box>
          <Grid container spacing={1}>
            {postedAds
              .filter((item) => item.uid !== user.uid)
              .map((item) => (
                <Grid item md={3} key={item.uid}>
                  <Paper
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
                      <OnlineStatus uid={item.uid} />
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
                      <CardActions sx={{ marginBottom: "20px" }}>
                        <IconButton aria-label="add to favorites">
                          <FavoriteIcon sx={{ color: "red" }} />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon sx={{ color: "#62b4f9" }} />
                        </IconButton>
                        <IconButton aria-label="chat">
                          <ChatIcon
                            sx={{ color: "green" }}
                            onClick={() => setUserToMessage(item.uid)}
                          />
                        </IconButton>
                        <IconButton aria-label="share" type="click">
                          <ListAltIcon
                            sx={{ color: "purple" }}
                            onClick={() => handleClick(item)}
                          />
                        </IconButton>
                        <ProductDetailDialog item={item} />
                      </CardActions>
                    </Box>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default TestRecommendation;
