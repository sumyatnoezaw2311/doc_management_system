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
import { getOldData, updateCvForm } from '../../../../slices/backOffice/updateTitsswslice';
import { transform } from '../../../../utils/transformsrc';
import { useParams } from 'react-router-dom';
import FormDatePicker from '../../../main/DatePicker';
import BloodType from '../../../main/BloodType'
import { getCvById } from '../../../../slices/backOffice/cvFromSlice';


const twoSchema = Yup.object().shape({
    height: Yup.number()
    .min(137, " 137cm ရှိရမည်")
    .typeError("Please a valid height value")
    .required("Height is required"),
  weight: Yup.number()
    .typeError("Please a valid weight value")
    .required("Weight is required"),
  blood_type: Yup.string().required("Select blood type"),
  religion: Yup.string().required("Religion is required"),
  eye_left: Yup.number()
    .typeError("Please fill a valid value")
    .min(1, "Minimum 1")
    .max(2, "Maximum 2")
    .required("Visibility(left) is required"),
  eye_right: Yup.number()
    .typeError("Please fill a valid value")
    .min(1, "Minimum 1")
    .max(2, "Maximum 2")
    .required("Visibility(right) is required"),
});

const Personal2 = ({ open, setOpen }) => {

  const [ bloodType,setBloodType ] = useState("A")
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(open);
  const oldDataFromState = useSelector((state) => state.UpdateTitssw.oldData);
  const cvById = useSelector((state) => state.CvForm.cv);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(twoSchema),
  });

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setOpen(false);
  };

  const handleUpdate = async (data) => {
    const newData = {
      ...oldDataFromState,
      height: data.height,
      weight: data.weight,
      blood_type: data.blood_type,
      religion: data.religion,
      eye_left: data.eye_left,
      eye_right: data.eye_right,
    };
    await dispatch(updateCvForm({ data: newData, id: id }));
    await dispatch(getCvById({type: 'titssw', id: id}))
    handleClose();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setValue('blood_type', bloodType);
  }, [bloodType]);


  useEffect(() => {
      setValue('height', cvById?.height);
      setValue('weight', cvById?.weight);
      setValue('blood_type', cvById?.blood_type);
      setValue('religion', cvById?.religion);
      setValue('eye_left', cvById?.eye_left);
      setValue('eye_right', cvById?.eye_right);
      setBloodType(cvById?.blood_type);
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
                {...register('height')}
                fullWidth
                label={'Height(cm)'}
                sx={{ mb: 2 }}
                error={!!errors.height}
                helperText={errors?.height?.message}
              />
              <TextField
                {...register('weight')}
                fullWidth
                label={'Weight(Kg)'}
                sx={{ mb: 2 }}
                error={!!errors.weight}
                helperText={errors?.weight?.message}
              />
            <BloodType val={bloodType} setVal={setBloodType} errors={errors} label={"Blood Type"}></BloodType>
              <TextField
                {...register('religion')}
                fullWidth
                label={'Religion'}
                sx={{ my: 2 }}
                error={!!errors.religion}
                helperText={errors?.religion?.message}
              />
               <TextField
                {...register('eye_left')}
                fullWidth
                label={'Visibility(left)'}
                sx={{ mb: 2 }}
                error={!!errors.eye_left}
                helperText={errors?.eye_left?.message}
              />
              <TextField
                {...register('eye_right')}
                fullWidth
                label={'Visibility(right)'}
                sx={{ mb: 2 }}
                error={!!errors.eye_right}
                helperText={errors?.eye_right?.message}
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

export default Personal2;
