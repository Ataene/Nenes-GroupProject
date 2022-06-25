import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
//import "../App.css";
import CloseIcon from "@mui/icons-material/Close";
// import { products } from "../Components/Data/index"
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
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
  Link,
  List,
  ListItem,
  Rating,
  TextField,
} from "@mui/material";
// import cardImage from "../../images/Alaf.jpg"
import { AuthContext } from "../../auth/AuthProvider";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  setDoc,
  updateDoc,
  deleteField,
  getDoc,
} from "firebase/firestore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import "../WantList/WishList.css";
import Wishlist from "./Wishlist";
import Traded from "./Traded";

function Add({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [title, setTitle] = useState("");
  const [postedAds, setSetAllPostedAds] = useState([]);
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;
  const [allUsers, setAllUser] = useState([]);
    const [value, setValue] = useState();

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
                  <Typography variant="h4">
                    <h1>Search Marketplace for Items</h1>
                  </Typography>
                  <br />
                  <input
                    type="text"
                    placeholder="Search for a item"
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
                      {filteredData.slice(0, 15).map((data, key) => (
                        <Grid container spacing={1}>
                          <Grid
                            data
                            lg={4}
                            sm={6}
                            md={5}
                            xs={12}
                            key={data.timeStamp}
                          >
                            <CardMedia
                              component="img"
                              image={data.url}
                              title={data.title}
                              width={640}
                              height={640}
                              layout="responsive"
                            ></CardMedia>
                          </Grid>
                          <Grid item lg={4} sm={6} md={5} xs={12}>
                            <List>
                              <ListItem>
                                <Typography component="h1" variant="h6">
                                  {data.title}
                                </Typography>
                              </ListItem>
                              <ListItem>
                                <Typography>
                                  Category: {data.category}
                                </Typography>
                              </ListItem>
                              <ListItem>
                                <Typography>Brand: {data.brand}</Typography>
                              </ListItem>
                              <ListItem>
                                <Typography>
                                  Rating: {data.rating} stars ({data.numReviews}{" "}
                                  reviews)
                                </Typography>
                              </ListItem>
                              <ListItem>
                                <Typography>
                                  {" "}
                                  Description: {data.description}
                                </Typography>
                              </ListItem>
                              <ListItem>
                                <Typography> I Want: {data.want}</Typography>
                              </ListItem>
                            </List>
                          </Grid>
                          <Grid item lg={4} sm={6} md={5} xs={12}>
                            <Card>
                              <List>
                                <ListItem>
                                  <Grid container></Grid>
                                </ListItem>
                                <ListItem>
                                  <Grid container>
                                    <Grid item xs={12}>
                                      <Typography>Status</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Typography>
                                        {data.countInStock > 0
                                          ? "In stock"
                                          : "Unavailable"}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </ListItem>
                                <ListItem>
                                  <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                     sx={{ background: "green" }}
                                  >
                                    Add to Wishlist
                                  </Button>
                                </ListItem>
                                <ListItem>
    <Box>
      <Rating
        precision={0.1}
        size="large"
        value={value}
        onChange={(e, val) => setValue(val)}
      />
      <Typography>Rated {value !== undefined ? value : 0} Stars</Typography>
    </Box>
                                </ListItem>
                              </List>
                            </Card>
                          </Grid>
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
