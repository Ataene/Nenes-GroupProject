import {
  Button,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import PreviewIcon from '@mui/icons-material/Preview';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductList = () => {

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
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

  const handleFilter = (filtering) => {
    const updatedProduct = data.filter((item) => item.category === filtering);
    setFilter(updatedProduct);
  };

  return (
    <>
    <div style={{marginTop: "10px", marginBottom: "20px"}}>
    <Container>
        <Grid container>
        <Grid item spacing={3}>
        <Button style={{marginRight: "5px"}} variant="contained" color="success" onClick={() => setFilter(data)}>All</Button>
        <Button style={{marginRight: "5px"}} variant="contained" color="success" onClick={() => handleFilter("men's")}>Men's</Button>
        <Button style={{marginRight: "5px"}} variant="contained" color="success" onClick={() => handleFilter("women's")}>Women</Button>
        <Button style={{marginRight: "5px"}} variant="contained" color="success" onClick={() => handleFilter("jewelry")}>Jewelry</Button>
        <Button style={{marginRight: "5px"}} variant="contained" color="success" onClick={() => handleFilter("electronic")}>Electronics</Button>
        </Grid>
        </Grid>
    </Container>
    </div>
    <div>

      <Container>
        <Grid container spacing={3}>
          {filter.map((product) => (
            <Grid item key={product} xs={12} sm={6} md={3}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardHeader title={product.title.substring(0, 10)} />
                <CardMedia
                  component="img"
                  height="270"
                  width="250"
                  image={product.image}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h6" color="text.secondary">
                    NenePay ${product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton color="error" aria-label="add to favorites">
                    <FavoriteIcon  />
                  </IconButton>
                  <IconButton color="primary" aria-label="share">
                    <ShareIcon  />
                  </IconButton>
                  <IconButton color="success" aria-label="chat">
                    <ChatIcon />
                  </IconButton>
                  <IconButton color="primary" aria-label="preview">
                    <PreviewIcon />
                  </IconButton>
                  <IconButton color="success" aria-label="add to cart">
                    <AddShoppingCartIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
    </>
  );
};

export default ProductList;
