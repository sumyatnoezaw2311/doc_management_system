import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Button,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import theme from "../../../utils/theme";
import DatePicker from "../../../components/main/DatePicker";
import { useNavigate } from "react-router-dom";
import CreateLayout from "../../../components/layouts/CreateLayout";
// import { getAge } from "../../../utils/getAge";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { setStep1Data } from "../../../slices/cvForm/TitsswSlice";
import { useDispatch, useSelector } from "react-redux";
import BloodType from "../../../components/main/BloodType";



const step1Schema = Yup.object().shape({
  name_eng: Yup.string()
    .matches(/^[A-Z ]+$/, "အင်္ဂစာလုံးအကြီးဖြင့်ရေးရမည်")
    .required("အမည်ထည့်ပါ"),
  name_jp: Yup.string()
    .required("အမည်ထည့်ပါ"),
  date_of_birth: Yup.string().required("မွေးသက္ကရာဇ်ထည့်ပါ"),
  // age: Yup.number()
  //   .typeError("ထည့်သွင်းမှုမှားယွင်းနေပါသည်")
  //   .required("အသက်ထည့်ပါ"),
  hometown: Yup.string().required("မွေးရပ်ဇာတိထည့်ပါ"),
  height: Yup.number()
    .min(137, "အရပ်သည်အနည်းဆုံး 137cm ရှိရမည်")
    .typeError("ထည့်သွင်းမှုမှားယွင်းနေပါသည်")
    .required("အရပ်ဖြည့်ပါ"),
  weight: Yup.number()
    .min(36, "ကိုယ်အလေးချိန်အနည်းဆုံး36kgရှိရမည်")
    .max(99.9, "ကိုယ်အလေးချိန်အများဆုံး99.9kgရှိရမည်")
    .typeError("ထည့်သွင်းမှုမှားယွင်းနေပါသည်")
    .required("ကိုယ်အလေးချိန်ထည့်ပါ"),
  blood_type: Yup.string().required("သွေးအမျိုးအစားရွေးချယ်ပါ"),
  religion: Yup.string().required("ကိုးကွယ်သည့်ဘာသာထည့်ပါ"),
  eye_left: Yup.number()
    .typeError("ထည့်သွင်းမှုမှားယွင်းနေပါသည်")
    .min(1, "အနည်းဆုံး 1 ရှိရမည်")
    .max(2, "အများဆုံး2သာထည့်ရမည်")
    .required("မြင်နိုင်စွမ်းထည့်ပါ"),
  eye_right: Yup.number()
    .typeError("ထည့်သွင်းမှုမှားယွင်းနေပါသည်")
    .min(1, "အနည်းဆုံး 1 ရှိရမည်")
    .max(2, "အများဆုံး2သာထည့်ရမည်")
    .required("မြင်နိုင်စွမ်းထည့်ပါ"),
});

