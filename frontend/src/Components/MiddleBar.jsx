import { Box, Container, Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Feeds from './Feeds';
import TopProfile from './TopProfile';

const MiddleBar = () => {
 const navigate = useNavigate()
  const handleClick = () => {
  navigate("/location") 
}
  return (
    <Box sx={{flex: "8.5", backgroundColor: "#FFE6E6"}}>
        <Container>
            <Box sx={{margin: "5px"}}>
              <Button sx={{margin: "5px"}} variant="outlined" size="large">Messenger</Button>
              <Button sx={{margin: "5px"}} variant="outlined" size="large">Products</Button>
              <Button sx={{margin: "5px"}} variant="outlined" size="large">Categories</Button>
              <Button sx={{margin: "5px"}} variant="outlined" size="large">Services</Button>
              <Button onClick={handleClick} sx={{margin: "5px"}} variant="outlined" size="large">Post Ad</Button>
            </Box><hr />
            <TopProfile/>
            <Feeds />
        </Container>
    </Box>
  )
}

export default MiddleBar;