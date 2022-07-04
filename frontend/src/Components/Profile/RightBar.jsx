import React, { useContext, useState } from "react";
import {
  Box,
  Container,
  Typography,
  CardContent,
  Card,
} from "@mui/material";
import { AuthContext } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";
import ChatHeader from "./ChatHeader";

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
            <iframe
              src="https://giphy.com/embed/MA97YuHLr1Xfr0F11Y"
              width="300"
              height="300"
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
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
      </Container>
      <Box>
        <Container>
          <ChatHeader />
          {open && userToMessage && <ChatBox setOpen={setOpen} />}
        </Container>
      </Box>
    </Box>
  );
};

export default RightBar;
