import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DatePickerMY({dateVal, placeholderText , setDate, error}){

  const handleInternalDateChange = (value) => {
    const date = dayjs(`${value?.$y}-${value?.$M + 1}`)
    const formattedDate = date.format('YYYY-MM')
    setDate(formattedDate)
  };

  return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer sx={{ width: "100%", mb: 2 }} components={['DatePicker']}>
              <DatePicker
                  sx={{ width: "100%" }}
                  views={['year', 'month']}
                  openTo="month"
                  label={placeholderText}
                  format="YYYY-MM"
                  onChange={handleInternalDateChange}
                  value={dayjs(dateVal)}
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
              />
          </DemoContainer>
        </LocalizationProvider>
  );
}
