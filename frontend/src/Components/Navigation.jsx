import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Toolbar, Typography, Container, Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSession } from "../auth/UserProvider";
import Logout from "../auth/Logout";
import Avatar from '@mui/material/Avatar';

const Navigation = () => {

  const { user } = useSession();
  const navigate = useNavigate()
  const logoutUser = async() => {
    await Logout();
    navigate("/login")
  }
  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap component="a" href="/"
              sx={{ mr: 2, display: { xs: "none", md: "flex" }, fontFamily: "monospace", fontWeight: 700, letterSpacing: ".3rem", color: "inherit", textDecoration: "none", }}>
              HundieTrade
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
            </Box>
            {!user && <Box style={{ textDecoration: "none" }} sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Link style={{ textDecoration: "none" }} to="/login">
                <Button sx={{ my: 2, color: "white", alignItem: "center" }}>
                  <LoginIcon />Login
                </Button>
              </Link>
            </Box>}
            {!!user && <Box sx={{color: 'yellow', display: "flex" }}>
            <Typography sx={{marginTop: "10px", paddingRight: "10px"}}>
              Hello, {user.displayName} 
            </Typography>
              <Avatar alt="User" src="/static/images/avatar/1.jpg" />
            </Box>
            }
            {!!user && <Box style={{ textDecoration: "none", marginLeft: "10px" }} sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                <Button sx={{ my: 2, color: "white", alignItem: "center" }} onClick={logoutUser}>
                  <ExitToAppIcon />Logout
                </Button>
            </Box>}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navigation;
