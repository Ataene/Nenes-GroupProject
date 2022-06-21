import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions, CardHeader, CardMedia, Grid, IconButton } from '@mui/material';
// import cardImage from "../../images/Alaf.jpg"
import { AuthContext  } from '../../auth/AuthProvider'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import Avatar from '@mui/material/Avatar';
import { FirebaseContext } from '../../auth/FirebaseProvider';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';

const TopProfile = () => {
  
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;
  // const [ allUsers, setAllUser ] = useState([])
  const [ postedAds , setSetAllPostedAds ] = useState([])

  useEffect(() => {
    if(db && user){
      let collectionRef = collection(db, "postedAds");
      let queryRef = query(collectionRef, orderBy("timeStamp"));

      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if(querySnap.empty){
          console.log("Ads not found");
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return {...doc.data(), DOC_ID: doc.id}
          });
          setSetAllPostedAds(usersData)
        }
      })
      return unsubscribe;
    }
  }, [db, user]);
  
  return (
   <>
   <Grid >
    <Grid item>
    {postedAds.map((item) => (
    <Card sx={{ height: "25rem", marginTop: "15px", margin: "10px"}} key={item.timeStamp}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red"[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.title}
        subheader={item.description}
      />
      <CardMedia
        component="img"
        height="230"
        sx={{borderRadius: "20px", }}
        image={item.url}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {item.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon  sx={{color: "red"}}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon  sx={{color: "blue"}}/>
        </IconButton>
        <IconButton aria-label="share">
          <ChatIcon  sx={{color: "green"}} />
        </IconButton>
      </CardActions>
    </Card>
    ))}
    </Grid>
   </Grid>
   </>
  )
}

export default TopProfile;