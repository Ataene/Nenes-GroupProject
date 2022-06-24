import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Toolbar, Typography, Container, Button, Grid } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import {products} from "../Components/Data/index";
import { AuthContext  } from '../auth/AuthProvider'
import SearchBar from "./SearchBar";
import { AppbarContainer } from "./styles/appbar";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { FirebaseContext } from "../auth/FirebaseProvider";

const Navigation = () => {
  const authContext = useContext(AuthContext)
  const { user, LogoutUser } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [ usePicture, setUserPicture ] = useState();

  useEffect(() => {
console.log(user)
    if (db && user) {
      let docRef = doc(db, "users", user.uid);

      const unsubscribe = onSnapshot(docRef, (querySnap) => {

        if (querySnap.empty) {
          console.log("Ads not found");
        } else {
          let usersData = querySnap.data()
          setUserPicture(usersData.Avatar);
        }
      });
      return unsubscribe;
    }
  }, [db, user]);
  const navigate = useNavigate();
  const logoutUser = async () => {
    await LogoutUser();
    navigate("/login");
  };

  return (
    <AppbarContainer >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h4" noWrap component="a" href="/"
            sx={{ mr: 3, display: { xs: "none", md: "flex" }, fontFamily: '"Montez", "cursive"', fontWeight: 700, letterSpacing: ".01rem", color: "white", textDecoration: "none", }}>
            Hundie
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
            <Link style={{ textDecoration: "none" }} to="/maps">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Map
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
                placeholder="Enter an item name..."
                data={products}
              style={{marginRight: "auto"}} />
              <Typography style={{marginTop: "22px", marginRight: "10px"}}>Hi, {user.displayName}</Typography>
              <Avatar sx={{ marginTop: "16px"}} alt="User" src={usePicture} />
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
    </AppbarContainer>
  );
};

export default Navigation;
