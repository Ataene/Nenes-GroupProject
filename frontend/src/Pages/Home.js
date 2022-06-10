import React from "react";
import { makeStyles } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import Banner from "../Components/banner";
import Promotions from "../Components/promotions";
import Products from "../Components/products";

const useStyles = makeStyles((theme) => ({}));

export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <Banner />
      <Promotions />
      <Products />
    </div>
  );
}
