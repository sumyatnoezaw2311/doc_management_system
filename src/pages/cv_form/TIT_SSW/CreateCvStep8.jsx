import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Box, Button, TextField, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateLayout from '../../../components/layouts/CreateLayout'
import { nanoid } from '@reduxjs/toolkit';
import theme from '../../../utils/theme';
import FamilyMembersList from '../../../components/tit-ssw/FamilyMembersList';
import { useDispatch, useSelector } from 'react-redux';
import { setStep8Data } from '../../../slices/cvForm/TitsswSlice';

const jobSchema = Yup.object().shape({
  name: Yup.string()
  .matches(/^[A-Z ]+$/, "အင်္ဂစာလုံးအကြီးဖြင့်ရေးရမည်")
  .required("အမည်ထည့်ပါ"),
  relation: Yup.string().required("တော်စပ်ပုံရေးပါ"),
  age: Yup.number().typeError("မှန်ကန်စွာဖြည့်ပါ").required("အသက်ထည့်ပါ"),
  job: Yup.string().required("အလုပ်အကိုင်ထည့်ပါ"),
  address: Yup.string().required("နေရပ်လိပ်စာဖြည့်ပါ"),
})

const CreateCvStep8 = () => {

  const step8Data = useSelector((state) => state.TitSswCv.step8Data);
  const step7Data = useSelector((state) => state.TitSswCv.step7Data);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [ members,setMembers ] = useState([])

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(jobSchema)
  })

  const handleCancel = () => {
    navigate('/create-cv/tit-ssw/7');
  };

  const handleGoToNext = ()=>{
    dispatch(setStep8Data(members))
    navigate('/create-cv/tit-ssw/9')
  }

  const handleFormSubmit = (data) => {
    setMembers([...members,{id: nanoid(),...data}])
    reset();
  };

  React.useEffect(()=>{
    if(step8Data){
      setMembers(step8Data);
    }
  },[step8Data])

  React.useEffect(()=>{
    if(!step7Data) navigate(-1);
  },[step7Data])


  return (
    <CreateLayout title="အိမ်ထောင်စုစာရင်းဖြည့်ပါ။" submTitle="Step.8">
      <form autoComplete='off' onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ width: "350px", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Divider sx={{ marginY: 1 }}>မိသားစုဝင်များ</Divider>
            <FamilyMembersList listItems={members} setListItems={setMembers}/>
            <Divider sx={{ marginY: 1 }}>အသစ်ထည့်မည်</Divider>
            <Typography sx={{ marginBottom: 1, fontSize: "14px" }} color={theme.palette.danger.main} variant='small'>
              အမည်ကိုအင်္ဂလိပ်စာလုံးအကြီးဖြင့်အပြည့်အစုံရေးပါ
            </Typography> 
            <TextField error={!!errors.name} helperText={ errors?.name?.message } {...register('name')} sx={{ marginTop: 1 }} label="မိသားစုဝင်အမည်" />
            <TextField error={!!errors.relation} helperText={ errors?.relation?.message } {...register('relation')} sx={{ marginTop: 2 }} label="တော်စပ်ပုံ" />
            <TextField error={!!errors.age} helperText={ errors?.age?.message } {...register('age')} sx={{ marginTop: 2 }} label="အသက်" />
            <Typography sx={{ marginY: 1, fontSize: "14px" }} color={theme.palette.danger.main} variant='small'>
              မိသားစုဝင်များ၏အလုပ်အကိုင်ကိုအတိအကျရေးပေးပါ။
              <br></br>
              ဥပမာ - အရောင်းအဝယ်၊ အိမ်ဆိုင်၊ ကျပန်း စသည်။
            </Typography>
            <TextField error={!!errors.job} helperText={ errors?.job?.message } {...register('job')} sx={{ marginTop: 1 }} label="အလုပ်အကိုင်" /> 
            <Typography sx={{ marginY: 1, fontSize: "14px" }} color={theme.palette.danger.main} variant='small'>Township, Division, Region ဟုမှန်ကန်သည့် စာလုံးပေါင်းအတိုင်း google မှရှာရေးပါ</Typography>
            <TextField error={!!errors.address} helperText={ errors?.address?.message } {...register('address')} sx={{ marginTop: 1 }} label="နေရပ်လိပ်စာ" />
            <Button type='submit' variant='contained' sx={{ marginY: 3, color: 'white' }}>Save</Button>
        </Box>
        <Box marginBottom={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button type='button' onClick={() => handleCancel()} variant='text' sx={{ color: "#000", marginRight: 3 }}>Cancel</Button>
          <Button disabled={!(members.length > 0)} type='button' onClick={() => handleGoToNext()} variant='text'>Save and Next</Button>
        </Box>
      </form>
    </CreateLayout>
  );
};

export default CreateCvStep8;
