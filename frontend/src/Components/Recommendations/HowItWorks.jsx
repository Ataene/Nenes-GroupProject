import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import EditLocationOutlinedIcon from "@mui/icons-material/EditLocationOutlined";
import CarCrashOutlinedIcon from "@mui/icons-material/CarCrashOutlined";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";

const HowItWorks = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(12),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <Container sx={{marginBottom: "10px"}}>
        <div>
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 3,
              fontFamily: "Montserrat",
              color: "green",
            }}
          >
            How it Works
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Item
              style={{
                backgroundImage: "url(/images/banner/banner.png)",
                backgroundSize: "cover",
              }}
            >
              <div style={{ backgroundColor: "rgba(255,255,255,0.75)" }}>
                <EditLocationOutlinedIcon sx={{ color: "green" }} />
                <Typography>Sign up on the hompage then login. </Typography>
              </div>
            </Item>
            <Item
              style={{
                backgroundImage: "url(/images/howitworks/map.png)",
                backgroundSize: "cover",
              }}
            >
              <div style={{ backgroundColor: "rgba(255,255,255,0.75)" }}>
                <CarCrashOutlinedIcon sx={{ color: "red" }} />
                <Typography>
                  Once Logged in, you can see posts within your neigbourhood.{" "}
                </Typography>
              </div>
            </Item>
            <Item
              style={{
                backgroundImage: "url(/images/howitworks/meet.png)",
                backgroundSize: "cover",
              }}
            >
              <div style={{ backgroundColor: "rgba(255,255,255,0.75)" }}>
                <LockClockOutlinedIcon
                  sx={{ color: "yellow", size: "large" }}
                />
                <Typography>
                  Chat with people nearby to arrange a meet and exchange items.{" "}
                </Typography>
              </div>
            </Item>
          </Stack>
        </div>
      </Container>
    </>
  );
};

export default HowItWorks;
