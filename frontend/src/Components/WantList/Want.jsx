import React, {useState } from "react";
import { Wishlist } from "./Wishlist"
import { Traded}  from "./Traded"
import { Add }  from "./Add"
import "../font-awesome/css/all.min.css"
import "../WantList/WishList.css"

import { Button} from "@mui/material";



const Want = () => {
  const [active, setActive] = useState('WishList')
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

export default Want;
