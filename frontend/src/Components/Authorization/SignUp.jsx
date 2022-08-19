import React, { useContext, useState } from "react";
import { Box, makeStyles, Avatar, TextField } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button, Paper } from "@mui/material";
import { AuthContext } from "../../auth/AuthProvider";
import loginImage from "../../images/try.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(1),
    },
  },
}));

const SignUp = () => {
  const authContext = useContext(AuthContext);
  const { registerUser } = authContext;
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const avatarStyle = { backgroundColor: "#E74C3C" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(firstName, lastName, email, password, postalCode);
      navigate("/welcome");
      setIsPending(true);
    } catch (error) {
      setError(`Password must be minimum of 6 characters and number`);
    }
  };

  // const back = {
  //   backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
  // };

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      style={{
        backgroundImage: "linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)",
        // backgroundImage: "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)",
        // backgroundImage: `url(${loginImage})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
        // width: "100vw",
      }}
    >
      <Paper
        elevation={10}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(8.5px)",
          webkitBackdropFilter: "blur(8.5px)",
          borderRadius: "10px",
          color: "#ffffff",
          textTransform: "uppercase",
          letterSpacing: "0.4rem",
          mobile: { minWidth: "400", width: "80vw", height: "90vh" },
          tablet: { minWidth: "800", width: "80vw", height: "80vh" },
          desktop: { minWidth: "1280", width: "70vw", height: "50vh" },
          largeDesktop: { minWidth: "1600", width: "30vw", height: "80vh" },
        }}
      >
        <Typography variant="h5" style={{ color: "white" }}>
          <br />
          Sign Up
        </Typography>
        <Avatar style={avatarStyle} />
        <TextField
          InputProps={{
            backgroundColor: "red",
          }}
          label="First Name"
          variant="filled"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="filled"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Postal Code"
          variant="filled"
          type="postalCode"
          required
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <Typography sx={{ color: "white", marginLeft: "9vw" }}>
          <br />
          <input type="checkbox" id="regulation"></input>
          By creating an account, you agree terms of use.
          <br />
          <br />
          <div>
            <Typography sx={{ color: "red" }}>{error}</Typography>
          </div>
          <div />
          <Box sx={{ alignItems: "center", justifyContent: "center" }}>
            <Button style={{ marginLeft: "3vw" }} variant="contained">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </Box>
        </Typography>
      </Paper>
      <Typography variant="h6" sx={{ color: "white" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="contained">Login</Button>
        </Link>
      </Typography>
      <br />
      <Typography
        variant="h5"
        sx={{ fontFamily: "Montserrat", color: "white", fontSize: "12px" }}
      >
        <span class="a-size-mini a-color-secondary">
          © 2022, HundieTrade.com, Inc.
        </span>
      </Typography>
    </form>
  );
};

export default SignUp;