import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateCvForm } from '../../../../slices/backOffice/updateTitsswslice';
import { useParams } from 'react-router-dom';
import { getCvById } from '../../../../slices/backOffice/cvFromSlice';
import DatePickerMY from '../../../main/DatePickerMY'


const psSchoolSchema = Yup.object().shape({
    ps_name: Yup.string().required("Primary school name is required"),
    ps_start: Yup.string().required("Start date is required"),
    ps_end: Yup.string().required('End date is required')
});

const PSchoolEdit = ({ open, setOpen }) => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const oldDataFromState = useSelector((state) => state.UpdateTitssw.oldData);
  const [isOpen, setIsOpen] = useState(open);
  const [ startDate,setStartDate ] = useState(null)
  const [ endDate, setEndDate ] = useState(null)

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(psSchoolSchema),
  });

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setOpen(false);
  };

  const handleUpdate = async (data) => {
    const newData = {
      ...oldDataFromState,
      ps_name: data.ps_name,
      ps_start: data.ps_start,
      ps_end: data.ps_end
    };
    await dispatch(updateCvForm({ data: newData, id: id }));
    await dispatch(getCvById({type: 'titssw', id: id}))
    handleClose();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(()=>{
    setValue('ps_start', startDate)
    setValue('ps_end', endDate)
  },[startDate,endDate])

  useEffect(() => {
    if(oldDataFromState){
        setValue('ps_name', oldDataFromState.ps_name);
        setValue('ps_start', oldDataFromState.ps_start)
        setValue('ps_end', oldDataFromState.ps_end)
        setStartDate(oldDataFromState.ps_start)
        setEndDate(oldDataFromState.ps_end)
    }
  }, [isOpen]);
  

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Primary School</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <form onSubmit={handleSubmit(handleUpdate)}>
              <Box sx={{ pt: 1 }}>
                <TextField
                  {...register('ps_name')}
                  fullWidth
                  label={'School Name'}
                  sx={{ mb: 2 }}
                  error={!!errors.ps_name}
                  helperText={errors?.ps_name?.message}
                />
                <DatePickerMY dateVal={startDate} placeholderText={"Start Date"} setDate={setStartDate} error={errors?.start_date}></DatePickerMY>
                <DatePickerMY dateVal={endDate} placeholderText={"End Date"} setDate={setEndDate} error={errors?.end_date}></DatePickerMY>
              </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Button type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" sx={{ ml: 2 }} autoFocus>
                Update
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default PSchoolEdit;
