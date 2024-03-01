import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import SearchInput from './SearchInput';
import DateFilters from './DateFilters';
import SelectOption from './SelectOption';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const FilterComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Grid container spacing={2} sx={{ alignItems: 'flex-end', px: 3, py: 3 }}>
      <Grid item xs={12} sm={3}>
        <SearchInput searchText={searchText} onSearchChange={handleSearchChange} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <DateFilters
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <SelectOption selectedOption={selectedOption} onOptionChange={handleOptionChange} />
      </Grid>
      <Grid item xs={2}>
        <Button
          startIcon={<FilterAltIcon></FilterAltIcon>}
          sx={{ height: '100%', color: 'white' }}
          variant="contained"
          color="primary"
          onClick={() => {
            console.log('Search Text:', searchText);
            console.log('Start Date:', startDate);
            console.log('End Date:', endDate);
            console.log('Selected Option:', selectedOption);
          }}
        >
          Apply Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterComponent;
