import React, { useContext, useState, useEffect } from "react";
import { Box, Container } from "@mui/system";
import { Notifications } from "@mui/icons-material";
import { AuthContext } from "../../auth/AuthProvider";
import Avatar from "@mui/material/Avatar";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { doc, onSnapshot } from "firebase/firestore";
import { Badge, IconButton, Typography } from "@mui/material";

const ChatHeader = () => {
  const authContext = useContext(AuthContext);
  const { user, isOnline } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [usePicture, setUserPicture] = useState();

  useEffect(() => {
    console.log(user);
    if (db && user) {
      let docRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(docRef, (querySnap) => {
        if (querySnap.empty) {
          console.log("Ads not found");
        } else {
          let usersData = querySnap.data();
          setUserPicture(usersData.Avatar);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Container
        sx={{
          display: "flex",
          flexFirection: "row",
          backgroundColor: "green",
          justifyContent: "space-evenly",
        }}
      >
        <Avatar alt="R" src={usePicture} />
        <Typography  sx={{ color: "white", marginTop: "10px" }}>Messaging</Typography>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <Notifications sx={{color: "white"}} />
          </Badge>
        </IconButton>
      </Container>
    </Box>
  );
};

export default ChatHeader;
