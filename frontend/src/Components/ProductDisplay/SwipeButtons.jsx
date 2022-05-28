import React from 'react'
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PreviewIcon from '@mui/icons-material/Preview';
import ChatIcon from "@mui/icons-material/Chat";
import { Container, IconButton, } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const SwipeButtons = (props) => {
    const data = props.data;
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
        <IconButton style={{ color: "#76e2b3"}}>
            <FavoriteIcon fontSize="large" />
        </IconButton>

        {data.filter((product) => {
            return (
            <IconButton style={{ color: "#915dd1"}}>
                <Link to={"/product/" + product.id}>
                <PreviewIcon fontSize="large" />
                </Link>
            </IconButton>
            )
        })}

        <IconButton sx={{color:"green" }}>
            <ChatIcon fontSize="large" />
        </IconButton>
        </Container>
    </>
  )
}

export default SwipeButtons;