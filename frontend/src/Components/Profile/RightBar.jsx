import React, { useContext } from 'react'
import { Box, Container, Typography, CardActionArea, CardMedia, CardContent, Card } from '@mui/material';
import { AuthContext  } from '../../auth/AuthProvider'
import { useNavigate } from 'react-router-dom';
import Location from '../Region/Location';
import SendIcon from '@mui/icons-material/Send';
import Messenger from '../../Pages/messenger/Messenger';
import ChatRoom from "./ChatRoom";

const RightBar = () => {

  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const navigate= useNavigate()
  const handleModal = () => {
    navigate('/location')
  }

  return (
    <Box sx={{flex: "2", height: "calc(100vh-50px)" }}>
     <Container>
     <Box sx={{marginTop: "20px"}}>
     <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="50px"
          image="https://firebasestorage.googleapis.com/v0/b/hundiepay.appspot.com/o/gps.jpeg?alt=media&token=9cb7974d-fdf2-4ede-9fe8-757db7ef6872"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Ads Board
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Post your Ads
          </Typography>
        </CardContent>
    </Card>
     </Box>
     
       {/* <Location /> */}
       {/* <Messenger /> */}
     </Container>
     <Container>
      <ChatRoom />
     </Container>
    </Box>
  )
}

export default RightBar;