import React, { useContext, useState } from "react";
import { Box, Container, Typography, CardContent, Card } from "@mui/material";
import { AuthContext } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import Chatings from "./Chatings";
import ChatHeader from "./ChatHeader";
import Image from "../../images/iPhone.png";

const RightBar = () => {
  const authContext = useContext(AuthContext);
  const { user, userToMessage } = authContext;
  const navigate = useNavigate();
  const handleModal = () => {
    navigate("/location");
  };

  const [open, setOpen] = useState(true);
  const [transition, setTransition] = useState(undefined);

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flex: "2" }}>
      <Container>
        <Box sx={{ marginTop: "20px" }}>
          <Card sx={{ maxWidth: 345 }}>
          <img src={Image} alt="Place yours Ads" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Ads Board
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Post your Ads
              </Typography>
            </CardContent>
          </Card>
        </Box>
          <ChatHeader />
          {open && userToMessage && <Chatings setOpen={setOpen} />}
      </Container>
    </Box>
  );
};

export default RightBar;
