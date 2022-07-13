import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ConditionSelect = ({condition, setCondition}) => {

  const handleChange = (event) => {
    
    setCondition(event.target.value);
  };
  return (
    <Box style= {{marginTop:15}} sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Condition</InputLabel>
        <Select
        sx={{width: "30rem"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={condition}
          label="Condition"
          onChange={handleChange}
        >
          <MenuItem value={"New"}>New</MenuItem>
          <MenuItem value={"Almost New"}>Almost New</MenuItem>
          <MenuItem value={"Fair"}>Fair</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
export default ConditionSelect;