const CreateCvStep1 = () => {
  const step1Data = useSelector((state) => state.TitSswCv.step1Data);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  // const [age, setAge] = useState(null);
  const [ dob, setDob ] = useState(null);
  const [bloodType, setBloodType] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(step1Schema),
  });

  const handleCancel = () => {
    reset();
    setDob(null);
  };

  const onSubmit = async (data) => {
    await dispatch(setStep1Data(data));
    navigate("/create-cv/tit-ssw/2");
  };

  useEffect(() => {
    setValue("date_of_birth", dob);
    setValue("blood_type", bloodType);
  }, [dob, bloodType, setValue]);

  useEffect(()=>{
    if(step1Data){
      setDob(step1Data.date_of_birth)
      setValue('name_eng', step1Data.name_eng)
      setValue('name_jp',step1Data.name_jp)
      setValue('date_of_birth',step1Data.date_of_birth)
      setValue('hometown',step1Data.hometown)
      setValue('height', Number(step1Data.height))
      setValue('weight', Number(step1Data.weight))
      setValue('blood_type',step1Data.blood_type)
      setValue('religion',step1Data.religion)
      setValue('eye_left',step1Data.eye_left)
      setValue('eye_right',step1Data.eye_right)
      setBloodType(step1Data.blood_type)
    }
  },[step1Data])

  return (
    <CreateLayout title="ကိုယ်ရေးအကျဉ်းဖြည့်ပါ။" submTitle="Step.1">
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "350px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ mb: 1, fontSize: "14px" }}
            color={theme.palette.danger.main}
            variant="small"
          >
            အင်္ဂလိပ်စာလုံးအကြီးဖြင့်ပြည့်စုံစွာရေးပါ
          </Typography>
          <TextField
            error={!!errors.name_eng}
            // defaultValue={step1Data ? step1Data.name_eng : null}
            {...register("name_eng")}
            helperText={errors?.name_eng && errors.name_eng?.message}
            sx={{ mb: 3 }}
            type="text"
            id="name_eng"
            label="အမည်"
            placeholder="AUNG AUNG"
            autoComplete="off"
            variant="outlined"
          />
           <TextField
            error={!!errors.name_jp}
            {...register("name_jp")}
            helperText={errors?.name_jp && errors.name_jp?.message}
            sx={{ mb: 2 }}
            type="text"
            id="name_jp"
            label="Katakana Name"
            autoComplete="off"
            variant="outlined"
          />
          <Box sx={{ width: "100%" }}>
            <DatePicker
              dateVal={dob}
              placeholderText={"မွေးသက္ကရာဇ်"}
              setDate={setDob}
              errors={errors?.date_of_birth}
            />
          </Box>
          {/* <TextField
            disabled
            error={!!errors.age}
            helperText={errors?.age && errors.age?.message}
            value={age ? age : 0}
            type="number"
            sx={{ mb: 2, mt: 1 }}
            id="name_eng"
            label="အသက်"
            autoComplete="off"
            variant="outlined"
          /> */}
          <Typography
            sx={{ my: 1, fontSize: "14px" }}
            color={theme.palette.danger.main}
            variant="small"
          >
            Township, Division, Region ဟုမှန်ကန်သည့် စာလုံးပေါင်းအတိုင်း google
            မှရှာရေးပါ
          </Typography>
          <TextField
            error={!!errors.hometown}
            {...register("hometown")}
            helperText={errors?.hometown && errors.hometown?.message}
            type="text"
            sx={{ mb: 3 }}
            id="name_eng"
            label="မွေးရပ်ဇာတိ"
            placeholder="Khin Oo Township, Sagaing Division"
            autoComplete="off"
            variant="outlined"
          />
          <Box sx={{ display: "flex", alignItems: "start", gap: 1, mb: 3 }}>
            <TextField
              {...register("height")}
              error={!!errors.height}
              helperText={errors?.height && errors.height?.message}
              type="text"
              label="အရပ်"
              id="outlined-start-adornment"
              sx={{ width: "50%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">cm</InputAdornment>
                ),
              }}
              // inputProps={{ step: "0.1" }}
            />
            <TextField
              {...register("weight")}
              error={!!errors.weight}
              helperText={errors?.weight && errors.weight?.message}
              type="text"
              label="ကိုယ်အလေးချိန်"
              id="outlined-start-adornment"
              sx={{ width: "50%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">kg</InputAdornment>
                ),
              }}
              // inputProps={{ step: "0.1" }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "start", gap: 1, mb: 3 }}>
            <Box sx={{ width: '50%' }}>
              <BloodType val={bloodType} setVal={setBloodType} errors={errors} label={"သွေးအမျိုးအစား"}></BloodType>
            </Box>
            <TextField
              {...register("religion")}
              error={!!errors.religion}
              helperText={errors?.religion && errors.religion?.message}
              type="text"
              sx={{ width: "50%" }}
              id="name_eng"
              label="ကိုးကွယ်သည့်ဘာသာ"
              placeholder="ဗုဒ္ဓဘာသာ"
              autoComplete="off"
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "start", gap: 1 }}>
            <TextField
              {...register("eye_left")}
              error={!!errors.eye_left}
              helperText={errors?.eye_left && errors.eye_left?.message}
              type="number"
              label="မြင်နိုင်စွမ်း"
              id="outlined-start-adornment"
              sx={{ width: "50%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">ဘယ်</InputAdornment>
                ),
              }}
              inputProps={{ step: "0.1" }}
            />
            <TextField
              {...register("eye_right")}
              error={!!errors.eye_right}
              helperText={errors?.eye_right && errors.eye_right?.message}
              type="number"
              label="မြင်နိုင်စွမ်း"
              id="outlined-start-adornment"
              sx={{ width: "50%" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">ညာ</InputAdornment>
                ),
              }}
              inputProps={{ step: "0.1" }}
            />
          </Box>
        </Box>
        <Box
          my={3}
          sx={{ display: "flex", justifyContent: "right", width: "100%" }}
        >
          <Button
            onClick={() => handleCancel()}
            type="button"
            variant="text"
            sx={{ color: "#000", mr: 3 }}
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

export default CreateCvStep1;
