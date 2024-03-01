import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, FormControlLabel, Checkbox,TextField,FormControl,RadioGroup,Radio,FormHelperText } from '@mui/material';
import theme from '../../../utils/theme';
import { useNavigate } from 'react-router-dom';
import CreateLayout from '../../../components/layouts/CreateLayout'
import DatePickerMY from '../../../components/main/DatePickerMY';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { setStep4Data, setStep5Data } from '../../../slices/cvForm/TitsswSlice';
import { useDispatch, useSelector } from 'react-redux';

const step4Schema = Yup.object().shape({
  ps_name: Yup.string().required("မူလတန်းကျောင်းအမည်ကိုဖြည့်ပါ"),
  ps_start: Yup.string().required("စတက်သည့်ခုနှစ်နှင့်လကိုရွေးပါ"),
  ps_end: Yup.string().required("ပြီးသည့်ခုနှစ်နှင့်လကိုရွေးပါ"),
  ms_name: Yup.string().required("အလယ်တန်းကျောင်းအမည်ကိုဖြည့်ပါ"),
  ms_start: Yup.string().required("စတက်သည့်ခုနှစ်နှင့်လကိုရွေးပါ"),
  ms_end: Yup.string().required("ပြီးသည့်ခုနှစ်နှင့်လကိုရွေးပါ"),
  hs_name: Yup.string().nullable(),
  hs_start: Yup.string().nullable(),
  hs_end: Yup.string().nullable(),
  matric_passed: Yup.number().required("တက္ကသိုလ်ဝင်တန်းအောင်/ရှုံးရွေးချယ်ပါ")
});

