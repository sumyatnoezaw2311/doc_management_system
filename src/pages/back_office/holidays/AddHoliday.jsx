import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import theme from '../../../utils/theme';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import * as dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createHoliday, getHolidays } from '../../../slices/backOffice/holidaySlice';

const AddHoliday = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(isOpen);

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedYear, setSelectedYear] = React.useState(null);

  const handleDateChange = (value) => {
    const date = dayjs(`${value?.$y}-${value?.$M + 1}-${value?.$D}`);
    const year = date.format('YYYY');
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    setSelectedYear(year);
  };

  const handleCreate = async () => {
    if (selectedDate && selectedYear) {
        const data = { date: selectedDate, year: selectedYear}
        await dispatch(createHoliday(data))
        await dispatch(getHolidays())
        setSelectedDate(null)
        setSelectedYear(null)
        setOpen(false)
        setIsOpen(false)
    } else {
      console.log('Invalid date');
    }
  };

  const handleClose = () => {
    setSelectedDate(null);
    setSelectedYear(null)
    setOpen(false);
    setIsOpen(false);
  };

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add a holiday</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{ pt: 1 }}>
              <DatePicker
                sx={{ width: '100%' }}
                label={'Choose Date'}
                format="YYYY-MM-DD"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', mt: 2 }}>
            <Button type="button" onClick={handleClose} sx={{ color: theme.palette.common.black }}>
              Cancel
            </Button>
            <Button type='button' onClick={()=>{handleCreate()}} autoFocus sx={{ ml: 2 }}>
              Submit
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AddHoliday;
