import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import DatePickerMY from '../../../main/DatePickerMY';
import { useDispatch } from 'react-redux';
import { createOtherEdu, getCvById } from '../../../../slices/backOffice/cvFromSlice';


const otherEduSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  start: Yup.string().required("Start date is required"),
  end: Yup.string().required("End date is required")
})

const OtherEduAdd = ({ open, setOpen, cvId }) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = React.useState(open);
    const [ startDate, setStartDate ] = React.useState(null)
    const [ endDate, setEndDate ] = React.useState(null)


    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(otherEduSchema),
    });

  const handleClose = () => {
    reset()
    setIsOpen(false);
    setOpen(false);
  };

  const handleCreate = async (data) => {
    await dispatch(createOtherEdu({...data,...{ tit_ssw_id: cvId }}))
    handleClose()
    await dispatch(getCvById({ type: 'titssw', id: cvId }))
  };  

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  React.useEffect(()=>{
    startDate && setValue('start', startDate)
    endDate && setValue('end', endDate)
  },[startDate,endDate])

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add New Course"}</DialogTitle>
          <DialogContent sx={{ width: 500 }}>
            <form onSubmit={handleSubmit(handleCreate)}>
                <Box sx={{ pt: 1 }}>
                  <TextField {...register('name')} fullWidth label={'School Name'} sx={{ mb: 2 }} error={!!errors.name} helperText={errors?.name?.message}></TextField>
                  <DatePickerMY dateVal={startDate} placeholderText={'Start Date'} setDate={setStartDate} error={errors?.start}></DatePickerMY>
                  <DatePickerMY dateVal={endDate} placeholderText={'End Date'} setDate={setEndDate} error={errors?.end}></DatePickerMY>
                </Box>  
                <Box sx={{ textAlign: 'right' }}>
                  <Button type='button' onClick={handleClose}>Cancel</Button>
                  <Button type='submit' sx={{ ml: 2 }} autoFocus>
                    Add new
                  </Button>
                </Box>
            </form>
          </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default OtherEduAdd;
