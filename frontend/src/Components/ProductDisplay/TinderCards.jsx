import React, { useEffect, useState } from 'react'
import { Typography, Grid, Container, } from "@mui/material";

import TinderCard from 'react-tinder-card';

const TinderCards = () => {
  const [data, setData] = useState([]);

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

  const swiped = (direction, imageToDelete) => {
    console.log('removing' + direction)
  }
  
  const outOfFrame = (image) => {
    console.log(image + 'left the screen')
  }

  return (
    <>
      <Container classname="mainCards">
        <Grid className="gridCard" item >
          {data.sort(() => Math.random()-0.5).map((product) => (
            <TinderCard 
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, product.image)}
              onCardLeftScreen={() => outOfFrame(product.image)}
              key={product} 
              className="slideCard"
            >
              <div className='imageName' style={{ backgroundImage: `url(${product.image})`}}>
                <Typography className="cardTypography">
                  {product.title}
                </Typography>
              </div>
            </TinderCard>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default TinderCards;