import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Grid } from '@mui/material';
// import cardImage from "../images/Alaf.jpg"
import { AuthContext  } from '../auth/AuthProvider'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import Avatar from '@mui/material/Avatar';
import { FirebaseContext } from '../auth/FirebaseProvider';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';

const TopProfile = () => {
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user } = authContext;

  const [ allUsers, setAllUser ] = useState([])

  useEffect(() => {

    if(db && user){

      let collectionRef = collection(db, "users");
      let queryRef = query(collectionRef, orderBy("name"));

      const unsubscribe = onSnapshot(queryRef, (querySnap) => {
        if(querySnap.empty){
          console.log("No user found");
        } else {
          let usersData = querySnap.docs.map((doc) => {
            return {...doc.data(), DOC_ID: doc.id}
          });
          setAllUser(usersData)
        }
      })
      return unsubscribe;
    }
  }, [db, user]);

  return (
    <div>
      {allUsers.map((item) => (
        <Card sx={{ height: "15rem", marginTop: "10px"}} key={item.uid}>
          <CardContent>
            <Avatar src={item.uid} sx={{margin: "10px", height: "100px", width: "100px"}} />
              <Typography style={{position: "relative", left: "110px", bottom: "80px"}} sx={{margin: "10px", fontSize: "20px"}} gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.uid}
              </Typography>
          </CardContent>
          <CardActions>
          <Typography>{item.email}</Typography>
            <Button size="small" color="primary">
              <FavoriteIcon />
            </Button>
            <Button size="small" color="primary">
              <ChatIcon />
            </Button>
          </CardActions>
          
        </Card>
        ))}
    </div>
  )
}

export default TopProfile;