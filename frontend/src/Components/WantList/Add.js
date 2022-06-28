import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
//import "../App.css";
import CloseIcon from "@mui/icons-material/Close";
// import { products } from "../Components/Data/index"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Box, Button, CardActionArea, CardActions, CardHeader, CardMedia, Grid, IconButton,} from "@mui/material";
// import cardImage from "../../images/Alaf.jpg"
import { AuthContext } from "../../auth/AuthProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import {collection, onSnapshot, orderBy, query, doc, setDoc, updateDoc, deleteField, getDoc} from "firebase/firestore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import "../WantList/WishList.css";
import Wishlist from "./Wishlist";
import Traded from "./Traded";

import { Container } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import PersonIcon from "@mui/icons-material/Person";
import { WantContext } from "../../providers/WantProvider";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function Add({ handleClick }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
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

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = postedAds.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <>
      <Container>
        <div className="add-page">
          <div className="container">
            <div className="add-content">
              <div className="input-wrapper">
                <center>
                  <input
                    type="text"
                    placeholder="Search for an item..."
                    value={wordEntered}
                    onChange={handleFilter}
                  />
                </center>
              </div>
              <br />
              <Grid spacing={1}>
                <Grid>
                  {filteredData.length !== 0 && (
                    <div className="info">
                      {filteredData.slice(0, 15).map((item) => (
                        <Grid item md={3} key={item.description}>
                          <Card
                            sx={{
                              height: "33rem",
                              marginTop: "10px",
                              margin: "10px",
                            }}
                          >
                            <CardHeader
                              avatar={
                                <Avatar
                                  sx={{ bgcolor: "red"[500] }}
                                  aria-label="recipe"
                                >
                                  R
                                </Avatar>
                              }
                              title={item.title}
                              name="title"
                            />
                            <CardMedia
                              component="img"
                              sx={{ height: "280px" }}
                              image={item.url}
                              title={item.title}
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
                              <Typography>
                                Condition: {item.condition}
                              </Typography>
                              <Typography>I want : {item.want}</Typography>
                              <CardActions sx={{ marginBottom: "20px" }}>
                                <IconButton aria-label="add to favorites">
                                  <FavoriteIcon sx={{ color: "red" }} />
                                </IconButton>
                                <IconButton aria-label="share">
                                  <ShareIcon sx={{ color: "#62b4f9" }} />
                                </IconButton>
                                <IconButton aria-label="share">
                                  <ChatIcon sx={{ color: "green" }} />
                                </IconButton>
                                <IconButton aria-label="share" type="click">
                                  <AddShoppingCartIcon
                                    sx={{ color: "purple" }}
                                    onClick={() => handleClick(item)}
                                  />
                                </IconButton>
                              </CardActions>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </div>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Add;
