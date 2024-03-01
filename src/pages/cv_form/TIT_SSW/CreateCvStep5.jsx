import * as React from 'react';
import { Box, Typography, Button, FormControl, MenuItem,Select, InputLabel, TextField, FormHelperText } from '@mui/material';
import theme from '../../../utils/theme';
import { useNavigate } from 'react-router-dom';
import CreateLayout from '../../../components/layouts/CreateLayout'
import DatePickerMY from '../../../components/main/DatePickerMY'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { setStep5Data } from '../../../slices/cvForm/TitsswSlice';


const step5Schema = Yup.object().shape({
  uni_name: Yup.string().required('တက္ကသိုလ်အမည်ဖြည့်ရန်လိုအပ်ပါသည်'),
  major: Yup.string().required('မေဂျာဖြည့်ပါ'),
  is_graduated: Yup.string()
    .oneOf(['ဘွဲ့ရ', 'ကျောင်းနား']).required("ဘွဲ့ရ သို့မဟုတ် ကျောင်းနား ရွေးပါ"),
  last_attended_year: Yup.string().required("နောက်ဆုံးတက်ရောက်ခဲ့သောနှစ်ကိုထည့်ပါ"),
  uni_start: Yup.string().required('စတက်သည့်ခုနှစ်နှင့်လကိုရွေးပါ'),
  uni_end: Yup.string().required('ပြီးသည့်ခုနှစ်နှင့်လကိုရွေးပါ'),
});
const CreateCvStep5 = () => {
  const step5Data = useSelector((state) => state.TitSswCv.step5Data);
  const step4Data = useSelector((state) => state.TitSswCv.step4Data);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isGraduated, setIsGraduated] = React.useState(step5Data?.is_graduated || "ဘွဲ့ရ");
  const [ uniStart,setUniStart ] = React.useState(step5Data?.uni_start || null)
  const [ uniEnd,setUniEnd ] = React.useState(step5Data?.uni_end || null)

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(step5Schema),
  });


  const handleChange = (event) => {
    setIsGraduated(event.target.value);
    setValue('is_graduated',event.target.value);
  };

  const handleCancel = () => {
    navigate('/create-cv/tit-ssw/4');
  };

  const handleSkip = ()=>{
    navigate('/create-cv/tit-ssw/6');
    // if(!step4Data.hs_name && !step4Data.hs_start && !step4Data.hs_end){
    //   navigate('/create-cv/tit-ssw/6');
    // }else{
    //   console.log('cannot skip')
    // }
  }

  const onSubmit = (data) => {
    if(!step4Data.hs_name && !step4Data.hs_start && !step4Data.hs_end){
      dispatch(setStep5Data({
        is_graduated: data.is_graduated,
        major: data.major,
        uni_name: data.uni_name,
        uni_start: data.uni_start,
        uni_end: data.uni_end
      }))
    }
    navigate('/create-cv/tit-ssw/6');
  };

  React.useEffect(()=>{
    setValue('uni_start',uniStart)
    setValue("uni_end",uniEnd)
  },[uniStart,uniEnd])

  React.useEffect(()=>{
    setValue('is_graduated', "ဘွဲ့ရ")
  },[])

  React.useEffect(()=>{
    if(isGraduated === 'ဘွဲ့ရ'){
      setValue('last_attended_year', "null")
    }else{
      setValue('last_attended_year', "")
    }
  },[isGraduated])

  React.useEffect(()=>{
    if(step5Data){
      setValue('uni_name', step5Data.uni_name)
      setValue('uni_start', step5Data.uni_start)
      setValue('uni_end', step5Data.uni_end)
      setValue('major', step5Data.major)
      setValue('is_graduated', step5Data.is_graduated)
      setValue('last_attended_year', step5Data.last_attended_year || 'hello')
    }
  },[step5Data])

  React.useEffect(()=>{
    if(!step4Data) navigate(-1);
  },[step4Data])

  return (
    <CreateLayout title="ပညာအရည်ချင်းမှတ်တမ်းဖြည့်ပါ။" submTitle="Step.5">
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: "350px", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
              <Typography color={theme.palette.primary.main} sx={{ fontWeight: 'bold' }}>တက္ကသိုလ်</Typography>
              <Button onClick={()=> handleSkip()} variant='outlined'>Skip</Button>
            </Box>
            <TextField error={!!errors?.uni_name} helperText={errors?.uni_name?.message} sx={{ marginBottom: 3 }} {...register('uni_name')} label="တက္ကသိုလ်အမည်"></TextField>
            <TextField error={!!errors?.major} helperText={errors?.major?.message} sx={{ marginBottom: 3 }} {...register('major')} label="မေဂျာ"></TextField>
            <FormControl
              error={!!errors?.is_graduated}
              fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="demo-simple-select-label">ဘွဲ့ရ သို့မဟုတ် ကျောင်းနား</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={isGraduated}
                  label="ဘွဲ့ရ သို့မဟုတ် ကျောင်းနား"
                  onChange={handleChange}
                  >
                  <MenuItem value={"ဘွဲ့ရ"}>ဘွဲ့ရ</MenuItem>
                  <MenuItem value={"ကျောင်းနား"}>ကျောင်းနား</MenuItem>
                </Select>
                {errors?.is_graduated && (
                  <FormHelperText sx={{ color: theme.palette.danger.main }}>
                    {errors.is_graduated.message}
                  </FormHelperText>
                )}
            </FormControl>
            <TextField error={!!errors?.last_attended_year} helperText={errors?.last_attended_year?.message} {...register('last_attended_year')} sx={{marginBottom: 2, marginTop: 1, display: isGraduated === "ကျောင်းနား" ? 'flex' : 'none',}} label={"နောက်ဆုံးတက်ရောက်ခဲ့သောနှစ်"} placeholder='2nd year'></TextField>
            <DatePickerMY dateVal={uniStart} placeholderText={"စတက်သည့်ခုနှစ်နှင့်လ"} setDate={setUniStart} error={errors?.uni_start}></DatePickerMY>
            <DatePickerMY dateVal={uniEnd} placeholderText={"ပြီးသည့်ခုနှစ်နှင့်လ"} setDate={setUniEnd} error={errors?.uni_end}></DatePickerMY>
        </Box>
        <Box marginY={3} sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
          <Button type='button' onClick={() => handleCancel()} variant='text' sx={{ color: "#000", marginRight: 3 }}>Cancel</Button>
          <Button type='submit' variant='contained' sx={{ color: theme.palette.common.white }}>Save and Next</Button>
        </Box>
      </form>
    </CreateLayout>
  );
};

export default CreateCvStep5;
