import React, { useState } from "react";
import { Box, makeStyles, Avatar, TextField } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import signup from "../auth/signup";

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
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ isPending, setIsPending ] = useState(false)
  const [error, setError ] = useState(null)
  const navigate = useNavigate();

  const avatarStyle = { backgroundColor: "#E74C3C" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true)
    try {
      await signup(firstName, lastName, email, password)
      navigate("/login")
    } catch (error) {
      setError(`Password must be minimum of 6 characters and number`);
    }
    setIsPending(false)
  };
 
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Typography variant="h5"><br />
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
        label="Confirm Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Typography>
        <br />
        <input type="checkbox" id="regulation"></input>
        By creating an account, you agree to NenesPay Conditions of Use. <br />
        <br />
        <div>
          <Typography sx={{color: "red"}}>{error}</Typography>
        </div>
        <div />
        <Box sx={{alignItems: "center", justifyContent: "center"}}>
          <Button variant="contained">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </Typography>
      <p />
      <Typography variant="h6">
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="contained">Login</Button>
        </Link>
      </Typography>
      <Typography variant="h5">
        <br />
        <br />
        <br />
        <span class="a-size-mini a-color-secondary">
          © 2022, NenesPay.com, Inc.
        </span>
      </Typography>
    </form>
  );
};

export default SignUp;
