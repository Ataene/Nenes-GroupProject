import React, { useState } from "react";
import { Box, makeStyles, Avatar, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import signin from "../auth/signin";
import { useNavigate } from "react-router-dom";

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

const Login = ({ handleClose }) => {

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage ] = useState("")
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signin(email, password)
      if(user === null){
        console.log('No user found')
      } else {
        navigate("/dashboard");
      }
      
    } catch (error) {
      setErrorMessage(error.message);
    }

    // const newUser = {
    //   email,
    //   password,
    // };
    // console.log("newUser", newUser);
    // const data = JSON.stringify(newUser);
    // let response = await fetch("/users/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: data,
    // });
    // let user = await response.json();
    // console.log("user", user);

    // setEmail("");
    // setPassword("");

    // console.log(email, password);
    // handleClose();
  };

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
        <Box>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </form>
      <p />
      <h4>New to NenesPay?</h4>
      <button sx={{textDecoration: "none"}}>
        <Link to="/signup">Create your Nenes Pay Account</Link>
      </button>
      <div>
        <br />
        <br />
        <br />
        <span class="a-size-mini a-color-secondary">
          © 2022, NenesPay.com, Inc. or its affiliates
        </span>
      </div>
    </div>
  );
};

export default Login;
