import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as React from 'react';
import { Box, Button, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateLayout from '../../../components/layouts/CreateLayout'
import DatePickerMY from '../../../components/main/DatePickerMY';
import ExpList from '../../../components/sw/ExpList'
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { setStep4Data } from '../../../slices/cvForm/SwSlice';


const jobSchema = Yup.object().shape({
  company: Yup.string().required("Please fill the company name"),
  business_type: Yup.string().required("Please fill job category"),
  position: Yup.string().required("Please fill your position"),
  start: Yup.string().required("Please choose the start date"),
  end: Yup.string().required("Please choose the end date"),
  responsibilities: Yup.string().required("Please fill you responsibilities"),
  reason_for_leaving: Yup.string().required("Please fill reson for leaving")
})

const CreateCvSw4 = () => {
  const step4Data = useSelector((state) => state.SwCv.step4Data);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [ startDate,setStartDate ] = React.useState(null)
  const [ endDate,setEndDate ] = React.useState(null)
  const [ experiences,setExperiences ] = React.useState([])

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(jobSchema)
  })

  const handleCancel = () => {
    navigate('/create-cv/sw/3');
  };

  const handleGoToNext = async ()=>{
    await dispatch(setStep4Data(experiences))
    navigate('/create-cv/sw/5')
  }

  const handleFormSubmit = async (data) => {
    setExperiences([...experiences, { id: nanoid() , ...data }])
    await reset();
    setStartDate(null)
    setEndDate(null)
  };

  React.useEffect(()=>{
    startDate && setValue('start', startDate)
    endDate && setValue('end', endDate)
  },[startDate,endDate])

  React.useEffect(()=>{
    if(step4Data){
      setExperiences(step4Data)
    }
  },[step4Data])


  return (
    <CreateLayout title="လုပ်ငန်းအတွေ့အကြုံများဖြည့်ပါ။" submTitle="Step.4">
      <form autoComplete='off' onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ width: "350px", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Divider sx={{ marginY: 1 }}>လုပ်ငန်းအတွေ့အကြုံများ</Divider>
            <ExpList listItems={experiences} getExperiences={setExperiences}/>
            <Divider sx={{ marginY: 1 }}>အသစ်ထည့်မည်</Divider>
            <TextField error={!!errors.position} helperText={ errors?.position?.message } {...register('position')} sx={{ marginTop: 1 }} label="အလုပ်ရာထူး" />
            <TextField error={!!errors.company} helperText={ errors?.company?.message } {...register('company')} sx={{ marginTop: 3 }} label="ကုမ္ပဏီအမည်" />
            <TextField error={!!errors.business_type} helperText={ errors?.business_type?.message } {...register('business_type')} sx={{ marginTop: 3 }} label="လုပ်ငန်းအမျိုးအစား" />
            <TextField error={!!errors.responsibilities} helperText={ errors?.responsibilities?.message } {...register('responsibilities')} sx={{ marginTop: 3 }} label="Responsibilities" />
            <TextField error={!!errors.reason_for_leaving} helperText={ errors?.reason_for_leaving?.message } {...register('reason_for_leaving')} sx={{ marginTop: 3, marginBottom: 2 }} label="Reason for leaving" />
            <DatePickerMY dateVal={startDate} placeholderText={"စလုပ်သည့်ခုနှစ်နှင့်လ"} setDate={setStartDate} error={errors?.start}></DatePickerMY>
            <DatePickerMY dateVal={endDate} placeholderText={"ပြီးဆုံးသည့်ခုနှစ်နှင့်လ"} setDate={setEndDate} error={errors?.end}></DatePickerMY>
            <Button type='submit' variant='contained' sx={{ marginY: 3, color: 'white' }}>Save</Button>
        </Box>
        <Box marginBottom={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button type='button' onClick={() => handleCancel()} variant='text' sx={{ color: "#000", marginRight: 3 }}>Cancel</Button>
          <Button disabled={!(experiences.length > 0)} type='button' onClick={()=> handleGoToNext() } variant='text'>Save and Next</Button>
        </Box>
      </form>
    </CreateLayout>
  );
};

export default CreateCvSw4;