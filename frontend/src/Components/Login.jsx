import React, { useState } from "react";
import { Box, makeStyles, Avatar, TextField } from "@material-ui/core";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import signin from "../auth/signin";
import { gitHub, facebook, twitter, google } from "../auth/gitHub";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

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
  },
}));

const Login = () => {

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user;
    try {
      user = await signin(email, password);
    } catch (error) {
      setError(error.message);
    }

    if(user){
      setIsPending(true)
      navigate(`/profile`)
    } else {
      setError("Invalid email and password");
    }
  };

  const githubLogin = async () => {
    try {
      const gitHubUser = await gitHub();
      if(gitHubUser){
        setIsPending(true)
        navigate("/profile")
      }
    } catch (error) {
      setError("GitHub Auth Failed");
    }
  }

  const facebookLogin = async () => {
    try {
      const facebookUser = await facebook();
      if(facebookUser){
        setIsPending(true)
        navigate("/profile")
      }
    } catch (error) {
      setError("Facebook Auth Failed");
    }
  }

  const twitterLogin = async () => {
    try {
      const twitterUser = await twitter();
      if(twitterUser){
        setIsPending(true)
        navigate("/profile")
      }
    } catch (error) {
      setError("Twitter Auth Failed");
    }
  }

  const googleLogin = async () => {
    try {
      const googleUser = await google();
      if(googleUser){
        setIsPending(true)
        navigate("/profile")
      }
    } catch (error) {
      setError("Twitter Auth Failed");
    }
  }

  return (
    <div className={classes.root}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <h1>
          <br />
          Login
        </h1>
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
        {error && (
          <Typography variant="h6" style={{ color: "red" }}>
            {error}
          </Typography>
        )}
        <Box>
          <Button variant="contained">
            Cancel
          </Button>
          {!isPending && (
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          )}
          {isPending && (
            <Button type="submit" variant="contained" color="primary">
              Login...
            </Button>
          )}
        </Box>
        <Box sx={{display: "flex", flexDirection: "column"}}>
        <Typography variant="h6" sx={{paddingLeft: "8rem"}} >Or Login in with</Typography>
          <Button onClick={githubLogin}
            variant="contained"
            sx={{ backgroundColor: " #171515", display: "flex", width: "20rem" }}
          >
            <GitHubIcon sx={{ margin: "5px" }} />
            Github
          </Button>
          <Button onClick={facebookLogin}
            variant="contained"
            sx={{display: "flex", width: "20rem" }}
          >
            <FacebookIcon sx={{ margin: "5px" }} />
            Facebook
          </Button>
          <Button onClick={googleLogin}
            variant="contained"
            sx={{display: "flex", width: "20rem", backgroundColor: "green" }}
          >
            <GoogleIcon sx={{ margin: "5px", color: 'red' }} />
            Google
          </Button>
          <Button onClick={twitterLogin}
            variant="contained"
            sx={{ display: "flex", width: "20rem" }}
          >
            <TwitterIcon sx={{ margin: "5px" }} />
            Twitter
          </Button>
        </Box>
      </form>
      <p />
      <Typography variant="h5">New to NenesPay?</Typography>
      <Box>
        <Link to="/signup" style={{ textDecoration: "none", fontSize: "16px" }}>
          <Button variant="contained">Create your Nenes Pay Account</Button>
        </Link>
      </Box>
      <Box>
        <br />
        <br />
        <br />
        <Typography variant="h5">
          © 2022, NenesPay.com, Inc. or its affiliates
        </Typography>
      </Box>
    </div>
  );
};

export default Login;
