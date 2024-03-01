import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as React from 'react';
import { Box, Button, TextField, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateLayout from '../../../components/layouts/CreateLayout'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import JobsList from '../../../components/tit-ssw/JobsList'
import dayjs from 'dayjs';
import { nanoid } from '@reduxjs/toolkit';
import theme from '../../../utils/theme';
import { useDispatch, useSelector } from 'react-redux';
import { setStep7Data } from '../../../slices/cvForm/TitsswSlice';

const jobSchema = Yup.object().shape({
  company_name: Yup.string().required("ကျောင်းနာမည်ထည့်ပါ"),
  job_category: Yup.string().required("လုပ်ငန်းအမျိုးအစားထည့်ပါ"),
  position: Yup.string().required("အလုပ်ရာထူးထည့်ပါ"),
  location: Yup.string().required("လုပ်ငန်းအမျိုးအစားထည့်ပါ"),
  start_date: Yup.string().required("စသည့်ခုနှစ်နှင့်လရွေးပါ"),
  end_date: Yup.string().required("ပြီးသည့်ခုနှစ်နှင့်လရွေးပါ")
})

const CreateCvStep7 = () => {
  const step7Data = useSelector((state) => state.TitSswCv.step7Data);
  const step6Data = useSelector((state) => state.TitSswCv.step6Data);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [ startDate,setStartDate ] = React.useState(null)
  const [ endDate,setEndDate ] = React.useState(null)
  const [ jobs,setJobs ] = React.useState([])

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(jobSchema)
  })

  const handleInternalDateChange = (value,type) => {
    const date = dayjs(`${value.$y}-${value.$M + 1}`)
    const formattedDate = date.format("YYYY-MM");
    type === 'startDate' ? setValue('start_date',formattedDate): setValue('end_date',formattedDate);
    type === 'startDate' ? setStartDate(dayjs(formattedDate)) : setEndDate(dayjs(formattedDate))
  };

  const handleCancel = () => {
    navigate('/create-cv/tit-ssw/6');
  };

  const handleFormSubmit = (data) => {
    setJobs([...jobs,{id: nanoid(),...data}])
    // setStepNumber(7)
    reset();
    setStartDate(null)
    setEndDate(null)
  };

  const handleGoToNext = async ()=>{
    await dispatch(setStep7Data(jobs));
    navigate('/create-cv/tit-ssw/8')
  }

  React.useEffect(()=>{
    if(step7Data){
      setJobs(step7Data);
    }
  },[step7Data])

    
  React.useEffect(()=>{
    if(!step6Data) navigate(-1);
  },[step6Data])

  return (
    <CreateLayout title="လုပ်ငန်းအတွေ့အကြုံများဖြည့်ပါ။" submTitle="Step.7">
      <form autoComplete='off' onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ width: "350px", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Divider sx={{ marginY: 1 }}>လုပ်ငန်းအတွေ့အကြုံများ</Divider>
            <JobsList listItems={jobs} setListItems={setJobs}/>
            <Divider sx={{ marginY: 1 }}>အသစ်ထည့်မည်</Divider>
            <Typography sx={{ marginBottom: 1, fontSize: "14px" }} color={theme.palette.danger.main} variant='small'>
              ကျောင်းပြီး/ကျောင်းနားသည့်နှစ်မှ သင်တန်းတက်သည်အထိအချိန်လွတ်မကျန်ခဲ့စေရန်။
              မရှိပါက အိမ်အလုပ်လုပ်သည်ဟုထည့်ပါ။
            </Typography> 
            <TextField error={!!errors.position} helperText={ errors?.position?.message } {...register('position')} sx={{ marginTop: 1 }} label="အလုပ်ရာထူး" />
            <TextField error={!!errors.company_name} helperText={ errors?.company_name?.message } {...register('company_name')} sx={{ marginTop: 2 }} label="ကုမ္ပဏီအမည်" />
            <TextField error={!!errors.job_category} helperText={ errors?.job_category?.message } {...register('job_category')} sx={{ marginTop: 2 }} label="လုပ်ငန်းအမျိုးအစား" />
            <Typography sx={{ marginY: 1, fontSize: "14px" }} color={theme.palette.danger.main} variant='small'>Township, Division, Region ဟုမှန်ကန်သည့် စာလုံးပေါင်းအတိုင်း google မှရှာရေးပါ</Typography>
            <TextField error={!!errors.location} helperText={ errors?.location?.message } {...register('location')} sx={{ marginTop: 1 }} label="တည်နေရာ" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer sx={{ width: "100%", marginTop: 2 }} components={['DatePicker']}>
                  <DatePicker
                      sx={{ width: "100%" }}
                      views={['year', 'month']}
                      openTo="month"
                      label={'စလုပ်သည့်ခုနှစ်နှင့်လ'}
                      format="YYYY-MM"
                      value={startDate}
                      slotProps={{
                        textField: {
                          error: !!errors?.start_date,
                          helperText: errors?.start_date?.message,
                        },
                      }}
                      onChange={(dateValue)=> handleInternalDateChange(dateValue,"startDate")}
                  />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer sx={{ width: "100%", marginTop: 2 }} components={['DatePicker']}>
                  <DatePicker
                      sx={{ width: "100%" }}
                      views={['year', 'month']}
                      openTo="month"
                      label={'ပြီးဆုံးသည့်ခုနှစ်နှင့်လ'}
                      format="YYYY-MM" 
                      value={endDate}
                      slotProps={{
                        textField: {
                          error: !!errors?.end_date,
                          helperText: errors?.end_date?.message,
                        },
                      }}
                      onChange={(dateValue)=> handleInternalDateChange(dateValue,"endDate")}
                  />
              </DemoContainer>
            </LocalizationProvider>
            <Button type='submit' variant='contained' sx={{ marginY: 3, color: 'white' }}>Save</Button>
        </Box>
        <Box marginBottom={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button type='button' onClick={() => handleCancel()} variant='text' sx={{ color: "#000", marginRight: 3 }}>Cancel</Button>
          <Button disabled={!(jobs.length > 0)} type='button' onClick={()=> handleGoToNext() } variant='text'>Save and Next</Button>
        </Box>
      </form>
    </CreateLayout>
  );
};

export default CreateCvStep7;
