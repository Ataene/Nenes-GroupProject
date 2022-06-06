import { Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle,
} from "../styles/banner/index";

import MainVideo from "../assets/vistacreate5.mp4";

export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

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

        <BannerShopButton color="primary">Shop Now</BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
}
