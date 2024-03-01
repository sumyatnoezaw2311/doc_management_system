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
import { updateWorkExp } from '../../../../slices/backOffice/cvFromSlice';


const workExpSchema = Yup.object().shape({
  position: Yup.string().required("Position is required"),
  company: Yup.string().required("Company name is required"),
  business_type: Yup.string().required("Business type is required"),
  location: Yup.string().required("Location is required"),
  start: Yup.string().required("Start date is required"),
  end: Yup.string().required("End date is required")
})

const WorkExpEdit = ({ open, setOpen, oldData }) => {
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
        resolver: yupResolver(workExpSchema),
    });

  const handleClose = () => {
    reset()
    setIsOpen(false);
    setOpen(false);
  };

  const handleUpdate = async (data) => {
    await dispatch(updateWorkExp({ type: 'titssw', data: data, id: oldData[0].id }))
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
      setValue('position',oldData[0].position)
      setValue('company', oldData[0].company)
      setValue('business_type', oldData[0].business_type)
      setValue('location', oldData[0].location)
      setValue('start', oldData[0].start)
      setValue('end', oldData[0].end)
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
        <DialogTitle id="alert-dialog-title">{"Edit Experience"}</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <Box sx={{ pt: 1 }}>
                  <TextField {...register('position')} fullWidth label={'Position'} sx={{ mb: 2 }} error={!!errors.position} helperText={errors?.position?.message}></TextField>
                  <TextField {...register('company')} fullWidth label={'Company Name'} sx={{ mb: 2 }} error={!!errors.company} helperText={errors?.company?.message}></TextField>
                  <TextField {...register('business_type')} fullWidth label={'Business Type'} sx={{ mb: 2 }} error={!!errors.business_type} helperText={errors?.business_type?.message}></TextField>
                  <TextField {...register('location')} fullWidth label={'Location'} sx={{ mb: 2 }} error={!!errors.location} helperText={errors?.location?.message}></TextField>
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

export default WorkExpEdit;
