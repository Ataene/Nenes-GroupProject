import React, { useContext, useState } from "react";
import { Box, makeStyles, Avatar, TextField } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { AuthContext } from "../../auth/AuthProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "500px",
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

  const back = {
    backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit} style={back}>
      <Typography variant="h5">
        <br />
        Sign Up
      </Typography>
      <Avatar style={avatarStyle}></Avatar>
      <TextField
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
      <Typography>
        <br />
        <input type="checkbox" id="regulation"></input>
        By creating an account, you agree to HundieTrade Conditions of Use.{" "}
        <br />
        <br />
        <div>
          <Typography sx={{ color: "red" }}>{error}</Typography>
        </div>
        <div />
        <Box sx={{ alignItems: "center", justifyContent: "center" }}>
          <Button variant="contained">Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </Typography>
      <Typography variant="h6" sx={{ color: "green" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="contained">Login</Button>
        </Link>
      </Typography>
      <Typography variant="h5">
        <span class="a-size-mini a-color-secondary">
          © 2022, HundieTrade.com, Inc.
        </span>
      </Typography>
    </form>
  );
};

export default SignUp;
