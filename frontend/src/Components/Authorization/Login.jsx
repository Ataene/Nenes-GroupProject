import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import { Box, makeStyles, Avatar, TextField, Paper } from "@material-ui/core";
import { Typography, Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "500px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(1),
    },
    // backgroundColor: "#e4f8ef",
    // backgroundImage: [
    //   url(
    //     "data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e4e8fa' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
    //   ),
    // ],
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

  const back = {
    backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
  }

  return (
    <div className={classes.root} style={back}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Typography variant="h4">User Login</Typography> <br />
        <Avatar style={avatarStyle}></Avatar>
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
              sx={{ paddingLeft: "7rem", color: "green" }}
            >
              Forget Password
            </Typography>{" "}
            <hr />
            <Typography
              variant="h6"
              sx={{ paddingLeft: "8rem", color: "blue" }}
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
              sx={{ display: "flex", width: "20rem", backgroundColor: "green" }}
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
        </form>
        <Typography variant="h5">New to HundieTrade?</Typography>
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
        <Typography variant="h5">
          © 2022, HundieTrade.com, Inc. or its affiliates
        </Typography>
      </Box>
    </div>
  );
};

export default Login;
