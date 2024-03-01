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
    responsibilities: Yup.string().required("Responsibilities is required"),
    reason_of_leaving: Yup.string().required("Reason for leaving is required"),
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
    await dispatch(updateWorkExp({ type: 'sw', data: data, id: oldData[0].id }))
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
      setValue('responsibilities', oldData[0].responsibilities)
      setValue('reason_of_leaving', oldData[0].reason_of_leaving)
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
        <DialogTitle id="alert-dialog-title">{"Edit Work Experience"}</DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit(handleUpdate)}>
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

export default WorkExpEdit;
