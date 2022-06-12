import React from 'react';
import { Typography} from "@mui/material";
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
        width="400px"
        autoPlay
        muted
        loop
      />
      <BannerContent>
        <Typography variant="h6">Huge Collection</Typography>
        <BannerTitle variant="h3">Trade Items</BannerTitle>

        <BannerDescription variant="subtitle">
          Find things you need on Hundie and trade them for items you would love to
          have.
        </BannerDescription>

        <BannerShopButton color="success">Shop Now</BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
}