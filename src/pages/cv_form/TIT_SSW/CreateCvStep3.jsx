import React, { useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import theme from "../../../utils/theme";
import { useNavigate } from "react-router-dom";
import CreateLayout from "../../../components/layouts/CreateLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setStep3Data } from "../../../slices/cvForm/TitsswSlice";

const step3Schema = Yup.object().shape({
  hobby: Yup.string().required("ဝါသနာ သို့မဟုတ် ကျွမ်းကျင့်သည့်အရာကိုဖြည့်ပါ"),
  strong_point: Yup.string().required("အားသာချက်ကိုဖြည့်ပါ"),
  weak_point: Yup.string().required("အားနည်းချက်ကိုရေးပါ"),
  dream: Yup.string().required("အနာဂါတ်အိပ်မက်ကိုဖြည့်ပါ"),
});

const CreateCvStep3 = () => {
  const step3Data = useSelector((state) => state.TitSswCv.step3Data);
  const step2Data = useSelector((state) => state.TitSswCv.step2Data);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(step3Schema),
  });

  const handleCancel = () => {
    navigate("/create-cv/tit-ssw/2");
  };

  const onSubmit = (data) => {
    dispatch(setStep3Data(data))
    navigate('/create-cv/tit-ssw/4');
  };

  useEffect(()=>{
    if(step3Data){
      setValue('hobby',step3Data.hobby)
      setValue('strong_point',step3Data.strong_point)
      setValue('weak_point',step3Data.weak_point)
      setValue('dream',step3Data.dream)
    }
  },[step3Data])

  useEffect(()=>{
    if(!step2Data) navigate(-1);
  },[step2Data])


  return (
    <CreateLayout title="ကိုယ်ရေးအကျဉ်းဖြည့်ပါ။" submTitle="Step.3">
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "350px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
            {...register("hobby")}
            error={!!errors?.hobby}
            helperText={errors?.hobby?.message}
            sx={{ marginBottom: 3 }}
            label="ဝါသနာ/ကျွမ်းကျင်သည့်အရာ"
          ></TextField>
          <TextField
            {...register("strong_point")}
            error={!!errors?.strong_point}
            helperText={errors?.strong_point?.message}
            sx={{ marginBottom: 3 }}
            label="အားသာချက်"
          ></TextField>
          <TextField
            {...register("weak_point")}
            error={!!errors?.weak_point}
            helperText={errors?.weak_point?.message}
            sx={{ marginBottom: 3 }}
            label="အားနည်းချက်"
          ></TextField>
          <Typography
            sx={{ marginBottom: 2, fontSize: "14px" }}
            color={theme.palette.danger.main}
            variant="small"
          >
            လုပ်ငန်းအမျိုးအစားနှင့်မတူလည်းဘဲ
            အင်တာဗျူးတွင်ကိုက်ညီအောင်ဖြေနိုင်လျှင် မိမိအိပ်မက်ကို
            အမှန်အတိုင်းရေးနိုင်သည်
          </Typography>
          <TextField
            {...register("dream")}
            error={!!errors?.dream}
            multiline
            label="အနာဂါတ်အိပ်မက်"
            maxRows={5}
          ></TextField>
        </Box>
        <Box
          marginY={3}
          sx={{ display: "flex", justifyContent: "right", width: "100%" }}
        >
          <Button
            type="button"
            onClick={() => handleCancel()}
            variant="text"
            sx={{ color: "#000", marginRight: 3 }}
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

export default CreateCvStep3;
