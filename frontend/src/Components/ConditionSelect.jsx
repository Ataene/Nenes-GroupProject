import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ConditionSelect({condition, setCondition}) {
  // const [condition, setCondition] = React.useState("");

  const handleChange = (event) => {
    setCondition(event.target.value);
  };

  return (
    <Box style= {{marginTop:10}} sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Condition</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={condition}
          label="Condition"
          onChange={handleChange}
        >
          <MenuItem value={10}>Excellent</MenuItem>
          <MenuItem value={20}>Good</MenuItem>
          <MenuItem value={30}>Fair</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