const CreateCvStep4 = () => {
  const step4Data = useSelector((state) => state.TitSswCv.step4Data);
  const step3Data = useSelector((state) => state.TitSswCv.step3Data);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [ confirm,setConfirm ] = useState(false)
  const [ primaryStart,setPrimaryStart ] = useState(step4Data?.ps_start || null)
  const [ primaryEnd,setPrimaryEnd ] = useState(step4Data?.ps_end || null)
  const [ middleStart,setMiddleStart ] = useState(step4Data?.ms_start || null)
  const [ middleEnd,setMiddleEnd ] = useState(step4Data?.ms_end || null)
  const [ hightStart,setHightStart ] = useState(step4Data?.hs_start || null)
  const [ hightEnd,setHightEnd ] = useState(step4Data?.hs_end || null)
  const [matricPassed, setMatricPassed] = useState(step4Data?.matric_passed.toString() || "");

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(step4Schema),
  });


  const handleCheck = ()=>{
    setConfirm(prev=> !prev)
  }

  const handleCancel = () => {
    navigate('/create-cv/tit-ssw/3');
  };

  const onSubmit = (data) => {
    if (!data.hs_name || !data.hs_start || !data.hs_end) {
      data.hs_name = null;
      data.hs_start = null;
      data.hs_end = null;
      dispatch(setStep4Data(data));
    }else if(data.hs_name && data.hs_start && data.hs_end){
      dispatch(setStep4Data(data));
    }else{
      console.log("can't save ");
      return;
    }
    navigate('/create-cv/tit-ssw/5');
  };

  useEffect(()=>{
    primaryStart && setValue('ps_start',primaryStart);
    primaryEnd && setValue('ps_end',primaryEnd);
    middleStart && setValue('ms_start',middleStart);
    middleEnd && setValue('ms_end',middleEnd)
    setValue('hs_start',hightStart ? hightStart : null)
    setValue('hs_end',hightEnd ? hightEnd : null)
  },[primaryStart,primaryEnd,middleStart,middleEnd,hightStart,hightEnd])

  useEffect(()=>{
    if(step4Data){
      setValue('ps_name', step4Data.ps_name)
      setValue('ps_start',step4Data.ps_start)
      setValue('ps_end', step4Data.ps_end)
      setValue('ms_name', step4Data.ms_name)
      setValue('ms_start', step4Data.ms_start)
      setValue('ms_end', step4Data.ms_end)
      setValue('hs_name', step4Data.hs_name)
      setValue('hs_start', step4Data.hs_start)
      setValue('hs_end', step4Data.hs_end)
      setValue('matric_passed', step4Data.matric_passed)
    }
  },[step4Data])

  
  // useEffect(()=>{
  //   if(!step3Data) navigate(-1);
  // },[step3Data])


  return (
    <CreateLayout title="ပညာအရည်ချင်းမှတ်တမ်းဖြည့်ပါ။" submTitle="Step.4">
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: "350px", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography color={theme.palette.primary.main} sx={{ fontWeight: 'bold', marginBottom: 2 }}>မူလတန်းကျောင်း</Typography>
            <Typography sx={{ marginBottom: 1, fontSize: "14px" }} color={theme.palette.danger.main} variant='small'>ကျောင်းနာမည်အပြည့်အစုံကိုအင်္ဂလိပ်လိုရေးပါ</Typography>
            <TextField placeholder='B.E.P.S (Myo Pyin Gyi)' {...register('ps_name')} error={!!errors?.ps_name} helperText={errors?.ps_name && errors?.ps_name.message} label="ကျောင်းနာမည်"></TextField>
            <Box sx={{ marginTop: 2 }}>
                <DatePickerMY dateVal={primaryStart} placeholderText={"စတက်သည့်ခုနှစ်နှင့်လ"} setDate={setPrimaryStart} error={errors?.ps_start ? errors.ps_start : null}></DatePickerMY>
                <DatePickerMY dateVal={primaryEnd} placeholderText={"ပြီးသည့်ခုနှစ်နှင့်လ"}  setDate={setPrimaryEnd} error={errors?.ps_end ? errors.ps_end : null}></DatePickerMY>
            </Box>
            <Typography color={theme.palette.primary.main} sx={{ fontWeight: 'bold', marginBottom: 2 }}>အလယ်တန်းကျောင်း</Typography>
            <Typography sx={{ marginBottom: 1, fontSize: "14px" }} color={theme.palette.danger.main} variant='small'>ကျောင်းနာမည်အပြည့်အစုံကိုအင်္ဂလိပ်လိုရေးပါ</Typography>
            <TextField placeholder='B.E.H.S (Myitnge)' {...register('ms_name')} error={ !!errors.ms_name } helperText={errors?.ms_name && errors?.ms_name.message} label="ကျောင်းနာမည်"></TextField>
            <Box sx={{ marginTop: 2 }}>
                <DatePickerMY dateVal={middleStart} placeholderText={"စတက်သည့်ခုနှစ်နှင့်လ"} setDate={setMiddleStart} error={errors?.ms_start ? errors.ms_start : null}></DatePickerMY>
                <DatePickerMY dateVal={middleEnd} placeholderText={"ပြီးသည့်ခုနှစ်နှင့်လ"} setDate={setMiddleEnd} error={errors?.ms_end ? errors.ms_end : null}></DatePickerMY>
            </Box>
            <Typography color={theme.palette.primary.main} sx={{ fontWeight: 'bold', marginBottom: 2 }}>အထက်တန်းကျောင်း</Typography>
            <Typography sx={{ marginBottom: 1, fontSize: "14px" }} color={theme.palette.danger.main} variant='small'>ကျောင်းနာမည်အပြည့်အစုံကိုအင်္ဂလိပ်လိုရေးပါ</Typography>
            <TextField placeholder='B.E.H.S (Myitnge)' {...register('hs_name')} error={!!errors?.hs_name} helperText={errors?.hs_name && errors?.hs_name.message} label="ကျောင်းနာမည်"></TextField>
            <Box sx={{ marginTop: 2 }}>
                <DatePickerMY dateVal={hightStart} placeholderText={"စတက်သည့်ခုနှစ်နှင့်လ"} setDate={setHightStart} error={errors?.hs_start ? errors.hs_start : null} ></DatePickerMY>
                <DatePickerMY dateVal={hightEnd} placeholderText={"ပြီးသည့်ခုနှစ်နှင့်လ"} setDate={setHightEnd} error={errors?.hs_end ? errors.hs_end : null}></DatePickerMY>
            </Box>
            <FormControl sx={{ marginBottom: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>တက္ကသိုလ်ဝင်တန်း</Typography>
              <RadioGroup
                onChange={(e) => {
                  setValue("matric_passed", e.target.value)
                  setMatricPassed(e.target.value)
                }}
                value={matricPassed}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={1}
                  control={<Radio sx={errors?.matric_passed && {color: 'red'}} />}
                  label={<Typography sx={{ marginRight: 5 }}>အောင်</Typography>}
                />
                <FormControlLabel
                  value={0}
                  control={<Radio sx={errors?.matric_passed && {color: 'red'}} />}
                  label={<Typography>ရှုံး</Typography>}
                />
              </RadioGroup>
            </Box>
              {errors?.matric_passed && (
                <FormHelperText sx={{ color: theme.palette.danger.main }}>
                  {errors.matric_passed.message}
                </FormHelperText>
              )}
          </FormControl>
            <FormControlLabel sx={{ textAlign: 'justify', color: theme.palette.danger.main }} control={<Checkbox onChange={()=> handleCheck() } />} label={<Typography sx={{ fontSize: "12px"}}>ပြန်လည်စစ်ဆေးရန် - မူလတန်း မှ အထက်တန်း အထိ စုစုပေါင်း၁၁နှစ်ရှိသည်။ နားသည့်နှစ်၊ ကျသည့်နှစ် ရှိပါက ထည့်တွက်ရမည်။ မရှိပါက ၁၁နှစ်ထက်မကျော်နေစေရန်</Typography>} />
        </Box>
        <Box marginY={3} sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
          <Button type='button' onClick={() => handleCancel()} variant='text' sx={{ color: "#000", marginRight: 3 }}>Cancel</Button>
          <Button type='submit' disabled={!confirm} variant='contained' sx={{ color: theme.palette.common.white }}>Save and Next</Button>
        </Box>
      </form>
    </CreateLayout>
  );
};

export default CreateCvStep4;
