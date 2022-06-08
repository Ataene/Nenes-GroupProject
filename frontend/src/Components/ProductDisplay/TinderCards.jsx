import React, { useEffect, useState } from 'react'
import { Typography, Grid } from "@mui/material";
import TinderCard from 'react-tinder-card';
import SwipeButtons from "./SwipeButtons";
import "../../App.css";

const TinderCards = () => {
  const [data, setData] = useState([]);
  const [ lastDirection, setLastDirection ] = useState(0);
  
  const productApi = "https://fakestoreapi.com/products";
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(productApi);
        let productData = await response.json();
        setData(productData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProduct();
  }, []);

  const swiped = (titleToDelete) => {
    console.log('removing' + titleToDelete)
    setLastDirection(lastDirection + 1);
  }
  
  const outOfFrame = (title) => {
    console.log(title + 'left the screen')
  }
 //sort(() => Math.random()-0.5)
  return (
    <>
      <Grid container sx={{ justifyContent: "center"}}>
        <Grid sx={{justifyContent: "center", display: "flex"}} item >
          {data.map((product) => (
            <TinderCard 
              key={product.id} 
              className="slideCard"
              preventSwipe={["up", "down"]}
              onSwipe={(direction) => swiped(direction, product.title)}
              onCardLeftScreen={() => outOfFrame(product.title)}
            >
              <Grid item className='imageName' sx={{ backgroundImage: `url(${product.image})`}}>
                <Typography className="cardTypography">
                  {product.title}
                </Typography>
              </Grid>
            </TinderCard>
          ))}
        </Grid>
      </Grid>
      <SwipeButtons />
    </>
  )
}

export default TinderCards;