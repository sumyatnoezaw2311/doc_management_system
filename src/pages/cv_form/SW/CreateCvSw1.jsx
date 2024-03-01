import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  TextField,
  Box,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormHelperText
} from "@mui/material";
import theme from "../../../utils/theme";
import CreateLayout from "../../../components/layouts/CreateLayout";
import DatePicker from '../../../components/main/DatePicker'
import { setStep1Data } from "../../../slices/cvForm/SwSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name_eng: Yup.string()
  .matches(/^[A-Z ]+$/, "အင်္ဂစာလုံးအကြီးဖြင့်ရေးရမည်")
  .required("Please enter your name"),
  name_jp: Yup.string().required("Katakana name is required"),
  date_of_birth: Yup.string().required("Date of birth is required"),
  address_eng: Yup.string().required("Address in English is required"),
  address_jp: Yup.string().required("Address in Japanese is required"),
  family_address: Yup.string().required("Family Address is required"),
  family_phone: Yup.string()
    .required("Family phone number is required")
    .matches(/^\d{9,11}$/, "Invalid phone number"),
  dependent_family: Yup.number().positive("Please fill valid number").typeError("Please fill valid number").required("Dependent family is required"),
  gender: Yup.string().required("Please choose gender"),
  marriage_status: Yup.string().required("Please choose marriage status")
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
        sx={{ marginBottom: 3, width: '100%' }}
        error={!!error}
        helperText={error?.message}
      />
    )}
  />
);


const CreateCvSw1 = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const step1Data = useSelector(state=> state.SwCv.step1Data)
  const [dob, setDob] = useState(null);
  const [ gender, setGender ] = useState(null)
  const [ marriageStatus, setMarriageStatus ] = useState(null)
  const { handleSubmit, control, formState, reset, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCancel = ()=>{
    reset()
    setDob(null)
    setGender(null)
    setMarriageStatus(null)
  }

  const onSubmit = async (data) => {
    await dispatch(setStep1Data(data));
    navigate('/create-cv/sw/2')
  };

  useEffect(()=>{
    dob && setValue('date_of_birth', dob)
  },[dob])

  useEffect(()=>{
    if(step1Data){
      setValue('name_eng', step1Data.name_eng)
      setValue('name_jp', step1Data.name_jp)
      setValue('date_of_birth', step1Data.date_of_birth)
      setValue('gender', step1Data.gender)
      setValue('marriage_status', step1Data.marriage_status)
      setValue('address_eng', step1Data.address_eng)
      setValue('address_jp', step1Data.address_jp)
      setValue('family_address', step1Data.family_address)
      setValue('family_phone', step1Data.family_phone)
      setValue('dependent_family', step1Data.dependent_family)
      setDob(step1Data.date_of_birth)
      setGender(step1Data.gender)
      setMarriageStatus(step1Data.marriage_status)
    }
  },[])

  return (
    <CreateLayout title="အချက်အလတ်များကိုဖြည့်ပါ" submTitle="Step.1">
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "350px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <FormField
            type="text"
            id="name_eng"
            label="အမည် (English)"
            control={control}
            error={formState.errors.name_eng}
          />
          <FormField
            type="text"
            id="name_jp"
            label="အမည် (Japanese)"
            control={control}
            error={formState.errors.name_jp}
          />
          <DatePicker
              dateVal={dob}
              placeholderText={"မွေးသက္ကရာဇ်"}
              setDate={setDob}
              control={control}
              errors={formState.errors.date_of_birth}
          />
          <Box sx={{ mt: 3 }}>
            <FormField
              type="text"
              id="address_eng"
              label="မွေးရပ်ဇာတိ(English)"
              control={control}
              error={formState.errors.address_eng}
            />
          </Box>
          <FormField
            type="text"
            id="address_jp"
            label="မွေးရပ်ဇာတိ(Japanese)"
            control={control}
            error={formState.errors.address_jp}
          />
          <FormField
            type="text"
            id="family_address"
            label="မိသားစုနေရပ်လိပ်စာ"
            control={control}
            error={formState.errors.family_address}
          />
          <FormField
            type="text"
            id="family_phone"
            label="မိသားစုဖုန်းနံပါတ်"
            control={control}
            error={formState.errors.family_phone}
          />
          <FormField
            type="text"
            id="dependent_family"
            label="မှီခိုနေသည့်မိသားစုဝင်ဦးရေ"
            control={control}
            error={formState.errors.dependent_family}
          />
        <Typography>ကျား/မ</Typography>
        <FormControl>
          <RadioGroup
            value={gender}
            onChange={(e) => {
              setValue("gender", e.target.value)
              setGender(e.target.value)
            }}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="ကျား"
              control={<Radio sx={ formState.errors.gender && {color: 'red'} } />}
              label={<Typography>ကျား</Typography>}
            />
            <FormControlLabel
              sx={{ ml: 7 }}
              value="မ"
              control={<Radio sx={ formState.errors.gender && {color: 'red'} } />}
              label={<Typography>မ</Typography>}
            />
          </RadioGroup>
          {formState.errors.gender && (
            <FormHelperText sx={{ color: theme.palette.danger.main }}>
              {formState.errors.gender.message}
            </FormHelperText>
          )}
        </FormControl>
        <Typography sx={{ mt: 2 }}>အိမ်ထောင်</Typography>
        <FormControl>
          <RadioGroup
            value={marriageStatus}
            onChange={(e) => {
              setValue("marriage_status", e.target.value)
              setMarriageStatus(e.target.value)
            }}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="ရှိ"
              control={<Radio sx={ formState.errors.marriage_status && {color: 'red'} } />}
              label={<Typography>ရှိ</Typography>}
            />
            <FormControlLabel
              sx={{ ml: 7 }}
              value="မရှိ"
              control={<Radio sx={ formState.errors.marriage_status && {color: 'red'} } />}
              label={<Typography>မရှိ</Typography>}
            />
          </RadioGroup>
          { formState.errors.marriage_status && (
            <FormHelperText sx={{ color: theme.palette.danger.main }}>
              { formState.errors.marriage_status.message }
            </FormHelperText>
          )}
        </FormControl>
        </Box>
        <Box
          marginY={3}
          sx={{ display: "flex", justifyContent: "right", width: "100%" }}
        >
          <Button
            type="button"
            variant="text"
            sx={{ color: "#000", marginRight: 3 }}
            onClick={()=> handleCancel() }
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ color: theme.palette.common.white }}
          >
            Save and Next
          </Button>
        </Box>
      </form>
    </CreateLayout>
  );
};

export default CreateCvSw1;
