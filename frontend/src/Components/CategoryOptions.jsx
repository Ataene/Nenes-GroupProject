import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CategoryOptions =({ category, setCategory }) => {
  
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <Box style={{ marginTop: 15 }} sx={{ maxWidth: 600 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
        sx={{width: "30rem"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={"Electronics"}>Electronics</MenuItem>
          <MenuItem value={"Services"}>Services</MenuItem>
          <MenuItem value={"Pets"}>Pets</MenuItem>
          <MenuItem value={"Livestock"}>Livestock</MenuItem>
          <MenuItem value={"Groceries"}>Groceries</MenuItem>
          <MenuItem value={"Autmobiles"}>Autmobiles</MenuItem>
          <MenuItem value={"Vacation"}>Vacation Rentals</MenuItem>
          <MenuItem value={"Household"}>Household</MenuItem>
          <MenuItem value={"Fashion"}>Fashion</MenuItem>
          <MenuItem value={"Recreation"}>Recreation</MenuItem>
          <MenuItem value={"Garden"}>Garden</MenuItem>
          <MenuItem value={"Tickets"}>Tickets</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default CategoryOptions;
