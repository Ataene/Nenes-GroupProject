import React from "react";

import {BrowserRouter, Switch, Router, Routes, Route} from 'react-router-dom'
import Header from "./Header"
import { Watchlist } from "./Wishlist"
import { Watched }  from "./Wished"
import { Add }  from "./Add"
import "../font-awesome/css/all.min.css"
import "../WantList/WishList.css"



const Test = () => {
  return (
    <div>
      <Header />
    </div>
  );
};

export default Test;
