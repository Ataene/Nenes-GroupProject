import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";


const HamburgerMenu = ({ user, menuOpen, openHamburger, logoutUser }) => {
  return (
    <Box
      style={{
        textDecoration: "none",
        marginLeft: "auto",
        display: { xs: "none", md: "flex" },
      }}
      menuOpen={menuOpen}
    >
      <div
        style={{
          display: menuOpen ? "inline" : "none",
          position: "absolute",
          backgroundColor: "green",
          right: "0",
          top: "50px",
          zIndex: "200",
        }}
      >
        <Link style={{ textDecoration: "none" }} to="/" onClick={openHamburger}>
          <Button sx={{ my: 2, color: "white", display: "block" }}>Home</Button>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/products"
          onClick={openHamburger}
        >
          <Button sx={{ my: 2, color: "white", display: "block" }}>
            Products
          </Button>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/maps"
          onClick={openHamburger}
        >
          <Button sx={{ my: 2, color: "white", display: "block" }}>Map</Button>
        </Link>
        {/* <Link
          style={{ textDecoration: "none" }}
          to="/blog"
          onClick={openHamburger}
        >
          <Button sx={{ my: 2, color: "white", display: "block" }}>Blog</Button>
        </Link> */}
        {/* <Link
          style={{ textDecoration: "none" }}
          to="/maps"
          onClick={openHamburger}
        >
          <Button sx={{ my: 2, color: "white", display: "block" }}>Map</Button>
        </Link> */}
        <Link
          style={{ textDecoration: "none" }}
          to="/about"
          onClick={openHamburger}
        >
          <Button sx={{ my: 2, color: "white", display: "block" }}>
            About
          </Button>
        </Link>
        {user && (
          <>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard"
              onClick={openHamburger}
            >
              <Button sx={{ my: 2, color: "white", alignItem: "block" }}>
                Store
              </Button>
            </Link>
            <Button
              sx={{
                my: 2,
                color: "white",
                alignItem: "center",
                marginLeft: "10px",
                display: "block",
              }}
              onClick={logoutUser}
            >
              <ExitToAppIcon />
              Logout
            </Button>
          </>
        )}
        {!user && (
          <Link
            style={{ textDecoration: "none" }}
            to="/login"
            // onClick={openHamburger}
          >
            <Button sx={{ my: 2, color: "white", alignItem: "center" }}>
              <LoginIcon />
              Login
            </Button>
          </Link>
        )}
      </div>
    </Box>
  );
};

export default HamburgerMenu;
