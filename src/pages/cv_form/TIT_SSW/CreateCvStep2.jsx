import React, { useState,useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Checkbox,
  TextField,
  FormHelperText,
} from "@mui/material";
import theme from "../../../utils/theme";
import { useNavigate } from "react-router-dom";
import CreateLayout from "../../../components/layouts/CreateLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { setStep2Data } from "../../../slices/cvForm/TitsswSlice";
import { useDispatch,useSelector } from "react-redux";

const step2Schema = Yup.object().shape({
  japanese_level: Yup.string().required("ဂျပန်စာlevelထည့်ပါ"),
  left_right_handed: Yup.string().required("ရွေးချယ်ပါ"),
  gender: Yup.string().required("ရွေးချယ်ပါ"),
  bicycle: Yup.string().required("ရွေးချယ်ပါ"),
  marriage_status: Yup.string().required("ရွေးချယ်ပါ"),
  group_live: Yup.string().required("ရွေးချယ်ပါ"),
  surgery: Yup.string().required("ရွေးချယ်ပါ"),
  betal: Yup.boolean(),
  cigrette: Yup.boolean(),
  tattoo: Yup.boolean(),
  alcohol: Yup.boolean(),
});

const CreateCvStep2 = () => {
  const step2Data = useSelector((state) => state.TitSswCv.step2Data);
  const step1Data = useSelector((state) => state.TitSswCv.step1Data);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [handed, setHanded] = useState(step2Data?.left_right_handed || '');
  const [ gender, setGender ] = useState(step2Data?.gender || '')
  const [ bicycle,setBicycle ] = useState(step2Data?.bicycle || '')
  const [ marriageStatus, setMarriageStatus ] = useState(step2Data?.marriage_status || '')
  const [ groupLive, setGroupLive ] = useState(step2Data?.group_live || '')
  const [ surgery,setSurgery ] = useState(step2Data?.surgery || '')

  const [checkedValues, setCheckedValues] = useState({
    betal: false,
    cigrette: false,
    alcohol: false,
    tattoo: false,
  });

  const handleChecks = (event) => {
    const { name, checked } = event.target;
    setCheckedValues({ ...checkedValues, [name]: checked });
    setValue(`${name}`,checked)
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    // reset,
  } = useForm({
    resolver: yupResolver(step2Schema),
  });

  const handleCancel = () => {
    navigate("/create-cv/tit-ssw/1");
  };

  const onSubmit = async (data) => {
    await dispatch(setStep2Data(data))
    navigate("/create-cv/tit-ssw/3");
  };

  useEffect(()=>{
    if(step2Data){
      setValue('japanese_level', step2Data.japanese_level);
      setValue('left_right_handed', step2Data.left_right_handed);
      setValue('gender', step2Data.gender);
      setValue('bicycle', step2Data.bicycle);
      setValue('marriage_status', step2Data.marriage_status);
      setValue('group_live', step2Data.group_live);
      setValue('surgery', step2Data.surgery);
      setValue('betal', step2Data.betal);
      setValue('alcohol', step2Data.alcohol);
      setValue('cigrette', step2Data.cigrette);
      setValue('tattoo', step2Data.tattoo);
      
      setCheckedValues({
        betal: step2Data.betal || false,
        cigrette: step2Data.cigrette || false,
        alcohol: step2Data.alcohol || false,
        tattoo: step2Data.tattoo || false,
      });
    }
  },[step2Data])

  useEffect(()=>{
    if(!step1Data) navigate(-1);
  },[step1Data])

  return (
    <CreateLayout title="ကိုယ်ရေးအကျဉ်းဖြည့်ပါ။" submTitle="Step.2">
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
            sx={{ marginBottom: 2, fontSize: "14px" }}
            color={theme.palette.danger.main}
            variant="small"
          >
            JLPT/JFT/JTEST/NAT TEST ဖြေထားသည့်စာမေးပွဲအမည်+levelကိုရေးပါ
          </Typography>
          <TextField
            {...register("japanese_level")}
            error={!!errors?.japanese_level}
            helperText={errors?.japanese_level?.message}
            placeholder="N5 အောင် N4 ဆက်ဖြေမည်"
            autoComplete="off"
            type="text"
            sx={{ marginBottom: 3 }}
            id="name"
            label="ဂျပန်စာ level"
            variant="outlined"
          />
          <Box sx={{ marginBottom: 2 }}>
            <FormControl
            >
              <RadioGroup
                value={handed}
                onChange={(e) =>{
                  setValue("left_right_handed", e.target.value)
                  setHanded(e.target.value)
                }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="ဘယ်"
                  control={<Radio sx={ errors?.left_right_handed && {color: 'red'} } />}
                  label={<Typography>ဘယ်သန်</Typography>}
                />
                <FormControlLabel
                  sx={{ marginLeft: "25px" }}
                  value="ညာ"
                  control={<Radio sx={ errors?.left_right_handed && {color: 'red'} } />}
                  label={<Typography>ညာသန်</Typography>}
                />
              </RadioGroup>
              {errors?.left_right_handed && (
                <FormHelperText sx={{ color: theme.palette.danger.main }}>
                  {errors.left_right_handed.message}
                </FormHelperText>
              )}
            </FormControl>
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
                  control={<Radio sx={ errors?.gender && {color: 'red'} } />}
                  label={<Typography>ကျား</Typography>}
                />
                <FormControlLabel
                  sx={{ ml: 7 }}
                  value="မ"
                  control={<Radio sx={ errors?.gender && {color: 'red'} } />}
                  label={<Typography>မ</Typography>}
                />
              </RadioGroup>
              {errors?.gender && (
                <FormHelperText sx={{ color: theme.palette.danger.main }}>
                  {errors.gender.message}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <FormControl sx={{ marginBottom: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>စက်ဘီး</Typography>
              <RadioGroup
                onChange={(e) => {
                  setValue("bicycle", e.target.value)
                  setBicycle(e.target.value)
                }}
                value={bicycle}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={"စီးတတ်"}
                  control={<Radio sx={ errors?.bicycle && {color: 'red'} } />}
                  label={
                    <Typography>စီးတတ်</Typography>
                  }
                />
                <FormControlLabel
                  value={"မစီးတတ်"}
                  control={<Radio sx={ errors?.bicycle && {color: 'red'} } />}
                  label={<Typography>မစီးတတ်</Typography>}
                />
              </RadioGroup>
            </Box>
            {errors?.bicycle && (
                <FormHelperText sx={{ color: theme.palette.danger.main }}>
                  {errors?.bicycle.message}
                </FormHelperText>
            )}
          </FormControl>
          <FormControl sx={{ marginBottom: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>အိမ်ထောင်</Typography>
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
                  value={"ရှိ"}
                  control={<Radio sx={errors?.marriage_status && {color: 'red'}} />}
                  label={<Typography sx={{ mr: 10 }}>ရှိ</Typography>}
                />
                <FormControlLabel
                  value={"မရှိ"}
                  control={<Radio sx={errors?.marriage_status && {color: 'red'}} />}
                  label={<Typography>မရှိ</Typography>}
                />
              </RadioGroup>
            </Box>
              {errors?.marriage_status && (
                <FormHelperText sx={{ color: theme.palette.danger.main }}>
                  {errors.marriage_status.message}
                </FormHelperText>
              )}
          </FormControl>
          <FormControl sx={{ marginBottom: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>
                အများနှင့် <br></br>စုပေါင်းနေထိုင်ခြင်း
              </Typography>
              <RadioGroup
                value={groupLive}
                onChange={(e) => {
                  setValue("group_live", e.target.value)
                  setGroupLive(e.target.value)
                }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={"ရှိ"}
                  control={<Radio sx={errors?.group_live && {color: 'red'}} />}
                  label={<Typography sx={{ marginRight: 10 }}>ရှိ</Typography>}
                />
                <FormControlLabel
                  value={"မရှိ"}
                  control={<Radio sx={errors?.group_live && {color: 'red'}} />}
                  label={<Typography>မရှိ</Typography>}
                />
              </RadioGroup>
            </Box>
              {errors?.group_live && (
                <FormHelperText sx={{ color: theme.palette.danger.main }}>
                  {errors.group_live.message}
                </FormHelperText>
              )}
          </FormControl>
          <FormControl sx={{ marginBottom: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>ခွဲစိတ်ထားခြင်း</Typography>
              <RadioGroup
                value={surgery}
                onChange={(e) => {
                  setValue("surgery", e.target.value)
                  setSurgery(e.target.value)
                }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={"ရှိ"}
                  control={<Radio sx={errors?.surgery && {color: 'red'}} />}
                  label={<Typography sx={{ marginRight: 10 }}>ရှိ</Typography>}
                />
                <FormControlLabel
                  value={"မရှိ"}
                  control={<Radio sx={errors?.surgery && {color: 'red'}} />}
                  label={<Typography>မရှိ</Typography>}
                />
              </RadioGroup>
            </Box>
              {errors?.surgery && (
                <FormHelperText sx={{ color: theme.palette.danger.main }}>
                  {errors.surgery.message}
                </FormHelperText>
              )}
          </FormControl>
          <Typography>ကြိုက်နှစ်သက်သောအရာ</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  {...register('betal')}
                  name="betal"
                  checked={checkedValues.betal}
                  onChange={handleChecks}
                />
              }
              label={
                <Typography variant="p" sx={{ fontSize: "15px" }}>
                  ကွမ်း
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...register('cigrette')}
                  name="cigrette"
                  checked={checkedValues.cigrette}
                  onChange={handleChecks}
                />
              }
              label={
                <Typography variant="p" sx={{ fontSize: "15px" }}>
                  ဆေးလိပ်
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...register('alcohol')}
                  name="alcohol"
                  checked={checkedValues.alcohol}
                  onChange={handleChecks}
                />
              }
              label={
                <Typography variant="p" sx={{ fontSize: "15px" }}>
                  အရက်
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  {...register('tattoo')}
                  name="tattoo"
                  checked={checkedValues.tattoo}
                  onChange={handleChecks}
                />
              }
              label={
                <Typography
                  variant="p"
                  sx={{ fontSize: "15px", whiteSpace: "nowrap" }}
                >
                  တက်တူး
                </Typography>
              }
            />
          </Box>
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

export default CreateCvStep2;
