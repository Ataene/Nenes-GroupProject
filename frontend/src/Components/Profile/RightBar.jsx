import React, { useContext, useState } from 'react'
import { Box, Container, Typography,  CardMedia, CardContent, Card } from '@mui/material';
import { AuthContext  } from '../../auth/AuthProvider'
import { useNavigate } from 'react-router-dom';
import ChatRoom from "./ChatRoom";
import ChatBox from './ChatBox';

const RightBar = () => {

  const authContext = useContext(AuthContext);
  const { user, userToMessage } = authContext;
  const navigate= useNavigate()
  const handleModal = () => {
    navigate('/location')
  }

  const [open, setOpen] = useState(true);
  const [transition, setTransition] = useState(undefined);

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{flex: "2"}}>
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
     </Container>
     <Box>
     {open && userToMessage && <ChatBox setOpen={setOpen} />}
     </Box>
    </Box>
  )
}

export default RightBar;