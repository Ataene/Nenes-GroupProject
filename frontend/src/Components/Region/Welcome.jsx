import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import postalImage from "../../images/computer.png";
import { AuthContext  } from '../../auth/AuthProvider';
import { Container } from "@mui/system";

const Welcome = () => {
    const authContext = useContext(AuthContext);
    const { user } = authContext;
  
    const navigate = useNavigate();
    const [postalCode, setPostalCode] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
     if(user){
       navigate("/nearme");
     }
    };
  
    return (
      <>
        <Box
          container
          style={{
            backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
            alignItems: "center",
          }}
        >
        <Container>
            <Typography variant='h4' style={{color: "green", justifyContent: "center"}}>Welcome to Hundie!</Typography>
            <Typography variant='h4' style={{color: "green"}}>Social market place to trade items under a Hundred</Typography>
            <Typography variant='h4' style={{color: "green"}}>We just need some info first...</Typography>
        </Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              align: "center",
              marginRight: "5%",
            }}
          >
            <img style={{ marginLeft: "20rem" }} src={postalImage} />
            <Box
              style={{ marginRight: "50%" }}
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
            >
              <form style={{ marginTop: "5rem" }} onSubmit={handleSubmit}>
              <Typography variant="h6">Enter Postal Code</Typography>
                <TextField
                  sx={{ width: "25rem", border: "2px solid" }}
                  placeholder="Enter Your Postal Code"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                <Button
                  pattern="^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$"
                  type="submit"
                  sx={{
                    backgroundColor: "yellow",
                    width: "25rem",
                    marginTop: "5px",
                  }}
                >
                  Postal Code
                </Button>
              </form>
            
            </Box>
          </Box>
          <Container sx={{display: "flex", flexDirection: "row"}}>
            <img style={{ marginLeft: "20rem" }} src={postalImage} />
            <form style={{ marginTop: "5rem" }} onSubmit={handleSubmit}>
              <Typography variant="h6">Enter Postal Code</Typography>
                <TextField
                  sx={{ width: "25rem", border: "2px solid" }}
                  placeholder="Enter Your Postal Code"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                <Button
                  pattern="^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$"
                  type="submit"
                  sx={{
                    backgroundColor: "yellow",
                    width: "25rem",
                    marginTop: "5px",
                  }}
                >
                  Postal Code
                </Button>
              </form>
            </Container>
        </Box>
      </>
    );
  };

  export default Welcome;
  