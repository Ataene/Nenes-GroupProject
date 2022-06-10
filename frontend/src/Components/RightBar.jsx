import React from 'react'
import { Box, Container, Typography, Avatar } from '@mui/material';
import { useUserContext  } from '../auth/userContextProvider'
import { useNavigate } from 'react-router-dom';
import ModalPop from './modal';

const RightBar = () => {

  const navigate= useNavigate()
  const handleModal = () => {
    navigate('/modal')
  }

  const { user } = useUserContext();
  return (
    <Box sx={{flex: "2", backgroundColor: "#DAEAF1", height: "calc(100vh-50px)" }}>
     <Container>
     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Typography>
          {user.displayName}
        </Typography>
        <Typography>
        email: {user.email}
        </Typography>
       <ModalPop />
     </Container>
    </Box>
  )
}

export default RightBar;