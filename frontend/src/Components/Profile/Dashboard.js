import React, { useContext } from 'react'
import { Box } from '@mui/material';
import { AuthContext  } from '../../auth/AuthProvider'
import LeftBar from "./LeftBar"
import MiddleBar from "./MiddleBar"
import RightBar from "./RightBar"

const Dashboard = () => {
    const authContext = useContext(AuthContext)
    const { user, isOnline } = authContext;
  if (!user && !isOnline){
      return null;
  }
  return (
    <>
        <Box container sx={{display: "flex", width: "100%"}}>
            <LeftBar />
            <MiddleBar />
            <RightBar />
        </Box>
    </>
    )
}

export default Dashboard;