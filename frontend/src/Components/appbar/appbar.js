import {
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import {
  AppbarContainer,
} from "../styles/appbar";
//import Actions from "./actions";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";
import PostAd from "../PostAdButton";
import SearchBar from "../SearchBar";
import {products} from "../../Components/Data/index";

import { AuthContext  } from '../../auth/AuthProvider'

const Appbar = () => {
  const authContext = useContext(AuthContext)
  const { user, LogoutUser } = authContext;
  const navigate = useNavigate();
  
  const logoutUser = async () => {
    await LogoutUser();
    navigate("/login");
  };
  return (
    <div>
      <AppbarContainer>
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <Box>
              <Typography
                variant="h2"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: '"Montez", "cursive"',
                  fontSize: "3em",
                  letterSpacing: ".1rem",
                  color: "green",
                }}
              >
                Hundie Trade
              </Typography>
            </Box>
            <Box
              style={{ textDecoration: "none", marginLeft: "20rem" }}
              sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}
            >
              <Link style={{ textDecoration: "none" }} to="/">
                <Button sx={{ my: 2, color: "green", display: "block",fontFamily:"Montserrat" }}>
                  Home
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/products">
                <Button sx={{ my: 2, color: "green", display: "block",fontFamily:"Montserrat" }}>
                  Products
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/pricing">
                <Button sx={{ my: 2, color: "green", display: "block",fontFamily:"Montserrat" }}>
                  Pricing
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/blog">
                <Button sx={{ my: 2, color: "green", display: "block",fontFamily:"Montserrat" }}>
                  Blog
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/about">
                <Button sx={{ my: 2, color: "green", display: "block",fontFamily:"Montserrat" }}>
                  About
                </Button>
              </Link>
            </Box>



            {!user && (
              <Box
                style={{ textDecoration: "none" }}
                sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}
              ></Box>
            )}
            {!user && (
              <Box
                style={{ textDecoration: "none" }}
                sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}
              >
                <SearchBar
                  placeholder="Enter an item name..."
                  data={products}
                />
                <Link style={{ textDecoration: "none" }} to="/postad">
                  <Button sx={{ my: 2, color: "green", alignItem: "center" }}>
                    <PostAd />
                  </Button>
                </Link>

                <Link style={{ textDecoration: "none" }} to="/login">
                  <Button sx={{ my: 2, color: "green", alignItem: "center",fontFamily:"Montserrat" }}>
                    <LoginIcon />
                    Login
                  </Button>
                </Link>
              </Box>
            )}
            {!!user && (
              <Box sx={{ color: "green", display: "flex" }}>
                <Typography sx={{ marginTop: "10px", paddingRight: "10px",fontFamily:"Montserrat" }}>
                  Hello, {user.displayName}
                </Typography>
                <Avatar alt="User" src="/static/images/avatar/1.jpg" />
              </Box>
            )}
            {!!user && (
              <Box
                style={{ textDecoration: "none", marginLeft: "10px" }}
                sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}
              >
                <Button
                  sx={{ my: 2, color: "green", alignItem: "center",fontFamily:"Montserrat" }}
                  onClick={logoutUser}
                >
                  <ExitToAppIcon />
                  Logout
                </Button>
              </Box>
            )}


          </Toolbar>
        </Container>
      </AppbarContainer>
    </div>
  );
};

export default Appbar;