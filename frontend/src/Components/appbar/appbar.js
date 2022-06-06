import {
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
} from "@mui/material";
import {
  AppbarActionIcons,
  AppbarContainer,
  AppbarHeader,
  MyList,
} from "../styles/appbar";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//import Actions from "./actions";
import { useUIContext } from "../context/index";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
//import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";


export default function Appbar() {
  const { setShowSearchBox } = useUIContext();

  return (
    <AppbarContainer>
      <AppbarHeader variant="h4">Hundie Pay</AppbarHeader>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
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
            <Link style={{ textDecoration: "none" }} to="/dashboard">
              <Button sx={{ my: 2, color: "green", display: "block" }}>
                Dashboard
              </Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link style={{ textDecoration: "none" }} to="/login">
              <Button sx={{ my: 2, color: "green", alignItem: "center" }}>
                <LoginIcon />
                Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppbarContainer>
  );
}
