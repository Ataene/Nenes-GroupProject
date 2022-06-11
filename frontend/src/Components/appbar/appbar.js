import {
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import {
  AppbarContainer,
  AppbarHeader,
MyList
} from "../styles/appbar";
//import Actions from "./actions";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useSession } from "../../auth/UserProvider";
import Logout from "../../auth/Logout";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { useUIContext } from "../context/index";
import PostAd from "../PostAdButton";
import SearchBar from "../SearchBar";
import {products} from "../../Components/Data/index";




const Appbar = () => {

  const { setShowSearchBox } = useUIContext();
  const { user } = useSession();

  const navigate = useNavigate();
  const logoutUser = async () => {
    await Logout();
    navigate("/login");
  };
  return (
    <div>
      <AppbarContainer>
        <Container maxWidth="xxl">
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
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <AppbarHeader variant="h4">Hundie Trade</AppbarHeader>
            </Typography>
            <Box
              style={{ textDecoration: "none" }}
              sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}
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
                  <Button sx={{ my: 2, color: "green", alignItem: "center" }}>
                    <LoginIcon />
                    Login
                  </Button>
                </Link>
              </Box>
            )}
            {!!user && (
              <Box sx={{ color: "green", display: "flex" }}>
                <Typography sx={{ marginTop: "10px", paddingRight: "10px" }}>
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
                  sx={{ my: 2, color: "green", alignItem: "center" }}
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