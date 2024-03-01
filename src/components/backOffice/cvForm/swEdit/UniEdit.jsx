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
import { updateCvForm } from '../../../../slices/backOffice/updateSwSlice';
import { useParams } from 'react-router-dom';
import { getCvById } from '../../../../slices/backOffice/cvFromSlice';
import DatePickerMY from '../../../main/DatePickerMY'

const uniEditSchema = Yup.object().shape({
    uni_name: Yup.string().required('University name is required'),
    major: Yup.string().required('Major is required'),
    is_graduated: Yup.number().oneOf([1, 0]).required(),
    uni_start: Yup.string().required('Start date is required'),
    uni_end: Yup.string().required('End date is required'),
    last_attended_year: Yup.string().required("Last attended year is required")
});


const UniEdit = ({ open, setOpen }) => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const oldDataFromState = useSelector((state) => state.UpdateSw.oldData);
  const cvById = useSelector((state) => state.CvForm.cv);
  const [isOpen, setIsOpen] = useState(open);
  const [ startDate,setStartDate ] = useState(null)
  const [ endDate,setEndDate ] = useState(null)
  const [ isGraduated,setIsGraduated ] = useState(1)

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(uniEditSchema),
  });

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setOpen(false);
  };

  const handleUpdate = async (data) => {
    let newData;
    if (data.is_graduated === 0) {
      newData = {
        ...oldDataFromState,
        uni_name: data.uni_name,
        uni_start: data.uni_start,
        uni_end: data.uni_end,
        is_graduated: data.is_graduated,
        major: data.major,
        last_attended_year: data.last_attended_year
      };
    } else {
      newData = {
        ...oldDataFromState,
        uni_name: data.uni_name,
        uni_start: data.uni_start,
        uni_end: data.uni_end,
        is_graduated: data.is_graduated,
        major: data.major,
      };
    }
    await dispatch(updateCvForm({ data: newData, id: id }));
    await dispatch(getCvById({ type: 'sw', id: id }));
    handleClose();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(()=>{
    startDate && setValue('uni_start',startDate)
    endDate && setValue('uni_end',endDate)
  },[startDate,endDate])

  useEffect(()=>{
    setValue('is_graduated', isGraduated)
    if(isGraduated === 1){
      setValue('last_attended_year', "hello")
    }else{
      setValue('last_attended_year', cvById.last_attended_year || "")
    }
  },[isGraduated])


  useEffect(() => {
    if(cvById){
        setValue('uni_name', cvById.uni_name);
        setValue('major', cvById.major)
        setValue('uni_start', cvById.uni_start)
        setValue('uni_end', cvById.uni_end)
        setValue('is_graduated', cvById.is_graduated)
        setValue('last_attended_year', cvById.last_attended_year)
        setStartDate(cvById.uni_start)
        setEndDate(cvById.uni_end)
        setIsGraduated(cvById.is_graduated)
    }
  }, [isOpen, cvById]);
  

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit University Info</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <form onSubmit={handleSubmit(handleUpdate)}>
              <Box sx={{ pt: 1 }}>
                <TextField
                  {...register('uni_name')}
                  fullWidth
                  label={'University Name'}
                  sx={{ mb: 3 }}
                  error={!!errors.uni_name}
                  helperText={errors?.uni_name?.message}
                />
                <FormControl fullWidth error={!!errors?.is_graduated} sx={{ mb: 2 }}>
                    <InputLabel id="demo-simple-select-label">Graduated or Ungraduated</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={isGraduated}
                      label="Graduated or Ungraduated"
                      onChange={(e) => {
                        setIsGraduated(e.target.value);
                        setValue('is_graduated', e.target.value);
                      }}
                    >
                      <MenuItem value={1}>Graduated</MenuItem>
                      <MenuItem value={0}>Ungraduated</MenuItem>
                    </Select>
                    {errors?.is_graduated && <FormHelperText>Please select an option</FormHelperText>}
                </FormControl>
              </Box>
               {isGraduated === 0 &&
               <TextField
                  {...register('last_attended_year')}
                  fullWidth
                  label={'Last Attended Year'}
                  sx={{ mb: 2, mt: 1 }}
                  error={!!errors.last_attended_year}
                  helperText={errors?.last_attended_year?.message}
                />}
              <DatePickerMY dateVal={startDate} setDate={setStartDate} placeholderText={'Start Date'} error={errors?.uni_start}></DatePickerMY>
              <DatePickerMY dateVal={endDate} setDate={setEndDate} placeholderText={'End Date'} error={errors?.uni_end}></DatePickerMY>
              <TextField
                  {...register('major')}
                  fullWidth
                  label={'Major'}
                  sx={{ mb: 2, mt: 1 }}
                  error={!!errors.major}
                  helperText={errors?.major?.message}
              />
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

export default UniEdit;
