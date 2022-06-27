import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import postalImage from "../../images/computer.png";
import { Container } from "@mui/system";
import { FirebaseContext } from "../../auth/FirebaseProvider";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AuthContext  } from '../../auth/AuthProvider';

const Welcome = () => {

  const authContext = useContext(AuthContext);
  const { user } = authContext;
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
      let collectionRef = collection(db, "matchingInfo");
      const response = await addDoc(collectionRef, {
        postalCode,
        firstItem,
        secondItem,
        thirdItem,
        uid: user.uid,
        timeStamp: serverTimestamp(),
      });
      // navigate("/nearme");
      console.log(response);
      setPostalCode("")
      setFirstItem("")
      setSecondItem("")
      setThirdItem("")

    } catch (error) {
      console.log(error.message);
    }
  };

  const postalFilter =  (postalCode) => {
    if (! postalCode) {
        return null;
    }
    postalCode = postalCode.toString().trim();
    let ca = new RegExp(/([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i);

    if (ca.test(postalCode.toString().replace(/\W+/g, ''))) {
      setPostalCode()
        return postalCode;
    }
    return null;
}
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
        <Container sx={{display: "flex", flexDirection: "row"}}>
          <img src={postalImage} />
          <Typography
            variant="h4"
            style={{ color: "green", marginTop: "8rem" }}
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
          <Box  style={{display: "flex", flexDirection: "column", flexWrap: "nowrap"}} >
            <TextField
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              id="standard-basic"
              label="First 3 characters of your postal code"
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
              onClick={matchingInfo}
              sx={{ backgroundColor: "green", color: "white", marginTop: "10px" }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Welcome;
