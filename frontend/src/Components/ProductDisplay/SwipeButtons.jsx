import React, { useEffect, useState } from 'react'
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PreviewIcon from '@mui/icons-material/Preview';
import ChatIcon from "@mui/icons-material/Chat";
import { Container, IconButton, } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';


const SwipeButtons = () => {
    const params = useParams()
    const id = params.id;
    const [ productInfo, setProductInfo ] = useState([]);
    const navigate = useNavigate();

    const productApi = `https://fakestoreapi.com/products/${id}`;

    useEffect(() => {
        const getProduct = async () => {
            try {
              const response = await fetch(productApi);
              let productData = await response.json();
              setProductInfo(productData);
              console.log(productInfo);
            } catch (error) {
              console.log(error.message);
            }
          };
          getProduct({id});
    }, [id]);
    const swipeIconButtons = {
        position: "fixed",
        bottom: "10vh",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
    } 
  return (
    <>
        <Container style={swipeIconButtons}>
            <IconButton style={{ color: "#f5b748"}}>
                <ReplayIcon fontSize="large" />
            </IconButton>
            <IconButton style={{ color: "#ec5e6f"}}>
                <CloseIcon fontSize="large" />
            </IconButton>
            <IconButton style={{ color: "#62b4f9"}}>
                <ShareIcon fontSize="large" />
            </IconButton>
            <IconButton style={{ color: "red"}}>
                <FavoriteIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={() => (<ProductDetail />)} style={{ color: "#915dd1"}}>
                <PreviewIcon fontSize="large" />
            </IconButton>
            <IconButton sx={{color:"green" }}>
                <ChatIcon fontSize="large" />
            </IconButton>
        </Container>
    </>
  )
}

export default SwipeButtons;