import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateCvForm } from '../../../../slices/backOffice/updateTitsswslice';
import { useParams } from 'react-router-dom';
import FormDatePicker from '../../../main/DatePicker';
import { getCvById } from '../../../../slices/backOffice/cvFromSlice';

const oneSchema = Yup.object().shape({
  name_eng: Yup.string()
    .matches(/^[A-Z ]+$/, 'You must enter the name with capital letters')
    .required('Name (english) is required'),
  name_jp: Yup.string().required('Name (japanese) is required'),
  date_of_birth: Yup.string().required('Date of birth is required'),
  phone: Yup.string().matches(/^\d{9,11}$/, 'Please fill a valid phone number').required('Phone number is required'),
  email: Yup.string().email('Please fill a valid email').required('Email is required'),
  gender: Yup.string().required('Gender is required'),
});

const Personal1 = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(open);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('ကျား');
  const oldDataFromState = useSelector((state) => state.UpdateTitssw.oldData);
  const cvById = useSelector((state) => state.CvForm.cv);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(oneSchema),
  });

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setOpen(false);
  };


  const handleUpdate = async (data) => {
    const newData = {
      ...oldDataFromState,
      name_eng: data.name_eng,
      name_jp: data.name_jp,
      date_of_birth: data.date_of_birth,
      phone: data.phone,
      email: data.email,
      gender: data.gender,
    };
    await dispatch(updateCvForm({ data: newData, id: id }));
    await dispatch(getCvById({type: 'titssw', id: id}))
    handleClose();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setValue('date_of_birth', dob);
  }, [dob]);


  useEffect(() => {
      setValue('name_eng', cvById?.name_eng);
      setValue('name_jp', cvById?.name_jp);
      setValue('date_of_birth', cvById?.date_of_birth);
      setValue('phone', cvById?.phone);
      setValue('email', cvById?.email);
      setValue('gender', cvById?.gender === '男' ? 'ကျား' : 'မ');
      setDob(cvById?.date_of_birth);
  }, [isOpen]);
  

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit CV Data</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Box sx={{ pt: 1 }}>
              <TextField
                {...register('name_eng')}
                fullWidth
                label={'Name (English)'}
                sx={{ mb: 2 }}
                error={!!errors.name_eng}
                helperText={errors?.name_eng?.message}
              />
              <TextField
                {...register('name_jp')}
                fullWidth
                label={'Name (Japanese)'}
                sx={{ mb: 2 }}
                error={!!errors.name_jp}
                helperText={errors?.name_jp?.message}
              />
              <TextField
                {...register('phone')}
                fullWidth
                label={'Phone Number'}
                sx={{ mb: 2 }}
                error={!!errors.phone}
                helperText={errors?.phone?.message}
              />
              <TextField
                {...register('email')}
                fullWidth
                label={'Email'}
                sx={{ mb: 2 }}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ width: '50%' }}>
                  <FormDatePicker dateVal={dob} setDate={setDob} errors={errors?.date_of_birth} />
                </Box>
                <Box sx={{ width: '50%', pt: 1 }}>
                  <FormControl fullWidth error={!!errors?.gender}>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="Gender"
                      onChange={(e) => {
                        setGender(e.target.value);
                        setValue('gender', e.target.value);
                      }}
                    >
                      <MenuItem value={'ကျား'}>男</MenuItem>
                      <MenuItem value={'မ'}>女</MenuItem>
                    </Select>
                    {errors?.gender && <FormHelperText>Please select an option</FormHelperText>}
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right', mt: 3 }}>
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

export default Personal1;
