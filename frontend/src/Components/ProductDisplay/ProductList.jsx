import {
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
// import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import TinderCards from "./TinderCards";
import SwipeButtons from "./SwipeButtons";

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

  const productStyles = {
    display: "flex",
    flexDirection: "row",
    alignItem: "center", 
    justifyContent: "space-between",
    marginBottom: "50px",
  }

  return (
    <>
      <Container style={productStyles}>
        <IconButton>
          <PersonIcon fontSize="large" />
        </IconButton>
          <Typography variant="h3">HundiePay</Typography>
        <IconButton>
          <ChatIcon fontSize="large" className="headerIcon" />
        </IconButton>
      </Container>
      <Container>
        <TinderCards />
      </Container>
      <Container>
        <SwipeButtons data={data} />
      </Container>
    </>
  );
};


{/* <div style={{marginTop: "10px", marginBottom: "20px"}}>
  <Container>
    <Grid container>
      <Grid item spacing={3}>
      <Button style={{marginRight: "5px"}} variant="contained" color="success" onClick={() => setFilter(data)}>All</Button>
      <Button style={{marginRight: "5px"}} variant="contained" color="success" onClick={() => handleFilter("Men's")}>Men's</Button>
      <Button style={{marginRight: "5px"}} variant="contained" color="success" onClick={() => handleFilter("Women's")}>Women's</Button>
      <Button style={{marginRight: "5px"}} variant="contained" color="success" onClick={() => handleFilter("Jewelry")}>Jewelry</Button>
      <Button style={{marginRight: "5px"}} variant="contained" color="success" onClick={() => handleFilter("Electronic")}>Electronics</Button>
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
              <Link to={"/product/" + product.id}>
                <PreviewIcon />
               </Link>
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
</div> */}

export default ProductList;
