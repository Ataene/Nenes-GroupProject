import { Box, Container, Button } from '@mui/material';
import React from 'react'
import Feeds from './Feeds';
import TopProfile from './TopProfile';

const MiddleBar = () => {

  return (
    <Box sx={{flex: "8.5", backgroundColor: "#FFE6E6"}}>
        <Container>
            <Box sx={{margin: "5px"}}>
              <Button sx={{margin: "5px"}} variant="outlined" size="large">Messenger</Button>
              <Button sx={{margin: "5px"}} variant="outlined" size="large">Products</Button>
              <Button sx={{margin: "5px"}} variant="outlined" size="large">Categories</Button>
              <Button sx={{margin: "5px"}} variant="outlined" size="large">Services</Button>
            </Box><hr />
            <TopProfile/>
            <Feeds />
        </Container>
    </Box>
  )
}

export default MiddleBar;