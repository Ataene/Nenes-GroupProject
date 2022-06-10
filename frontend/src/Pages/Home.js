import React from "react";
import { CssBaseline } from "@material-ui/core";
import Banner from "../Components/banner";
import Promotions from "../Components/promotions";
import Products from "../Components/products";

export default function Home() {
  return (
    <div>
      <CssBaseline />
      <Banner />
      <Promotions />
      <Products />
    </div>
  );
}
