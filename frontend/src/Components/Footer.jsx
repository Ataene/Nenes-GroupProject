import { Container, IconButton, Typography, Grid } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
class Footer extends Component {
  year = () => {
    let d = new Date();
    return d.getFullYear();
  };

  render() {
    // position: "fixed", bottom: 0}}

    return (
      <Grid container sx={{ bottom: "0", justifyContent: "space-between", position: "fixed" }}>
        <Container  sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
          <Typography><Link to="/" >Home</Link></Typography>
          <Typography><Link to="/features" >Features</Link></Typography>
          <Typography><Link to="/pricing" >Pricing</Link></Typography>
          <Typography><Link to="/about" >About</Link></Typography>
        </Container>
      
        <Container sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
          <p> &copy; {this.year()}<a href="https://www.inceptionu.com/" rel="noopener noreferrer" target="_blank" >inceptionU</a>, All rights reserved</p>
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
      </Grid>
    );
  }
}

export default Footer;