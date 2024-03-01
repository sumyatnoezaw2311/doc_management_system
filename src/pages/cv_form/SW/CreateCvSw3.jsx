import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as React from 'react';
import { Box, Button, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateLayout from '../../../components/layouts/CreateLayout'
import { nanoid } from '@reduxjs/toolkit';
import DatePickerMY from '../../../components/main/DatePickerMY';
import SkillList from '../../../components/sw/SkillList';
import { setStep3Data } from '../../../slices/cvForm/SwSlice';
import { useDispatch, useSelector } from 'react-redux';


const edOtherSchema = Yup.object().shape({
  name: Yup.string().required("Please fill the title of your skill"),
  year_month: Yup.string().required("Select the date you started working."),
})

const CreateCvSw3 = () => {
  const step2Data = useSelector(state=> state.SwCv.step2Data)
  const step3Data = useSelector(state=> state.SwCv.step3Data)
  const navigate = useNavigate();
  const disptach = useDispatch()
  const [ workDate,setWorkDate ] = React.useState(null)
  const [ skills,setSkills ] = React.useState([])

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(edOtherSchema)
  })

  const handleCancel = () => {
    navigate('/create-cv/sw/2');
  };

  const handleFormSubmit = (data) => {
    setSkills([...skills, { id: nanoid(), ...data }]);
    reset()
    setWorkDate(null)
  };
  
  const handleGoToNext = async ()=>{
    await disptach(setStep3Data(skills))
    navigate('/create-cv/sw/4');
  }

  React.useEffect(()=>{
    if(workDate) setValue('year_month', workDate)
  },[workDate])

  React.useEffect(()=>{
    if(step3Data){
      setSkills(step3Data)
    }
  },[step3Data])

  React.useEffect(() => {
    if(!step2Data) navigate(-1);
  }, [step2Data]);



  return (
    <CreateLayout title="Please fill your skills" submTitle="Step.3">
      <form autoComplete='off' onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ width: "350px", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Divider sx={{ my: 1 }}>Skills</Divider>
            <SkillList listItems={skills} getListItems={setSkills}/>
            <Divider sx={{ my: 1 }}>Add New</Divider>
            <TextField error={!!errors.name} helperText={ errors?.name?.message } {...register('name')} sx={{ my: 2 }} label="Skill Title" />
            <DatePickerMY dateVal={workDate} placeholderText={"စလုပ်သည့်ခုနှစ်နှင့်လ"} setDate={setWorkDate} error={errors?.year_month}></DatePickerMY>
            <Button type='submit' variant='contained' sx={{ my: 3, color: 'white' }}>Add</Button>
        </Box>
        <Box marginBottom={2} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button type='button' onClick={() => handleCancel()} variant='text' sx={{ color: "#000", mr: 3 }}>Cancel</Button>
          <Button onClick={()=>{ handleGoToNext() }} disabled={!(skills.length > 0)} type='button' variant='text'>Save and Next</Button>
        </Box>
      </form>
    </CreateLayout>
  );
};

export default CreateCvSw3;
