import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import { Box, makeStyles, Avatar, TextField, Paper } from "@material-ui/core";
import { Typography, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import loginImage from "../../images/signupPage.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(1),
    },
  },
}));

const Login = () => {
  const authContext = useContext(AuthContext);
  const {
    authError,
    forgotPassword,
    loading,
    signInUser,
    gitHub,
    google,
    facebook,
    twitter,
  } = authContext;
  const navigate = useNavigate();

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInUser(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  const githubLogin = async () => {
    try {
      const gitHubUser = await gitHub();
      if (gitHubUser) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("GitHub Auth Failed");
    }
  };

  const facebookLogin = async () => {
    try {
      const facebookUser = await facebook();
      if (facebookUser) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Failed");
    }
  };

  const twitterLogin = async () => {
    try {
      const twitterUser = await twitter();
      if (twitterUser) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Twitter Auth Failed");
    }
  };

  const googleLogin = async () => {
    try {
      const googleUser = await google();
      if (googleUser) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Google Auth Failed");
    }
  };

  // const back = {
  //   backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
  // };

  return (
    <div>
      <form
        className={classes.root}
        onSubmit={handleSubmit}
        style={{
          backgroundImage: "linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)",
          // backgroundImage: " linear-gradient(to top, #b3ffab 0%, #12fff7 100%)",
          // backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Paper
          // elevation={10}
          // style={{
          //   display: "flex",
          //   alignItems: "center",
          //   flexDirection: "column",
          //   background: "rgba(255, 255, 255, 0.15)",
          //   boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          //   backdropFilter: "blur(8.5px)",
          //   webkitBackdropFilter: "blur(8.5px)",
          //   borderRadius: "10px",
          //   color: "#ffffff",
          //   textTransform: "uppercase",
          //   letterSpacing: "0.4rem",
          //   mobile: { minWidth: "500", width: "80vw", height: "90vh" },
          //   tablet: { minWidth: "800", width: "80vw", height: "80vh" },
          //   desktop: { minWidth: "1280", width: "80vw", height: "50vh" },
          //   largeDesktop: { minWidth: "1600", width: "30vw", height: "80vh" },
          // }}
        >
          <br />
          <Typography
            variant="h5"
            style={{ fontFamily: "Montserrat", fontSize: "20px", marginLeft: "150px"}}
          >
            User Login
          </Typography>

          {/* <Avatar style={avatarStyle} sx={{ marginLeft: "120px"}} /> */}
          <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {authError && (
            <Typography variant="h6" style={{ color: "red" }}>
              {authError}
            </Typography>
          )}
          <Box>
            <Button variant="contained">Cancel</Button>
            {loading && (
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            )}
            {!loading && (
              <Button type="submit" variant="contained" color="primary">
                Login...
              </Button>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h5"
              onClick={() => forgotPassword()}
              sx={{ paddingLeft: "7rem", color: "white", fontSize: "15px" }}
            >
              Forget Password
            </Typography>{" "}
            <hr />
            <Typography
              variant="h6"
              sx={{ paddingLeft: "8rem", color: "blue", fontSize: "15px" }}
            >
              Or Login in with
            </Typography>
            <Button
              onClick={githubLogin}
              variant="contained"
              sx={{
                backgroundColor: " #171515",
                display: "flex",
                width: "20rem",
              }}
            >
              <GitHubIcon sx={{ margin: "5px" }} />
              Github
            </Button>
            <Button
              onClick={facebookLogin}
              variant="contained"
              sx={{ display: "flex", width: "20rem" }}
            >
              <FacebookIcon sx={{ margin: "5px" }} />
              Facebook
            </Button>
            <Button
              onClick={googleLogin}
              variant="contained"
              sx={{ display: "flex", width: "20rem", backgroundColor: "black" }}
            >
              <GoogleIcon sx={{ margin: "5px", color: "red" }} />
              Google
            </Button>
            <Button
              onClick={twitterLogin}
              variant="contained"
              sx={{ display: "flex", width: "20rem" }}
            >
              <TwitterIcon sx={{ margin: "5px" }} />
              Twitter
            </Button>
          </Box>
        </Paper>
        <Typography
          variant="h5"
          style={{ fontFamily: "Montserrat", color: "white" }}
        >
          New to HundieTrade?
        </Typography>
        <Box>
          <Link
            to="/signup"
            style={{ textDecoration: "none", fontSize: "16px" }}
          >
            <Button variant="contained">Create your HundieTrade Account</Button>
          </Link>
        </Box>
        {/* </Paper> */}
        <Box>
          <br />
          <Typography
            variant="h5"
            style={{
              fontFamily: "Montserrat",
              color: "white",
              fontSize: "12px",
            }}
          >
            © 2022, HundieTrade.com, Inc. or its affiliates
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default Login;