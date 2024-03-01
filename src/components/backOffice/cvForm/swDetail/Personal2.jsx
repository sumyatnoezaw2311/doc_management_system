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
import { useParams } from 'react-router-dom';
import { getCvById } from '../../../../slices/backOffice/cvFromSlice';
import { updateCvForm } from '../../../../slices/backOffice/updateSwSlice';

const oneSchema = Yup.object().shape({
    address_eng: Yup.string().required("Address(english) is required"),
    address_jp: Yup.string().required("Address in japanese is required"),
    dependent_family: Yup.number().typeError("Please fill a valid count").required("Dependent family is required"),
    family_phone : Yup.string().required("Family's phone number is required")
        .matches(/^\d{9,11}$/, 'Please fill a valid phone number'),
    pr: Yup.string().required("PR is required")
});

const Personal2 = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(open);
  const oldDataFromState = useSelector((state) => state.UpdateSw.oldData);

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
      address_eng: data.address_eng,
      address_jp: data.address_jp,
      dependent_family: data.dependent_family,
      family_address: data.family_address,
      family_phone: data.family_phone,
      pr: data.pr,
    };
    await dispatch(updateCvForm({ data: newData, id: id }));
    await dispatch(getCvById({type: 'sw', id: id}))
    handleClose();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
      if(oldDataFromState){
        setValue('address_eng', oldDataFromState?.address_eng);
        setValue('address_jp', oldDataFromState?.address_jp)
        setValue('dependent_family', oldDataFromState?.dependent_family)
        setValue('family_address', oldDataFromState?.family_address)
        setValue('family_phone', oldDataFromState?.family_phone)
        setValue('pr', oldDataFromState?.pr)
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
        <DialogTitle id="alert-dialog-title">Edit CV Data</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Box sx={{ pt: 1 }}>
              <TextField
                {...register('address_eng')}
                fullWidth
                label={'Address (English)'}
                sx={{ mb: 2 }}
                error={!!errors.address_eng}
                helperText={errors?.address_eng?.message}
              />
              <TextField
                {...register('address_jp')}
                fullWidth
                label={'Address (Japanese)'}
                sx={{ mb: 2 }}
                error={!!errors.address_jp}
                helperText={errors?.address_jp?.message}
              />
              <TextField
                {...register('dependent_family')}
                fullWidth
                label={'Dependent Family'}
                sx={{ mb: 2 }}
                error={!!errors.dependent_family}
                helperText={errors?.dependent_family?.message}
              />
              <TextField
                {...register('family_address')}
                fullWidth
                label={"Family's address"}
                sx={{ mb: 2 }}
                error={!!errors.family_address}
                helperText={errors?.family_address?.message}
              />
              <TextField
                {...register('family_phone')}
                fullWidth
                label={"Family's phone"}
                sx={{ mb: 2 }}
                error={!!errors.family_phone}
                helperText={errors?.family_phone?.message}
              />
              <TextField
                multiline
                {...register('pr')}
                fullWidth
                label={"PR"}
                sx={{ mb: 2 }}
                error={!!errors.pr}
                helperText={errors?.pr?.message}
              />
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

export default Personal2;
