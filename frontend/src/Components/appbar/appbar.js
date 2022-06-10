import {
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
} from "@mui/material";
import {
  AppbarContainer,
  AppbarHeader,
} from "../styles/appbar";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
//import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import Avatar from '@mui/material/Avatar';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useUserContext  } from '../../auth/userContextProvider'

export default function Appbar() {

  const { LogoutUser, user } = useUserContext();
  const navigate = useNavigate();

  const logoutUser = async() => {
    await LogoutUser();
    navigate("/login");
  }

  return (
    <AppbarContainer>
      <AppbarHeader variant="h4">Hundie Trade</AppbarHeader>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex"},
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "green",
              textDecoration: "none",
            }}
          >
            Home
          </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              ></IconButton>
          </Box>
          <Box
            style={{ textDecoration: "none" }}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Link style={{ textDecoration: "none" }} to="/products">
              <Button sx={{ my: 2, color: "green", display: "block" }}>
                Products
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/pricing">
              <Button sx={{ my: 2, color: "green", display: "block" }}>
                Pricing
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/blog">
              <Button sx={{ my: 2, color: "green", display: "block" }}>
                Blog
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/about">
              <Button sx={{ my: 2, color: "green", display: "block" }}>
                About
              </Button>
            </Link>
          </Box>
          {!user && <Box style={{ textDecoration: "none" }} sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Link style={{ textDecoration: "none" }} to="/login">
                <Button sx={{ my: 2, color: "green", alignItem: "center" }}>
                  <LoginIcon />Login
                </Button>
              </Link>
            </Box>}
            {!!user && <Box sx={{color: 'green', display: "flex" }}>
            <Typography sx={{marginTop: "10px", paddingRight: "10px"}}>
              Hello, {user.displayName} 
            </Typography>
              <Avatar alt="User" src="/static/images/avatar/1.jpg" />
            </Box>
            }
            {!!user && <Box style={{ textDecoration: "none", marginLeft: "10px" }} sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                <Button sx={{ my: 2, color: "green", alignItem: "center" }} onClick={logoutUser}>
                  <ExitToAppIcon />Logout
                </Button>
            </Box>}
        </Toolbar>
      </Container>
    </AppbarContainer>
  );
}
