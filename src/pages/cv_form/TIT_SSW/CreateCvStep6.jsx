import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as React from 'react';
import { Box, Button, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateLayout from '../../../components/layouts/CreateLayout'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EduList from '../../../components/tit-ssw/EduList'
import dayjs from 'dayjs';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { setStep6Data } from '../../../slices/cvForm/TitsswSlice';

const edOtherSchema = Yup.object().shape({
  name: Yup.string().required("ကျောင်းနာမည်ထည့်ပါ။"),
  start: Yup.string().required("စတတ်သည့်ခုနှစ်နှင့်လရွေးပါ"),
  end: Yup.string().required("ပြီးသည့်ခုနှစ်နှင့်လရွေးပါ")
})

const CreateCvStep6 = () => {
  const step6Data = useSelector((state) => state.TitSswCv.step6Data);
  const step4Data = useSelector((state) => state.TitSswCv.step4Data);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [ startDate,setStartDate ] = React.useState(null)
  const [ endDate,setEndDate ] = React.useState(null)
  const [ edus,setEdus ] = React.useState([])

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(edOtherSchema)
  })

  const handleInternalDateChange = (value,type) => {
    const date = dayjs(`${value.$y}-${value.$M + 1}`)
    const formattedDate = date.format("YYYY-MM");
    type === 'startDate' ? setValue('start',formattedDate): setValue('end',formattedDate);
    type === 'startDate' ? setStartDate(dayjs(formattedDate)) : setEndDate(dayjs(formattedDate))
  };

  const handleCancel = () => {
    navigate('/create-cv/tit-ssw/5');
    // navigate(-1)
  };

  const handleFormSubmit = (data) => {
    setEdus([...edus,{id: nanoid(),...data}])
    reset();
    setStartDate(null)
    setEndDate(null)
  };


  const handleGoToNext = ()=>{
    dispatch(setStep6Data(edus))
    navigate('/create-cv/tit-ssw/7');
  }

  React.useEffect(()=>{
    if(step6Data){
      setEdus(step6Data);
    }
  },[step6Data])
  
  React.useEffect(()=>{
    if(!step4Data) navigate(-1);
  },[step4Data])

  return (
    <CreateLayout title="ပညာအရည်ချင်းမှတ်တမ်းဖြည့်ပါ။" submTitle="Step.6">
      <form autoComplete='off' onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ width: "350px", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Divider sx={{ marginY: 1 }}>အခြားတက်ရောက်ခဲ့သောကျောင်းများ</Divider>
            <EduList listItems={edus} getListItems={setEdus}/>
            <Divider sx={{ marginY: 1 }}>အသစ်ထည့်မည်</Divider>
            <TextField error={!!errors.name} helperText={ errors?.name?.message } {...register('name')} sx={{ marginTop: 2 }} label="ကျောင်းအမည်" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer sx={{ width: "100%", marginTop: 2 }} components={['DatePicker']}>
                  <DatePicker
                      sx={{ width: "100%" }}
                      views={['year', 'month']}
                      openTo="month"
                      label={'စတက်သည့်ခုနှစ်နှင့်လ'}
                      format="YYYY-MM"
                      value={startDate}
                      slotProps={{
                        textField: {
                          error: !!errors?.start,
                          helperText: errors?.start?.message,
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
                      label={'စတက်သည့်ခုနှစ်နှင့်လ'}
                      format="YYYY-MM" 
                      value={endDate}
                      slotProps={{
                        textField: {
                          error: !!errors?.end,
                          helperText: errors?.end?.message,
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
          <Button onClick={()=>{ handleGoToNext() }} disabled={!(edus.length > 0)} type='button' variant='text'>Save and Next</Button>
        </Box>
      </form>
    </CreateLayout>
  );
};

export default CreateCvStep6;
