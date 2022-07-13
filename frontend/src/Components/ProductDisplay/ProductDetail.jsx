import { Container, Typography, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ChatIcon from "@mui/icons-material/Chat";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductDetail = () => {
  const params = useParams();
  const id = params.id;
  const [productInfo, setProductInfo] = useState([]);
  const productApi = `https://fakestoreapi.com/products/${id}`;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(productApi);
        let productData = await response.json();
        setProductInfo(productData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProduct();
  }, [id]);
  return (
    <Container style={{ outline: "20px solid red" }}>
      <Grid
        container
        sx={{ display: "flex", flexDirection: "row", margin: "10px" }}
      >
        <Grid item md={6}>
          <img
            height="350"
            width="350"
            src={productInfo.image}
            alt={productInfo.title}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography variant="h4">{productInfo.category}</Typography>
          <Typography variant="h5">{productInfo.title}</Typography>
          <p>
            Ratings {productInfo.rating && productInfo.rating.rate}
            <StarOutlineIcon />
          </p>
          <Typography variant="h4">NenesPay ${productInfo.price}</Typography>
          <p>{productInfo.description}</p>
          <IconButton color="success" aria-label="add to cart">
            <ChatIcon />
          </IconButton>
          <IconButton color="success" aria-label="add to cart">
            <AddShoppingCartIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;