import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
<<<<<<< HEAD
import { Toolbar, Typography, Container, Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
=======
import { Toolbar, IconButton, Typography, Container, Button } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LoginIcon from '@mui/icons-material/Login';

>>>>>>> c752cc006c6325735e1b6c83b4beb9d057a18ffd

const Navigation = () => {
  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap component="a" href="/"
              sx={{ mr: 2, display: { xs: "none", md: "flex" }, fontFamily: "monospace", fontWeight: 700, letterSpacing: ".3rem", color: "inherit", textDecoration: "none", }}>
              NenesPay
            </Typography>
            <Box
              style={{ textDecoration: "none" }}
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              <Link style={{ textDecoration: "none" }} to="/products">
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Products
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/pricing">
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Pricing
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/blog">
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Blog
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/about">
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  About
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/dashboard">
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Dashboard
                </Button>
              </Link>
            </Box>
<<<<<<< HEAD
            <Box style={{ textDecoration: "none" }} sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
=======
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
>>>>>>> c752cc006c6325735e1b6c83b4beb9d057a18ffd
              <Link style={{ textDecoration: "none" }} to="/login">
                <Button sx={{ my: 2, color: "white", alignItem: "center" }}>
                  <LoginIcon />Login
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navigation;
