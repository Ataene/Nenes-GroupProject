import React from "react";
import { Card, CardMedia, Typography, CardContent, Button, CardActions, Grid, Container } from '@mui/material'
import {products} from "../Data/index"


const WishList = () => {


  return (
    <>
    <Container sx={{ margin: "5px", justifyContent: 'center'}}>
    <Grid container sx={{display: "flex", flexDirection: "row", margin: "5px", justifyContent: 'center', }}>
    {products.map((items) => (
      <Card sx={{ maxWidth: 345, margin: "10px" }} key={items.id} >
        <CardMedia
          component="img"
          height="140"
          image={items.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {items.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {items.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
        ))}
      </Grid>
      </Container>
    </>
  );
};

export default WishList;