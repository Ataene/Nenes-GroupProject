import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import postalImage from "../../images/computer.png";
import { Container } from "@mui/system";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Welcome = () => {
  const navigate = useNavigate();
  const [postalCode, setPostalCode] = useState("");
  const [firstItem, setFirstItem] = useState("");
  const [secondItem, setSecondItem] = useState("");
  const [thirdItem, setThirdItem] = useState("");
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const matchingInfo = async (e) => {
    e.preventDefault();
    try {
      let collectionRef = collection(db, "Cool");
      const response = await addDoc(collectionRef, {
        // postalCode,
        // firstItem,
        // secondItem,
        thirdItem,
        timeStamp: serverTimestamp(),
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    matchingInfo();
    navigate("/nearme");
  };

  return (
    <>
      <Box
        container
        style={{
          backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)",
        }}
      >
        <Container container sx={{ justifyContent: "center" }}>
          <Typography
            variant="h2"
            style={{ color: "green", marginLeft: "20rem" }}
          >
            Welcome to Hundie!
          </Typography>
          <Typography
            variant="h4"
            style={{ color: "green", marginLeft: "10rem" }}
          >
            The Social market place to trade items under a Hundred
          </Typography>
        </Container>
        <Container>
          <img src={postalImage} />
          <Typography
            variant="h4"
            style={{ color: "green", marginLeft: "13rem" }}
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
          <form>
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
              sx={{ backgroundColor: "green", color: "white" }}
            >
              Get Started
            </Button>
          </form>
        </Container>
        <form onSubmit={matchingInfo}> 
          <TextField
              value={thirdItem}
              onChange={(e) => setThirdItem(e.target.value)}
              id="standard-basic"
              label="Third Item"
              variant="standard"
            />
            <Button type="submit">
              Hi!
            </Button>
            </form>
       
        
      </Box>
    </>
  );
};

export default Welcome;
