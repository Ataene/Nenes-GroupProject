import React, { useState } from "react";
import { Box, makeStyles, Avatar, TextField } from "@material-ui/core";
<<<<<<< HEAD
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import signin from "../auth/signin";
import { useNavigate } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
=======
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
>>>>>>> c752cc006c6325735e1b6c83b4beb9d057a18ffd

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
  const [ isPending, setIsPending ] = useState(false)
  const [error, setError ] = useState(null)
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user;
    try {
     user = await signin(email, password)
    } catch (error) {
      setError(error.message);
    }

    if(user){
      setIsPending(true)
      navigate("/dashboard")
      setIsPending(true);
    } else {
      setError("Invalid email and password");
    }
  };

  return (
    <div className={classes.root}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <h1><br />Login</h1>
        <Avatar style={avatarStyle}></Avatar>

        <TextField label="Email" variant="filled" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField label="Password" variant="filled" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography variant="h6" style={{color: "red"}}>{error}</Typography>}
        <Box>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          {!isPending && <Button type="submit" variant="contained" color="primary">
            Login
          </Button>}
          {isPending && <Button type="submit" variant="contained" color="primary">
            Login...
          </Button>}
        </Box>
        <Box>
        <Link to="/signup" style={{textDecoration: "none"}}>
          <Button variant="contained" sx={{backgroundColor:' #171515', display: "flex"}}><GitHubIcon sx={{paddingLeft: "5px"}} />Login with Github</Button>
        </Link>
      </Box>
      </form>
      <p />
      <Typography variant="h5">New to NenesPay?</Typography>
      <Box>
        <Link to="/signup" style={{textDecoration: "none", fontSize: "16px"}}>
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
