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


const msSchoolSchema = Yup.object().shape({
    ms_name: Yup.string().required("Middle school name is required"),
    ms_start: Yup.string().required("Start date is required"),
    ms_end: Yup.string().required('End date is required')
});

const MSchoolEdit = ({ open, setOpen }) => {

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
    resolver: yupResolver(msSchoolSchema),
  });

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setOpen(false);
  };

  const handleUpdate = async (data) => {
    const newData = {
      ...oldDataFromState,
      ms_name: data.ms_name,
      ms_start: data.ms_start,
      ms_end: data.ms_end
    };
    await dispatch(updateCvForm({ data: newData, id: id }));
    await dispatch(getCvById({type: 'titssw', id: id}))
    handleClose();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(()=>{
    setValue('ms_start', startDate)
    setValue('ms_end', endDate)
  },[startDate,endDate])

  useEffect(() => {
    if(oldDataFromState){
        setValue('ms_name', oldDataFromState.ms_name);
        setValue('ms_start', oldDataFromState.ms_start)
        setValue('ms_end', oldDataFromState.ms_end)
        setStartDate(oldDataFromState.ms_start)
        setEndDate(oldDataFromState.ms_end)
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
        <DialogTitle id="alert-dialog-title">Edit Middle School</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <form onSubmit={handleSubmit(handleUpdate)}>
              <Box sx={{ pt: 1 }}>
                <TextField
                  {...register('ms_name')}
                  fullWidth
                  label={'School Name'}
                  sx={{ mb: 2 }}
                  error={!!errors.ms_name}
                  helperText={errors?.ms_name?.message}
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

export default MSchoolEdit;
