import React, {useState } from "react";
import {BrowserRouter, Switch, Router, Routes, Route} from 'react-router-dom'
import Header from "./Header"
import { Wishlist } from "./Wishlist"
import { Traded}  from "./Traded"
import { Add }  from "./Add"
import "../font-awesome/css/all.min.css"
import "../WantList/WishList.css"

import { Box, Button, Stack } from "@mui/material";
import Sidebar from "../Sidebar";
import WishList from "../Profile/WishList";


const Test = () => {
  const [active, setActive] = useState('Wishlist')
  return (
    <>
      <div>
        <Button onClick={() => setActive("WishList")}>Wishlist</Button>
        <Button onClick={() => setActive("Traded")}>Traded</Button>
        <Button onClick={() => setActive("Add")}> + Add</Button>
      </div>
      <div>
        {active === "WishList" && <Wishlist title="WishList" />}
        {active === "Traded" && <Traded title="Traded" />}
        {active === "Add" && <Add title="Add" />}
      </div>
    </>
  );
};

export default Test;
