import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Toolbar, Typography, Container, Button, Grid } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";
import { products } from "../Components/Data/index";
import { AuthContext } from "../auth/AuthProvider";
import SearchBar from "./SearchBar";
import { AppbarContainer } from "./styles/appbar";
import { Menu } from "@mui/icons-material";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FirebaseContext } from "../auth/FirebaseProvider";
import HamburgerMenu from "./HamburgerMenu";

const NavBar = (props) => {
  const authContext = useContext(AuthContext);
  const { user, LogoutUser } = authContext;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [usePicture, setUserPicture] = useState();
  const [displayName, setDisplayName] = useState("");
  const [menuOpen, setMenuOpen] = useState("false");
  const [width, setWidth] = useState(window.innerWidth);
  const [smallScreen, setSmallScreen] = useState(isSmallScreen(width));
  function isSmallScreen(width) {
    return width < 700;
  }
  function openHamburger() {
    setMenuOpen((curr) => !curr);
  }

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    setSmallScreen(isSmallScreen(width));
  }, [width]);
  console.log("small screen", smallScreen);
  // useEffect(() => {
  //   if (db && user) {
  //     let collectionRef = collection(db, "users");
  //     let queryRef = query(collectionRef, orderBy("timeStamp"));
  //     const unsubscribe = onSnapshot(queryRef, (querySnap) => {
  //       if (querySnap.empty) {
  //         console.log("Ads not found");
  //       } else {
  //         let usersData = querySnap.docs.map((doc) => {
  //           return { ...doc.data(), DOC_ID: doc.id };
  //         });
  //         setSetAllPostedAds(usersData);
  //         setLoading(true)
  //       }
  //     });
  //     return unsubscribe;
  //   }
  // }, [db, user]);

  useEffect(() => {
    if (db && user) {
      let docRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(docRef, (querySnap) => {
        console.log("onsnapshot --Navbar");
        if (querySnap.empty) {
        } else {
          let usersData = querySnap.data();
          setUserPicture(usersData?.Avatar);
          setDisplayName(usersData?.firstName);
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
  // const NavMenu = styled.div`
  //   display: flex;
  //   align-items: center;
  //   z-index: 200;
  //   width: 100%;

  //   @media screen and (max-width: 768px) {
  //     display: ${(props) => (props.menuOpen ? "flex" : "none")};
  //     flex-direction: ${(props) => (props.menuOpen ? "column" : "row")};
  //     position: ${(props) => (props.menuOpen ? "absolute" : "unset")};
  //     ${(props) =>
  //       props.menuOpen
  //         ? "width: max-content;right: 0; height: 50%;background-color: black;top: 50px;"
  //         : ""}
  //   }
  // `;
  return (
    <AppbarContainer
      sx={{
        backgroundImage:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(27,100,14,1) 0%, rgba(30,114,11,0.03545168067226889) 37%, rgba(32,121,9,0.6615021008403361) 57%, rgba(30,128,28,0) 100%, rgba(0,212,255,1) 100%, rgba(28,135,41,1) 100%, rgba(25,143,70,1) 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 3,
              display: { xs: "flex", md: "flex" },
              fontFamily: '"Montez", "cursive"',
              fontWeight: 700,
              letterSpacing: ".01rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            Hundie
          </Typography>
          {smallScreen && (
            <HamburgerMenu
              menuOpen={menuOpen}
              user={user}
              openHamburger={openHamburger}
              logoutUser={logoutUser}
            />
          )}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              marginLeft: "auto",
            }}
          >
            {!smallScreen && (
              <span sx={{ flexDirection: "row" }}>
                <Box
                  style={{ textDecoration: "none", marginLeft: "auto" }}
                  sx={{ display: { xs: "none", md: "flex", position: "" } }}
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
                  <Link style={{ textDecoration: "none" }} to="/admin">
                    <Button sx={{ my: 2, color: "white", display: "block" }}>
                      Admin
                    </Button>
                  </Link>
                  {user && (
                    <>
                      <Link style={{ textDecoration: "none" }} to="/dashboard">
                        <Button
                          sx={{ my: 2, color: "white", alignItem: "block" }}
                        >
                          Store
                        </Button>
                      </Link>
                    </>
                  )}
                </Box>
              </span>
            )}
            {!user && (
              <>
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
              </>
            )}
            {user && (
              <>
                <SearchBar
                  placeholder="     Enter an item name..."
                  data={products}
                  style={{ marginRight: "auto" }}
                />
                <Typography
                  style={{
                    marginTop: "22px",
                    marginRight: "10px",
                    color: "white",
                  }}
                >
                  Hi, {displayName}
                </Typography>
                <Avatar
                  sx={{ marginTop: "16px" }}
                  alt="User"
                  src={usePicture}
                />
                <Button
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
                </Button>
              </>
            )}
          </Box>
          {smallScreen && <Menu onClick={openHamburger} />}
        </Toolbar>
      </Container>
    </AppbarContainer>
  );
};

export default NavBar;
