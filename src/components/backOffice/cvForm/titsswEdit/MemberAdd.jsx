import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createFamilyMember, getCvById } from '../../../../slices/backOffice/cvFromSlice';

const memberSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number().typeError("Please fill a valid age").required("Age is required"),
  relationship: Yup.string().required("Relationship is required"),
  job: Yup.string().required("Job is required"),
  address: Yup.string().required("Address is required")
})

const MemberAdd = ({ open, setOpen, cvId }) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = React.useState(open);

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(memberSchema),
    });

  const handleClose = () => {
    reset()
    setIsOpen(false);
    setOpen(false);
  };

  const handleCreate = async (data) => {
    await dispatch(createFamilyMember({...data,...{ tit_ssw_id: cvId }}))
    handleClose()
    await dispatch(getCvById({ type: 'titssw', id: cvId }))
  };  

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);


  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'left' }}>{"Add New Family Member"}</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
            <form onSubmit={handleSubmit(handleCreate)}>
                <Box sx={{ pt: 1 }}>
                  <TextField {...register('name')} fullWidth label={'Name'} sx={{ mb: 2 }} error={!!errors.name} helperText={errors?.name?.message}></TextField>
                  <TextField {...register('age')} fullWidth label={'Age'} sx={{ mb: 2 }} error={!!errors.age} helperText={errors?.age?.message}></TextField>
                  <TextField {...register('relationship')} fullWidth label={'Relationship'} sx={{ mb: 2 }} error={!!errors.relationship} helperText={errors?.relationship?.message}></TextField>
                  <TextField {...register('job')} fullWidth label={'Job'} sx={{ mb: 2 }} error={!!errors.job} helperText={errors?.job?.message}></TextField>
                  <TextField {...register('address')} fullWidth label={'Address'} sx={{ mb: 2 }} error={!!errors.address} helperText={errors?.address?.message}></TextField>
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

export default MemberAdd;
