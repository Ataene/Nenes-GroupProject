import React from "react";
import {BrowserRouter, Switch, Router, Routes, Route} from 'react-router-dom'
import Header from "./Header"
import { Watchlist, Wishlist } from "./Wishlist"
import { Exchanged}  from "./Wished"
import { Add }  from "./Add"
import "../font-awesome/css/all.min.css"
import "../WantList/WishList.css"

import { Box, Button, Stack } from "@mui/material";
import Sidebar from "../Sidebar";
import WishList from "../Profile/WishList";


const Test = () => {
  return (
    <>
      <div>
        <Button>Wishlist</Button>
        <Button>Exchanged</Button>
        <Button>+Add</Button>
      </div>
      <div>
        <Wishlist />
        <Exchanged />
        <Add />
      </div>
    </>
  );
};

export default Test;
