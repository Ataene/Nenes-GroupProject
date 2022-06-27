import React from 'react';
import { Container, Typography} from "@mui/material";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerShopButton,
  BannerTitle,
} from "../styles/banner/index";

import MainVideo from "../assets/vistacreate5.mp4";

export default function Banner() {

  return (
    <BannerContainer>
      <video
        src={MainVideo}
        type="video/mp4"
        width="600px"
        autoPlay
        muted
        loop
        sx={{ alignItem: "left" }}
      />

      <BannerContent>
        <Typography variant="h6">Awesome Collection</Typography>
        <BannerTitle variant="h3">Trade Items</BannerTitle>

        <BannerDescription variant="subtitle">
          Find things you need on Hundie and trade them for items you own and
          would love exchange.
        </BannerDescription>

        <BannerShopButton
          sx={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(27,100,14,1) 0%, rgba(96,177,167,0.4416141456582633) 0%, rgba(30,114,11,0.03545168067226889) 37%, rgba(32,121,9,0.6615021008403361) 57%, rgba(30,128,28,0) 100%, rgba(28,135,41,1) 100%, rgba(25,143,70,1) 100%)",
            border: "rgb(2,0,36);",
          }}
          href="/profile"
        >
          Click to find an item
        </BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
}
