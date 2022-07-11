import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Toolbar, Typography, Container, Button, Grid } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";
import { products } from "../Components/Data/index";
import { AuthContext } from "../auth/AuthProvider";
// import PostAd from "./PostAdButton";
import SearchBar from "./SearchBar";
import styled, { createGlobalStyle } from "styled-components";

const NBar = () => {
  const authContext = useContext(AuthContext);
  const { user, LogoutUser } = authContext;
  const navigate = useNavigate();
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);
  const logoutUser = async () => {
    await LogoutUser();
    navigate("/login");
  };
  useEffect(() => {
    /* Close the drawer when the user clicks outside of it */
    const closeDrawer = (event) => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }

      toggleDrawer(false);
    };

    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);

  return (
    <Styles.Wrapper>
      <CSSReset />

      <Navbar.Wrapper>
        {/* <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters> */}
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 3,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".01rem",
            color: "#EC994B",
            textDecoration: "none",
          }}
        >
          HUNDIE
        </Typography>
        <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
          <HamburgerButton.Lines />
        </HamburgerButton.Wrapper>
        <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
          {/* <Box
                  style={{ textDecoration: "none", marginLeft: "auto" }}
                  sx={{ display: { xs: "none", md: "flex" } }}
                > */}
          <Link style={{ textDecoration: "none" }} to="/">
            <Navbar.Item sx={{ my: 2, color: "white", display: "block" }}>
              Home
            </Navbar.Item>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/howitworks">
            <Navbar.Item sx={{ my: 2, color: "white", display: "block" }}>
              How it Works
            </Navbar.Item>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/products">
            <Navbar.Item sx={{ my: 2, color: "white", display: "block" }}>
              Products
            </Navbar.Item>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/blog">
            <Navbar.Item sx={{ my: 2, color: "white", display: "block" }}>
              Blog
            </Navbar.Item>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/addlocation">
            <Navbar.Item sx={{ my: 2, color: "white", display: "block" }}>
              Map
            </Navbar.Item>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/about">
            <Navbar.Item sx={{ my: 2, color: "white", display: "block" }}>
              About
            </Navbar.Item>
          </Link>
          {user && (
            <>
              <Link style={{ textDecoration: "none" }} to="/profile">
                <Navbar.Item sx={{ my: 2, color: "white", alignItem: "block" }}>
                  Profile
                </Navbar.Item>
              </Link>
            </>
          )}
          {/* </Box> */}
          {/* <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    marginLeft: "auto",
                  }}
                > */}
          {!user && (
            <>
              <Link style={{ textDecoration: "none" }} to="/login">
                <Navbar.Item
                  sx={{ my: 2, color: "white", alignItem: "center" }}
                >
                  <LoginIcon />
                  Login
                </Navbar.Item>
              </Link>
            </>
          )}
          {user && (
            <>
              <SearchBar
                placeholder="   Enter an item name..."
                data={products}
                style={{ marginRight: "auto" }}
              />
              <Typography style={{ marginTop: "22px", marginRight: "10px" }}>
                Hi, {user.displayName}
              </Typography>
              <Avatar
                sx={{ marginTop: "16px" }}
                alt="User"
                src="/static/images/avatar/1.jpg"
              />
              <Navbar.Item
                sx={{
                  my: 2,
                  color: "white",
                  alignItem: "center",
                  marginLeft: "10px",
                }}
                onClick={logoutUser}
              >
                <ExitToAppIcon />
                Logout
              </Navbar.Item>
            </>
          )}
          {/* </Box> */}
        </Navbar.Items>
        {/* </Toolbar>
          </Container> */}
        {/* </AppBar> */}
      </Navbar.Wrapper>
    </Styles.Wrapper>
  );
};

const Styles = {
  Wrapper: styled.main`
    display: flex;
    background-color: #eeeeee;
  `,
};

const Navbar = {
  Wrapper: styled.nav`
    flex: 1;

    align-self: flex-start;

    padding: 1rem 3rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: white;

    // 40em == 640px
    @media only screen and (max-width: 40em) {
      position: fixed;
      width: 100vw;
      bottom: 0;
    }
  `,
  Logo: styled.h1`
    border: 1px solid gray;
    padding: 0.5rem 1rem;
  `,
  Items: styled.ul`
    display: flex;
    list-style: none;

    @media only screen and (max-width: 40em) {
      position: fixed;
      right: 0;
      top: 0;

      height: 100%;

      flex-direction: column;

      background-color: white;
      padding: 1rem 2rem;

      transition: 0.2s ease-out;

      transform: ${({ openDrawer }) =>
        openDrawer ? `translateX(0)` : `translateX(100%)`};
    }
  `,
  Item: styled.li`
    padding: 0 1rem;
    cursor: pointer;

    @media only screen and (max-width: 40em) {
      padding: 1rem 0;
    }
  `,
};

const HamburgerButton = {
  Wrapper: styled.button`
    height: 3rem;
    width: 3rem;
    position: relative;
    font-size: 12px;

    display: none;

    @media only screen and (max-width: 40em) {
      display: block;
    }

    /* Remove default button styles */
    border: none;
    background: transparent;
    outline: none;

    cursor: pointer;

    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 150%;
      width: 150%;
      top: -25%;
      left: -25%;
    }
  `,
  Lines: styled.div`
    top: 50%;
    margin-top: -0.125em;

    &,
    &:after,
    &:before {
      /* Create lines */
      height: 2px;
      pointer-events: none;
      display: block;
      content: "";
      width: 100%;
      background-color: black;
      position: absolute;
    }

    &:after {
      /* Move bottom line below center line */
      top: -0.8rem;
    }

    &:before {
      /* Move top line on top of center line */
      top: 0.8rem;
    }
  `,
};

const CSSReset = createGlobalStyle`
  *,
  *::before, 
  *::after {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; /*1rem = 10px*/
    box-sizing: border-box;      
  }  

  body {
    font-size: 1.4rem;
    font-family: sans-serif;
  }
`;
export default NBar;
