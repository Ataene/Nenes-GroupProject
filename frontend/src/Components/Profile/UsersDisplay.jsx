import React, { useContext, useEffect, useState } from 'react'
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { AuthContext  } from '../../auth/AuthProvider'
import { FirebaseContext } from "../../auth/FirebaseProvider";

const UsersDisplay = ({ onlineUsers, handleOpen}) => {
  const authContext = useContext(AuthContext);
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const { user, isOnline } = authContext;

  return (
    <Box>
       {onlineUsers.filter((item) => item.email !== user.email).map((item) => (
              <Container item key={item.uid}>
                  <Typography onClick={handleOpen}>{item.name}</Typography>
                  {/* <div   className={`userStatus ${user.isOnline ? online : offline}}`}></div> */}
              </Container>
            ))}
    </Box>
  )
}

export default UsersDisplay;