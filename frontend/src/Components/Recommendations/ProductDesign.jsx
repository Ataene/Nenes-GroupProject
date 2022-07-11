import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import CarCrashOutlinedIcon from '@mui/icons-material/CarCrashOutlined';
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const ProductDesign = () => {

        const itemData = [
                {
                  img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
                  title: 'Bed',
                },
                {
                  img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
                  title: 'Books',
                },
                {
                  img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
                  title: 'Sink',
                },
                {
                  img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
                  title: 'Kitchen',
                },
                {
                  img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
                  title: 'Blinds',
                },
                {
                  img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
                  title: 'Chairs',
                },
                {
                  img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
                  title: 'Laptop',
                },
                {
                  img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
                  title: 'Doors',
                },
                {
                  img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
                  title: 'Coffee',
                },
                {
                  img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
                  title: 'Storage',
                },
                {
                  img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
                  title: 'Candle',
                },
                {
                  img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
                  title: 'Coffee table',
                },
              ];

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
        <Container sx={{display: "flex", justifyContent: "center", alignItems: 'center', marginTop: 3}}>
        <Box sx={{ width: 500, height: 450, overflowY: 'scroll', }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
        </Container>
      </Box>
      <Container>Trades Complete, daily new members, cities</Container>
      <Box></Box>
    </>
  );
};

export default ProductDesign;
