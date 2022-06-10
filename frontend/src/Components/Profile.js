import React from 'react'
import { Box } from '@mui/material';
import { useUserContext  } from '../auth/userContextProvider'
import LeftBar from "./LeftBar"
import MiddleBar from "./MiddleBar"
import RightBar from "./RightBar"

const Profile = () => {
    const { user } = useUserContext();
  if (!user){
      return null;
  }
  return (
    <>
        <Box sx={{display: "flex", width: "100%"}}>
            <LeftBar />
            <MiddleBar />
            <RightBar />
        </Box>
    </>
    )
}

export default Profile;