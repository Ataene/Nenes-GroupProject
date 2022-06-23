import React  from "react";
import { Box } from "@mui/material";
import { query } from "firebase/firestore"; 
const Add = () => {
  return (
      <Box className="add-page">
            <input type="text" placeholder="Search for a items..."
                value={query}
            />
      </Box>
  )
}

export default Add;
