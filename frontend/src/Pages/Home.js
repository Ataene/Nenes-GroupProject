import React from "react";
import { CssBaseline } from "@material-ui/core";
import Banner from "../Components/banner";
import Promotions from "../Components/promotions";
import Products from "../Components/products";
import { Box, Typography } from "@mui/material";
import MostPopularTrade from "../Components/Recommendations/MostPopularTrade";

export default function Home() {
  return (
    <div>
      <CssBaseline />
      <Banner />
      <Promotions />
      <Box
        display="flex"
        justifyContent="center"
        sx={{ p: 4, fontFamily: "Montserrat" }}
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "Montserrat", color: "green" }}
        >
          Most Popular Trades on Huddie
        </Typography>
      </Box>

      <MostPopularTrade />
      <Box
        display="flex"
        justifyContent="center"
        sx={{ p: 4, fontFamily: "Montserrat" }}
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "Montserrat", color: "green" }}
        >
          Categories of Items You Can Trade
        </Typography>
      </Box>
      <Products />
    </div>
  );
}
