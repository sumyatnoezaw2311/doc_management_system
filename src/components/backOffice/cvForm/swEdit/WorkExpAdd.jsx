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
import { createWorkExp, getCvById } from '../../../../slices/backOffice/cvFromSlice';


const workExpSchema = Yup.object().shape({
  position: Yup.string().required("Position is required"),
  company: Yup.string().required("Company name is required"),
  business_type: Yup.string().required("Business type is required"),
  responsibilities: Yup.string().required("Responsibilities is required"),
  reason_of_leaving: Yup.string().required("Reason for leaving is required"),
  start: Yup.string().required("Start date is required"),
  end: Yup.string().required("End date is required")
})

const WorkExpAdd = ({ open, setOpen, cvId }) => {
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

  const handleCreate = async (data) => {
    await dispatch(createWorkExp({ type: 'sw', data: {...data,...{ sw_id: cvId }}}))
    handleClose()
    await dispatch(getCvById({ type: 'sw', id: cvId }))
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
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'left' }}>{"Add Experience"}</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
            <form onSubmit={handleSubmit(handleCreate)}>
                <Box sx={{ pt: 1, display: 'flex' }}>
                    <TextField {...register('position')} fullWidth label={'Position'} sx={{ mb: 2, mr: 2 }} error={!!errors.position} helperText={errors?.position?.message}></TextField>
                    <TextField {...register('company')} fullWidth label={'Company Name'} sx={{ mb: 2 }} error={!!errors.company} helperText={errors?.company?.message}></TextField>
                </Box>
                <TextField {...register('business_type')} fullWidth label={'Business Type'} sx={{ mb: 2, mr: 2 }} error={!!errors.business_type} helperText={errors?.business_type?.message}></TextField>
                <Box sx={{ pt: 1, display: 'flex', gap: 2 }}>
                    <DatePickerMY dateVal={startDate} placeholderText={'Start Date'} setDate={setStartDate} error={errors?.start}></DatePickerMY>
                    <DatePickerMY dateVal={endDate} placeholderText={'End Date'} setDate={setEndDate} error={errors?.end}></DatePickerMY>
                </Box>
                <Box sx={{ pt: 1, display: 'flex' }}>
                    <TextField {...register('responsibilities')} fullWidth label={'Responsibilities'} sx={{ mb: 2, mr: 2 }} error={!!errors.responsibilities} helperText={errors?.responsibilities?.message} multiline></TextField>
                    <TextField {...register('reason_of_leaving')} fullWidth label={'Reason for leaving'} sx={{ mb: 2 }} error={!!errors.reason_of_leaving} helperText={errors?.reason_of_leaving?.message} multiline></TextField>
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

export default WorkExpAdd;
