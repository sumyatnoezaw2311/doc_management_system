import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectOption = ({ selectedOption, onOptionChange }) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="select-label">Select Option</InputLabel>
      <Select
        labelId="select-label"
        value={selectedOption}
        onChange={onOptionChange}
        label="Select Option"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectOption;
