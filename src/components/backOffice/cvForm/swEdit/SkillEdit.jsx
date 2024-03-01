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
import { updateSkill } from '../../../../slices/backOffice/cvFromSlice';

const skillSchema = Yup.object().shape({
  name: Yup.string().required("Name of skill is required"),
  year_month: Yup.string().required("Date is required")
})

const SkillEdit = ({ open, setOpen, oldData }) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = React.useState(open);
    const [ date,setDate ] = React.useState(null)

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(skillSchema),
    });

  const handleClose = () => {
    reset()
    setIsOpen(false);
    setOpen(false);
  };

  const handleUpdate = async (data) => {
    await dispatch(updateSkill({ data: data, id: oldData[0].id }))
    handleClose()
  };  

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  React.useEffect(()=>{
    setValue('year_month', date)
  },[date])

  React.useEffect(()=>{
    if(oldData){
      setValue('name',oldData[0].name)
      setValue('year_month',oldData[0].year_month)
      setDate(oldData[0].year_month)
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
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'left' }}>{"Edit skill"}</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <Box sx={{ pt: 1, display: 'flex' }}>
                    <TextField {...register('name')} fullWidth label={'Name of skill'} sx={{ mb: 2 }} error={!!errors.name} helperText={errors?.name?.message}></TextField>
                </Box>
                <Box sx={{ pt: 1, display: 'flex', gap: 2 }}>
                    <DatePickerMY dateVal={date} placeholderText={'Date'} setDate={setDate} error={errors?.year_month}></DatePickerMY>
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

export default SkillEdit;
