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
import { updateOtherEdu } from '../../../../slices/backOffice/cvFromSlice';


const otherEduSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  start: Yup.string().required("Start date is required"),
  end: Yup.string().required("End date is required")
})

const OtherEduEdit = ({ open, setOpen, oldData }) => {
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

  const handleUpdate = async (data) => {
    await dispatch(updateOtherEdu({ data: data, id: oldData[0].id }))
    handleClose()
  };  

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  React.useEffect(()=>{
    startDate && setValue('start', startDate)
    endDate && setValue('end', endDate)
  },[startDate,endDate])

  React.useEffect(()=>{
    if(oldData){
      setValue('name',oldData[0].name)
      setStartDate(oldData[0].start)
      setEndDate(oldData[0].end)
    };
  },[oldData])


  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit attended course"}</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <Box sx={{ pt: 1 }}>
                  <TextField {...register('name')} fullWidth label={'Group Name'} sx={{ mb: 2 }} error={!!errors.name} helperText={errors?.name?.message}></TextField>
                  <DatePickerMY dateVal={startDate} placeholderText={'Start Date'} setDate={setStartDate} error={errors?.start}></DatePickerMY>
                  <DatePickerMY dateVal={endDate} placeholderText={'End Date'} setDate={setEndDate} error={errors?.end}></DatePickerMY>
                </Box>  
                <Box sx={{ textAlign: 'right' }}>
                  <Button type='button' onClick={handleClose}>Cancel</Button>
                  <Button type='submit' sx={{ ml: 2 }} autoFocus>
                    Update
                  </Button>
                </Box>
            </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default OtherEduEdit;
