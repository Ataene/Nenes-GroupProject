import React from "react";
import {
  Grid,
  List,
  ListItemText,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../styles/theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SubscribeTf, FooterTitle } from "../styles/footer/index";
import SendIcon from "@mui/icons-material/Send";

export default function Footer() {
  return (
    <Box
      sx={{
        background: Colors.shaft,
        color: Colors.white,
        p: { xs: 4, md: 10 },
        pt: 12,
        pb: 12,
        fontSize: { xs: "12px", md: "14px" },
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1" sx={{ fontFamily: "Montserrat" }}>
            About us
          </FooterTitle>
          <Typography
            variant="caption2"
            sx={{ fontFamily: "Montserrat", fontSize: "15px" }}
          >
            Hundie is live ads in a wide range of categories. We’re proud to
            provide a platform that connects Calgarians, helping them to swap
            great items in their community, make great experience, and help the
            country waste less.
          </Typography>
          <Box
            sx={{
              mt: 4,
              color: Colors.dove_gray,
            }}
          >
            <FacebookIcon sx={{ mr: 1 }} />
            <TwitterIcon sx={{ mr: 1 }} />
            <InstagramIcon />
          </Box>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1" sx={{ fontFamily: "Montserrat" }}>
            information
          </FooterTitle>
          <List>
            <ListItemText>
              <Typography
                lineHeight={2}
                variant="caption2"
                sx={{ fontFamily: "Montserrat" }}
              >
                About Us
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                lineHeight={2}
                variant="caption2"
                sx={{ fontFamily: "Montserrat" }}
              >
                Order Tracking
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                lineHeight={2}
                variant="caption2"
                sx={{ fontFamily: "Montserrat" }}
              >
                Privacy &amp; Policy
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                lineHeight={2}
                variant="caption2"
                sx={{ fontFamily: "Montserrat" }}
              >
                Terms &amp; Conditions
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1" sx={{ fontFamily: "Montserrat" }}>
            my account
          </FooterTitle>
          <List>
            <ListItemText>
              <Typography
                lineHeight={2}
                variant="caption2"
                sx={{ fontFamily: "Montserrat" }}
              >
                Login
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                lineHeight={2}
                variant="caption2"
                sx={{ fontFamily: "Montserrat" }}
              >
                My Cart
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                lineHeight={2}
                variant="caption2"
                sx={{ fontFamily: "Montserrat" }}
              >
                My Account
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography
                lineHeight={2}
                variant="caption2"
                sx={{ fontFamily: "Montserrat" }}
              >
                Wishlist
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1" sx={{ fontFamily: "Montserrat" }}>
            newsletter
          </FooterTitle>
          <Stack>
            <SubscribeTf
              color="primary"
              label="Email address"
              variant="standard"
            />
            <Button
              startIcon={<SendIcon sx={{ color: Colors.white }} />}
              sx={{ mt: 4, mb: 4, fontFamily: "Montserrat" }}
              variant="contained"
            >
              Subscribe
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
