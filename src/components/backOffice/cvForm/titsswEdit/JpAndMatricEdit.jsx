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
import { getCvById } from '../../../../slices/backOffice/cvFromSlice';



const hsSchoolSchema = Yup.object().shape({
    japanese_level: Yup.string().required("Japanese level is required"),
    matric_passed: Yup.string().required("Matriculation pass or fill is required")
});

const JpAndMatricEdit = ({ open, setOpen }) => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const oldDataFromState = useSelector((state) => state.UpdateTitssw.oldData);
  const [isOpen, setIsOpen] = useState(open);
  const [ matricPassed,setMatricPassed ] = useState(0)

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
      japanese_level: data.japanese_level,
      matric_passed: data.matric_passed,
    };
    await dispatch(updateCvForm({ data: newData, id: id }));
    await dispatch(getCvById({type: 'titssw', id: id}))
    handleClose();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(()=>{
    setValue('matric_passed', matricPassed)
  },[matricPassed])


  useEffect(() => {
    if(oldDataFromState){
        setValue('japanese_level', oldDataFromState.japanese_level);
        setValue('matric_passed', oldDataFromState.matric_passed)
        setMatricPassed(oldDataFromState.matric_passed)
    }
  }, [isOpen, oldDataFromState]);
  

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Informations</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <form onSubmit={handleSubmit(handleUpdate)}>
              <Box sx={{ pt: 1 }}>
                <TextField
                  {...register('japanese_level')}
                  fullWidth
                  label={'Japanese Level'}
                  sx={{ mb: 2 }}
                  error={!!errors.japanese_level}
                  helperText={errors?.japanese_level?.message}
                />
                <FormControl fullWidth error={!!errors?.matric_passed}>
                    <InputLabel id="demo-simple-select-label">Matriculation</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={matricPassed}
                      label="Matriculation"
                      onChange={(e) => {
                        setMatricPassed(e.target.value);
                        setValue('matric_passed', e.target.value);
                      }}
                    >
                      <MenuItem value={1}>Passed</MenuItem>
                      <MenuItem value={0}>Failed</MenuItem>
                    </Select>
                    {errors?.matric_passed && <FormHelperText>Please select an option</FormHelperText>}
                </FormControl>
              </Box>
            <Box sx={{ textAlign: 'right', mt: 2 }}>
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

export default JpAndMatricEdit;
