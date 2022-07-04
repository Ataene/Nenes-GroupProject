import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CardMedia,Dialog, DialogContent, DialogTitle, Grid, IconButton, Slide } from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../styles/theme";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../../auth/AuthProvider";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Button, CardHeader, Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import Avatar from "@mui/material/Avatar";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import ShareIcon from "@mui/icons-material/Share";
import {getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { List, ListItem } from "@material-ui/core";

function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
}
const ItemDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
}));
const ItemDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
}));

function ItemDetail({ open, onClose, item }) {   //Starts here
  const theme = useTheme();
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;

  const [title, setTitle] = useState("");
  const [postedAds, setPostedAds] = useState([]);  
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState("");
    
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const docRef = doc(db, 'postedAds', user.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                  console.log("9999999999", docSnap.data())
                  const getKeys = Object.keys(docSnap.data()).map(key => ({ name: key, status: docSnap.data()[key] }))
                  setPostedAds(getKeys);
                  console.log("9999999999", postedAds)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchItem()
    })
    
  function handleAdd(rat) {
    alert(`The rating is ${rat}`)
    // console.log("here");
    //  setPostedAds([]);
    // const postedAdsRef = doc(db, "postedAds", user.uid);
    // await updateDoc( postedAdsRef, {ratings: Number("") })
  }    
  return (
    <Dialog
      TransitionComponent={SlideTransition}
      variant="permanent"
      open={open}
      fullScreen
    >
      <DialogTitle sx={{ background: Colors.secondary }}>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          {item.title}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <div
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card sx={{ maxWidth: 800, height: 500 }}>
            <Grid className="details" container spacing={1}>
              <Grid
                item
                md={4}
                key={item.uid}
                onClick={(e) => setPostedAds(item)}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "red"[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                />
                <CardMedia
                  component="img"
                  sx={{ height: "350px" }}
                  image={item.url}
                  title={item.title}
                  onClick={() => setPostedAds(item)}
                ></CardMedia>
              </Grid>
              <Grid item md={4} xs={6}>
                <List>
                  <ListItem>
                    <Typography component="h4" variant="h6">
                      {item.title}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>item: {item.displayName}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Category: {item.category}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Brand: {item.brand}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>Quantity: {item.quantity}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      Rating: {item.rating} stars ({item.numReviews} reviews)
                    </Typography>
                  </ListItem>

                  <ListItem>
                    <Typography> Condition: {item.condition}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography> Description: {item.description}</Typography>
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={4} xs={12}>
                <Card
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "420px",
                  }}
                >
                  <List>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>I Want:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>{item.want}</Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography>Status</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>
                            {item.countInStock > 0 ? "In stock" : "Unavailable"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon sx={{ color: "red" }} />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon sx={{ color: "#62b4f9" }} />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ChatIcon sx={{ color: "green" }} />
                    </IconButton>
                    <ListItem>
                      <Button fullWidth variant="contained" color="primary">
                        Add to Wishlist
                      </Button>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          PaddingTop: "row",
                          flexDirection: "column",
                        }}
                      >
                        {/* <Rating
                          precision={0.1}
                          size="large"
                          // value={ratings}
                          // onChange={handleAdd}
                          onClick={handleAdd}
                          // onChange={(e) => setRatings(e.target.value)}
                        /> */}
                        <Rating
                              name="hover-feedback"
                              // value={ratings}
                              precision={0.5}
                              onChange={handleAdd}
                              // onChange={(event, newValue) => {
                              //   setValue(newValue);
                              // }}
                          />
                        <Typography>
                          Rated {value !== undefined ? value : 0} Stars
                        </Typography>
                      </Box>
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );

}

export default ItemDetail;
