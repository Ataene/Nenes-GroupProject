import React from 'react'
import { Box, Container, Typography, Avatar } from '@mui/material';
import { useSession  } from '../auth/UserProvider'

const RightBar = () => {

    const { user } = useSession();
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
     </Container>
    </Box>
  )
}

export default RightBar;