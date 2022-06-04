import React from "react";
import { Container, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

 const Footer = () => {
  const year = () => { 
    const date = new Date();
    return date.getFullYear();
  }
  return (
    <>
    <Container sx={{ justifyContent: "space-between", marginTop: "5rem" }}>
      <Container  sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginBottom: "3rem"}}>
        <Typography><Link to="/" >Home</Link></Typography>
        <Typography><Link to="/features" >Features</Link></Typography>
        <Typography><Link to="/pricing" >Pricing</Link></Typography>
        <Typography><Link to="/about" >About</Link></Typography>
      </Container>
      <Container sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
        <Typography variant="h6"> &copy; {year()} <Link to="https://www.inceptionu.com/" rel="noopener noreferrer" target="_blank" >InceptionU</Link>, All rights reserved</Typography>
        <IconButton>
          <GitHubIcon sx={{color: "blue"}} />
        </IconButton>
        <IconButton sx={{color: "red"}}>
          <LinkedInIcon />
        </IconButton>
        <IconButton sx={{color: "green"}}>
          <FacebookIcon />
        </IconButton>
        <IconButton sx={{color: "blue"}}>
          <TwitterIcon />
        </IconButton>
      </Container>
    </Container>
    </>
  );
}

export default Footer;