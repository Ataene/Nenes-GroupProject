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
  const [firstItem, setFirstItem] = useState("");
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const matchingInfo = async (e) => {
    e.preventDefault();
    try {
      let collectionRef = collection(db, "matchingInfo");
      const response = await addDoc(collectionRef, {
        firstItem,
        uid: user.uid,
        timeStamp: serverTimestamp(),
      });
      setFirstItem("")
      navigate("/dashboard")
    } catch (error) {
      console.log(error.message);
    }
  };

  // const postalFilter =  (postalCode) => {
  //   if (! postalCode) {
  //       return null;
  //   }
  //   postalCode = postalCode.toString().trim();
  //   let ca = new RegExp(/([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i);

  //   if (ca.test(postalCode.toString().replace(/\W+/g, ''))) {
  //     setPostalCode()
  //       return postalCode;
  //   }
  //   return null;
// }
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
            To get started, what are you looing to trade?
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
              value={firstItem}
              onChange={(e) => setFirstItem(e.target.value)}
              id="standard-basic"
              label="Items I want"
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
