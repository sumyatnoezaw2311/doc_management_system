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


const threeSchema = Yup.object().shape({
    hobby: Yup.string().required("Hobby is required"),
    strong_point: Yup.string().required("Strong point is required"),
    weak_point: Yup.string().required("Weak point is required"),
    dream: Yup.string().required('Dream is required'),
    pr: Yup.string().required("Pr is required")
});

const Personal4 = ({ open, setOpen }) => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const oldDataFromState = useSelector((state) => state.UpdateTitssw.oldData);
  const [isOpen, setIsOpen] = useState(open);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(threeSchema),
  });

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setOpen(false);
  };

  const handleUpdate = async (data) => {
    const newData = {
      ...oldDataFromState,
      hobby: data.hobby,
      strong_point: data.strong_point,
      weak_point: data.weak_point,
      dream: data.dream,
      pr: data.pr
    };
    await dispatch(updateCvForm({ data: newData, id: id }));
    await dispatch(getCvById({type: 'titssw', id: id}))
    handleClose();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if(oldDataFromState){
        setValue('hobby', oldDataFromState.hobby);
        setValue('strong_point', oldDataFromState.strong_point);
        setValue('weak_point', oldDataFromState.weak_point);
        setValue('dream', oldDataFromState.dream);
        setValue('pr', oldDataFromState.pr);
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
        <DialogContent sx={{ width: 400 }}>
          <form onSubmit={handleSubmit(handleUpdate)}>
              <Box sx={{ pt: 1 }}>
                <TextField
                  {...register('hobby')}
                  fullWidth
                  label={'Hobby'}
                  sx={{ mb: 2 }}
                  error={!!errors.hobby}
                  helperText={errors?.hobby?.message}
                />
                <TextField
                  {...register('strong_point')}
                  fullWidth
                  label={'Strong Point'}
                  sx={{ mb: 2 }}
                  error={!!errors.strong_point}
                  helperText={errors?.strong_point?.message}
                />
                <TextField
                  {...register('weak_point')}
                  fullWidth
                  label={'Weak Point'}
                  sx={{ mb: 2 }}
                  error={!!errors.weak_point}
                  helperText={errors?.weak_point?.message}
                />
                <TextField
                  {...register('dream')}
                  fullWidth
                  label={'Dream'}
                  sx={{ mb: 2 }}
                  error={!!errors.dream}
                  helperText={errors?.dream?.message}
                  multiline
                />
                <TextField
                  {...register('pr')}
                  fullWidth
                  label={'PR'}
                  sx={{ mb: 2 }}
                  error={!!errors.pr}
                  helperText={errors?.pr?.message}
                  multiline
                />
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

export default Personal4;
