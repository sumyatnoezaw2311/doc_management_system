import React, { useEffect } from 'react';
import { TextField, Box, Button, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import theme from '../../../utils/theme';
import { useNavigate } from 'react-router-dom';
import CreateLayout from '../../../components/layouts/CreateLayout';
import DatePickerMY from '../../../components/main/DatePickerMY';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { setStep2Data } from '../../../slices/cvForm/SwSlice';
import { useDispatch, useSelector } from 'react-redux';

const step2Schema = Yup.object().shape({
  hs_name: Yup.string().required('အထက်တန်းကျောင်းနာမည်ထည့်ပါ'),
  hs_end: Yup.string().required('အထက်တန်းကျောင်းပြီးသည့်ခုနှစ်နှင့်လကိုထည့်ပါ'),
  uni_name: Yup.string().required('တက္ကသိုလ်အမည်ထည့်ပါ'),
  major: Yup.string().required('မေဂျာထည့်ပါ'),
  uni_start: Yup.string().required('တက္ကသိုလ်စတက်သည့်ခုနှစ်နှင့်လထည့်ပါ'),
  uni_end: Yup.string().required('တက္ကသိုလ်ပြီးသည့်ခုနှစ်နှင့်လထည့်ပါ'),
  last_attended_year: Yup.string(),
  is_graduated: Yup.number().oneOf([0,1]).required("ဘွဲ့ရ သို့မဟုတ် ကျောင်းနား ရွေးပါ")
});

const FormField = ({
  label,
  type,
  id,
  placeholder,
  autoComplete,
  control,
  error,
}) => (
  <Controller
    name={id}
    control={control}
    defaultValue=""
    render={({ field }) => (
      <TextField
        {...field}
        type={type}
        id={id}
        label={label}
        placeholder={placeholder}
        autoComplete={autoComplete}
        variant="outlined"
        sx={{ marginBottom: 2 }}
        fullWidth
        error={!!error}
        helperText={error?.message}
      />
    )}
  />
);

const SelectForm = ({ label, value, onChange, options, control, error }) => (
  <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      label={label}
      onChange={onChange}
      control = {control}
      error={!!error}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);


const CreateCvSw2 = () => {
  const dispatch = useDispatch()
  const step1Data = useSelector(state=> state.SwCv.step1Data )
  const step2Data = useSelector(state=> state.SwCv.step2Data )
  const [isGraduated, setIsGraduated] = React.useState(1);
  const [hsEnd, setHsEnd] = React.useState(step2Data?.hs_end || null);
  const [uniStart, setUniStart] = React.useState(step2Data?.uni_start || null);
  const [uniEnd, setUniEnd] = React.useState(step2Data?.uni_end || null);

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState,
    setValue
  } = useForm({
    resolver: yupResolver(step2Schema),
  });

  const handleCancel = () => {
    navigate('/create-cv/sw/1');
  };

  const onSubmit = async (data) => {
    const dataToPost = data.is_graduated === 0 ? {
      hs_name: data.hs_name,
      hs_end: data.hs_end,
      uni_name: data.uni_name,
      uni_start: data.uni_start,
      uni_end: data.uni_end,
      major: data.major,
      is_graduated: data.is_graduated,
      last_attended_year: data.last_attended_year
    } : {
      hs_name: data.hs_name,
      hs_end: data.hs_end,
      uni_name: data.uni_name,
      uni_start: data.uni_start,
      uni_end: data.uni_end,
      major: data.major,
      is_graduated: data.is_graduated
    }
    await dispatch(setStep2Data(dataToPost))
    navigate('/create-cv/sw/3');
  };

  const handleChange = (event) => {
    setIsGraduated(event.target.value);
    setValue('is_graduated', event.target.value)
  };

  useEffect(()=>{
    hsEnd && setValue('hs_end', hsEnd)
    uniStart && setValue('uni_start', uniStart)
    uniEnd && setValue('uni_end', uniEnd)
  },[hsEnd,uniStart,uniEnd])

  useEffect(()=>{
    if(isGraduated === 1){
      setValue('last_attended_year', "")
    }
  },[isGraduated])

  useEffect(()=>{
    setValue('is_graduated', isGraduated)
  },[])

  useEffect(()=>{
    if(step2Data){
      setValue('hs_name',step2Data.hs_name)
      setValue('hs_end', step2Data.hs_end)
      setValue('uni_name', step2Data.uni_name)
      setValue('uni_start', step2Data.uni_start)
      setValue('uni_end', step2Data.uni_end)
      setValue('major', step2Data.major)
      setValue('is_graduated', step2Data.is_graduated)
      setValue('last_attended_year', step2Data.last_attended_year)
      setIsGraduated(step2Data.is_graduated)
      setValue('last_attended_year', step2Data.last_attended_year || null )
    }
  },[step2Data])

  React.useEffect(() => {
    if(!step1Data) navigate(-1);
  }, [step1Data]);

  return (
    <CreateLayout title="အချက်အလတ်များကိုဖြည့်ပါ" submTitle="Step.2">
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <FormField
            type="text"
            id="hs_name"
            label="အထက်တန်းကျောင်းအမည်"
            placeholder={"B.E.H.S(Kone Gyi)"}
            control={control}
            error={formState.errors.hs_name}
          />
          <DatePickerMY dateVal={hsEnd} placeholderText={"အထက်တန်းပြီးသည့်ခုနှစ်နှင့်လ"} setDate={setHsEnd} error={formState.errors.hs_end ? formState.errors.hs_end : null}></DatePickerMY>
          <Box sx={{ mt: 1 }}>
            <FormField
              type="text"
              id="uni_name"
              label="တက္ကသိုလ်အမည်"
              placeholder={"Mandalay University"}
              control={control}
              error={formState.errors.uni_name}
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            <FormField
              type="text"
              id="major"
              label="Major"
              placeholder={"မေဂျာ"}
              control={control}
              error={formState.errors.major}
            />
          </Box>
          <SelectForm
            label="ဘွဲ့ရ သို့မဟုတ် ကျောင်းနား"
            value={isGraduated}
            onChange={handleChange}
            options={[
              { value: 1, label: 'ဘွဲ့ရ' },
              { value: 0, label: 'ကျောင်းနား' },
            ]}
          />
          {isGraduated === 0 &&
            <Box sx={{ mt: 1 }}>
              <FormField
                type="text"
                id="last_attended_year"
                label="နောက်ဆုံးတက်ရောက်ခဲ့သောနှစ်"
                placeholder={"2nd year"}
                control={control}
                error={formState.errors.last_attended_year}
              />
            </Box>
          }
          <DatePickerMY dateVal={uniStart} placeholderText={"တက္ကသိုလ်စတက်သည့်ခုနှစ်နှင့်လ"} setDate={setUniStart} error={formState.errors.uni_start ? formState.errors.uni_start : null} sx={{ my: 3 }} ></DatePickerMY>
          <DatePickerMY dateVal={uniEnd} placeholderText={"တက္ကသိုလ်ပြီးသည့်ခုနှစ်နှင့်လ"} setDate={setUniEnd} error={formState.errors.uni_end ? formState.errors.uni_end : null} sx={{ mb: 3 }} ></DatePickerMY>
        </Box>
        <Box marginY={3} sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
          <Button onClick={handleCancel} type="button" variant="text" sx={{ color: '#000', marginRight: 3 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ color: theme.palette.common.white }}>
            Save and Next
          </Button>
        </Box>
      </form>
    </CreateLayout>
  );
};

export default CreateCvSw2;
