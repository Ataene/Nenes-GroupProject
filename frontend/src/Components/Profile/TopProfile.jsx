import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, CardHeader, CardMedia, Container, Grid, IconButton, Link } from '@mui/material';
// import cardImage from "../../images/Alaf.jpg"
import { AuthContext  } from '../../auth/AuthProvider'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import Avatar from '@mui/material/Avatar';
import { FirebaseContext } from '../../auth/FirebaseProvider';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import WishList from './WishList';
import Test from '../WantList/Test';
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { Wishlist } from '../WantList/Wishlist';

const TopProfile = () => {
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;
  // const [ allUsers, setAllUser ] = useState([])
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



  
  return (
    <>
      <Container>
        <div>
          <h1>Items Up for Trade</h1>
          <Grid container spacing={3}>
            {postedAds.map((item) => (
              <Grid item md={3} key={item.timeStamp}>
                <Card
                  sx={{ height: "25rem", marginTop: "10px", margin: "10px" }}
                >
                  <Link href="/title">
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: "red"[500] }}
                          aria-label="recipe"
                        >
                          R
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={item.title}
                    />
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={item.url}
                        title={item.title}
                      ></CardMedia>
                      <CardContent>
                        <Typography>{item.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ChatIcon />
                    </IconButton>
                    <Button size="small" color="primary">
                      Want List
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default TopProfile;