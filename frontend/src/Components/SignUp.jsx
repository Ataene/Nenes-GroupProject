import React, { useState } from "react";
import { Box, makeStyles, Avatar, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
      margin: theme.spacing(2),
    },
  },
}));

const SignUp = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const avatarStyle = { backgroundColor: "#E74C3C" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };
    console.log("newUser", newUser);
    const data = JSON.stringify(newUser);
    let response = await fetch("/users/Signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    let user = await response.json();
    console.log("user", user);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    console.log(firstName, lastName, email, password, confirmPassword);
    handleClose();
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <h1>
        <br />
        Sign Up
      </h1>
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
        type="confirmPassword"
        required
        value={password}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div>
        <br />
        <input type="checkbox" id="regulation"></input>
        By creating an account, you agree to NenesPay Conditions of Use. <br />
        <br />
        <div />
        <Box>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </div>
      <p />
      <h4>
        Already have an account? <Link to="/login">Login</Link>
      </h4>

      <div>
        <br />
        <br />
        <br />
        <span class="a-size-mini a-color-secondary">
          © 2022, NenesPay.com, Inc.
        </span>
      </div>
    </form>
  );
};

export default SignUp;
