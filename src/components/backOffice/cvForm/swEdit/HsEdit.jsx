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
import { updateCvForm } from '../../../../slices/backOffice/updateSwSlice';
import { useParams } from 'react-router-dom';
import { getCvById } from '../../../../slices/backOffice/cvFromSlice';
import DatePickerMY from '../../../main/DatePickerMY'


const hsSchoolSchema = Yup.object().shape({
    hs_name: Yup.string().required("Hight school name is required"),
    hs_end: Yup.string().required('End date is required')
});

const HsEdit = ({ open, setOpen }) => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const oldDataFromState = useSelector((state) => state.UpdateSw.oldData);
  const cvById = useSelector((state) => state.CvForm.cv);
  const [isOpen, setIsOpen] = useState(open);
  const [ endDate, setEndDate ] = useState(null)

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(hsSchoolSchema),
  });

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setOpen(false);
  };

  const handleUpdate = async (data) => {
    const newData = {
      ...oldDataFromState,
      hs_name: data.hs_name,
      hs_end: data.hs_end
    };
    await dispatch(updateCvForm({ data: newData, id: id }));
    await dispatch(getCvById({type: 'sw', id: id}))
    handleClose();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(()=>{
    setValue('hs_end', endDate)
  },[endDate])

  useEffect(() => {
    if(cvById){
        setValue('hs_name', cvById.hs_name);
        setValue('hs_end', cvById.hs_end)
        setEndDate(cvById.hs_end)
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
        <DialogTitle id="alert-dialog-title">Edit Hight School</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <form onSubmit={handleSubmit(handleUpdate)}>
              <Box sx={{ pt: 1 }}>
                <TextField
                  {...register('hs_name')}
                  fullWidth
                  label={'School Name'}
                  sx={{ mb: 2 }}
                  error={!!errors.hs_name}
                  helperText={errors?.hs_name?.message}
                />
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

export default HsEdit;
