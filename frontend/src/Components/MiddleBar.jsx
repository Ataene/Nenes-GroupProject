import { Box, Container } from '@mui/material';
import React from 'react'
import Feeds from './Feeds';
import TopProfile from './TopProfile';

const MiddleBar = () => {

  return (
    <Box sx={{flex: "8", backgroundColor: "#FFE6E6"}}>
        <Container>
            <TopProfile/>
            <Feeds />
        </Container>
    </Box>
  )
}

export default MiddleBar;