import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as dayjs from 'dayjs';

const Date = ({dateVal,placeholderText,setDate,error}) => {

  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (value) => {
    if(value.$y !== null && value.$M !== null && value.$D !== null){
      const date = dayjs(`${value.$y}-${value.$M + 1}-${value.$D}`)
      const formattedDate = date.format('YYYY-MM-DD')
      setDate(formattedDate)
      setSelectedDate(formattedDate);
    }else{
      setSelectedDate(null)
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']} sx={{ p: 0 }}>
        <DatePicker
          sx={{ width: "100%" }}
          label={placeholderText}
          format="YYYY-MM-DD"
          value={dateVal ? dayjs(dateVal) : selectedDate}
          onChange={handleDateChange}
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


export default Date