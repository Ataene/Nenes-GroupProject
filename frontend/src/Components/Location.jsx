import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Button, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import postalImage from "../images/postalImage.png"
import {products} from "./Data/index"

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

export default function NestedModal() {
  const [open, setOpen] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/wishlist")
  }
  
  return (
    <div>
      <Button onClick={handleOpen}>Trade Preferences</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <form onSubmit={handleSubmit}>
          <TextField placeholder="Enter your Postal Code" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          <Button type='submit'>Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}


export const Location = () => {

  const navigate = useNavigate();
  const [postalCode, setPostalCode] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/location/nearme");
  }

  return(
    <>
      <Container>
        <Typography variant='h4' style={{color: "green"}}>A socail market place to trade your unused items under Hundred</Typography>
        <Box sx={{marginLeft: "20rem"}}>
          <img src={postalImage}/>
        </Box>
        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }, marginLeft: "25rem", marginTop: "2rem", }} noValidate autoComplete="off">
          <form onSubmit={handleSubmit}>
            <TextField sx={{width: "25rem"}} placeholder="Enter Your Postal Code" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            <Button pattern="^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$" type='submit' sx={{backgroundColor: "yellow"}}>Postal Code</Button>
          </form>
        </Box>
      </Container>
    </>
  )
}

export const NearMe = () => {

  const [cardClicked, setCardClicked ] = useState();
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