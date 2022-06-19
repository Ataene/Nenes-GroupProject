import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Toolbar, Typography, Container, Button, Grid } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import {products} from "../Components/Data/index";
import { AuthContext  } from '../auth/AuthProvider'
// import PostAd from "./PostAdButton";
import SearchBar from "./SearchBar";

const Navigation = () => {

  const authContext = useContext(AuthContext)
  const { user, LogoutUser } = authContext;
  const navigate = useNavigate();
  const logoutUser = async () => {
    await LogoutUser();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="a" href="/"
            sx={{ mr: 3, display: { xs: "none", md: "flex" }, fontFamily: "monospace", fontWeight: 700, letterSpacing: ".01rem", color: "#EC994B", textDecoration: "none", }}>
            HUNDIE
          </Typography>
          <Box
            style={{ textDecoration: "none", marginLeft: "auto" }}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Home
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/products">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Products
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
            {user && (
            <>
              <Link style={{ textDecoration: "none" }} to="/profile">
                <Button sx={{ my: 2, color: "white", alignItem: "block" }}>
                  Profile
                </Button>
              </Link>
            </>
          )}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, marginLeft: "auto" }}>
          {!user && (
            <>
              <Link style={{ textDecoration: "none" }} to="/login">
                <Button sx={{ my: 2, color: "white", alignItem: "center" }}>
                  <LoginIcon />
                  Login
                </Button>
              </Link>
            </>
          )}
          {user && (
            <>
              <SearchBar 
                placeholder="   Enter an item name..."
                data={products}
              style={{marginRight: "auto"}} />
              <Typography style={{marginTop: "22px", marginRight: "10px"}}>Hi, {user.displayName}</Typography>
              <Avatar sx={{ marginTop: "16px"}} alt="User" src="/static/images/avatar/1.jpg" />
              <Button
                sx={{ my: 2, color: "white", alignItem: "center", marginLeft: "10px" }}
                onClick={logoutUser}
              >
                <ExitToAppIcon />
                Logout
              </Button>
            </>
          )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
