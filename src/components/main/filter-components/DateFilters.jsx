import React from 'react';
import { Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const DateFilters = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            fullWidth
            label="Start Date"
            value={startDate}
            onChange={onStartDateChange}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={6} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            fullWidth
            label="End Date"
            value={endDate}
            onChange={onEndDateChange}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default DateFilters;
