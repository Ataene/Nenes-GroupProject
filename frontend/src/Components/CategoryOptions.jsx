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
    <Box style={{ marginTop: 15 }} sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={10}>Electronics</MenuItem>
          <MenuItem value={20}>Services</MenuItem>
          <MenuItem value={30}>Pets</MenuItem>
          <MenuItem value={40}>Livestock</MenuItem>
          <MenuItem value={50}>Grpceries</MenuItem>
          <MenuItem value={60}>Autmobiles</MenuItem>
          <MenuItem value={70}>Vacation Rentals</MenuItem>
          <MenuItem value={80}>Computer</MenuItem>
          <MenuItem value={90}>Furniture</MenuItem>
          <MenuItem value={100}>Home</MenuItem>
          <MenuItem value={110}>Fashion</MenuItem>
          <MenuItem value={120}>Recreation</MenuItem>
          <MenuItem value={130}>Garden</MenuItem>
          <MenuItem value={140}>Tickets</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default CategoryOptions;
