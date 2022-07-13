import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import CarCrashOutlinedIcon from '@mui/icons-material/CarCrashOutlined';
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';

const HowItWorks = () => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(12),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <Box>
        <Container>
          <div>
          <Typography sx={{display: "flex", justifyContent: "center", alignItems: 'center', marginBottom: 3}}>How it Works</Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              sx={{display: "flex", justifyContent: "center", alignItems: 'center'}}
            >
              <Item>
                <EditLocationOutlinedIcon sx={{color: "green"}} />
              <Typography>User sign up and post and item to trade. </Typography>
              </Item>
              <Item>
              <CarCrashOutlinedIcon sx={{color: "red"}}/>
              <Typography>Once Logged in user can see post within their neigbourhood. </Typography>
              </Item>
              <Item>
              <LockClockOutlinedIcon sx={{color: "yellow", size: "large"}}/>
              <Typography>Nearby users can chat and arrange to meet and exchange thier items </Typography>
              </Item>
            </Stack>
          </div>
        </Container>
        <Container>Image</Container>
      </Box>
      <Container>Trades Complete, daily new members, cities</Container>
      <Box></Box>
    </>
  );
};

export default HowItWorks;
