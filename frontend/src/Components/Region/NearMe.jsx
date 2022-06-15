import React from 'react';
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import {products} from "../Data/index"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

export const NearMe = () => {

    const navigate = useNavigate()
    const handleClick = () => {
      navigate("/catgories/id"); //Navigate to a particular product category with and Id.
    }
    return(
      <>
        <Container sx={{ justifyContent: 'center'}}>
          <Grid container sx={{display: "flex", flexDirection: "row", justifyContent: 'center', }}>
          {products.map((items) => (
            <Card label="Clickable" onClick={handleClick} style={{margin: "10px", cursor: "pointer"}} sx={{ maxWidth: 345 }} key={items.id} >
              <CardMedia
                component="img"
                height="150"
                image={items.image}
                alt="Categories"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {items.name}
                </Typography>
              </CardContent>
            </Card>
              ))}
          </Grid>
        </Container>
      </>
    )
  }