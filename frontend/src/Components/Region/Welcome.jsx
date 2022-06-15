import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import postalImage from "../../images/computer.png";
import { AuthContext } from "../../auth/AuthProvider";
import { Container } from "@mui/system";

const Welcome = () => {
  const navigate = useNavigate();
  const [postalCode, setPostalCode] = useState("");
  const [firstItem, setFirstItem] = useState("");
  const [secondItem, setSecondItem] = useState("");
  const [thirdItem, setThirdItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/nearme")
  };

  return (
    <>
      <Box
        container
        style={{
          backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
        }}
      >
        <form>
          <Container container sx={{ justifyContent: "center" }}>
            <Typography
              variant="h2"
              style={{ color: "green", marginLeft: "20rem" }}
            >
              Welcome to Hundie!
            </Typography>
            <Typography
              variant="h4"
              style={{ color: "green", marginLeft: "10rem"}}
            >
              The Social market place to trade items under a Hundred
            </Typography>
          </Container>
          <Container>
            <img src={postalImage} />
            <Typography
              variant="h4"
              style={{color: "green", marginLeft: "13rem"}}
            >
              We just need some info first...
            </Typography>
          </Container>
          <Container
            style={{ color: "green", marginLeft: "30rem" }}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100ch" },
              display: "flex",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="on"
          >
           <TextField
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              id="standard-basic"
              label="POSTAL CODE"
              variant="standard"
            />
            <TextField
              value={firstItem}
              onChange={(e) => setFirstItem(e.target.value)}
              id="standard-basic"
              label="First Item"
              variant="standard"
            />
            <TextField
              value={secondItem}
              onChange={(e) => setSecondItem(e.target.value)}
              id="standard-basic"
              label="Second Item"
              variant="standard"
            />
            <TextField
              value={thirdItem}
              onChange={(e) => setThirdItem(e.target.value)}
              id="standard-basic"
              label="Third Item"
              variant="standard"
            />
            <Button
              type="submit"
              sx={{ backgroundColor: "green", color: "white"}}
             onClick={handleSubmit}
            >
              Get Started
            </Button>
          </Container>
        </form>
      </Box>
    </>
  );
};

export default Welcome;
