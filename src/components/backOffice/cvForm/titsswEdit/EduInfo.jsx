import React, { useEffect, useState } from 'react';
import { Grid, TextField, Button, Stack, InputLabel, Box, MenuItem, Select, FormControl, FormControlLabel, Typography, Checkbox, RadioGroup, Radio, FormHelperText } from '@mui/material';
import { transform } from '../../../../utils/transformsrc';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import theme from '../../../../utils/theme';
import FormDatePicker from '../../../main/DatePicker';
import BloodType from '../../../main/BloodType';
import { CheckBox } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const personalSchema = Yup.object().shape({
    name_eng: Yup.string()
        .matches(/^[A-Z ]+$/, "အင်္ဂစာလုံးအကြီးဖြင့်ရေးရမည်")
        .required("အမည်ထည့်ပါ"),
    name_jp: Yup.string()
        .required("အမည်ထည့်ပါ"),
    phone: Yup.string().required('ဖုန်းနံပါတ်ဖြည့်ပါ')
        .matches(/^\d{9,11}$/, 'ဖုန်းနံပါတ်မှားယွင်းနေပါသည်'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    date_of_birth: Yup.string().required("မွေးသက္ကရာဇ်ထည့်ပါ"),
    gender: Yup.string().required("ကျား/မရွေးပါ"),
    hometown: Yup.string().required("မွေးရပ်ဇာတိထည့်ပါ"),
    height: Yup.number()
        .min(137, "အရပ်သည်အနည်းဆုံး 137cm ရှိရမည်")
        .typeError("ထည့်သွင်းမှုမှားယွင်းနေပါသည်")
        .required("အရပ်ဖြည့်ပါ"),
    weight: Yup.number()
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
    left_right_handed: Yup.string().required("ရွေးချယ်ပါ"),
    bicycle: Yup.string().required("ရွေးချယ်ပါ"),
    marriage_status: Yup.string().required("ရွေးချယ်ပါ"),
    group_live: Yup.string().required("ရွေးချယ်ပါ"),
    surgery: Yup.string().required("ရွေးချယ်ပါ"),
    betal: Yup.boolean(),
    cigrette: Yup.boolean(),
    tattoo: Yup.boolean(),
    alcohol: Yup.boolean(),
    hobby: Yup.string().required("ဝါသနာ သို့မဟုတ် ကျွမ်းကျင့်သည့်အရာကိုဖြည့်ပါ"),
    strong_point: Yup.string().required("အားသာချက်ကိုဖြည့်ပါ"),
    weak_point: Yup.string().required("အားနည်းချက်ကိုရေးပါ"),
    dream: Yup.string().required("အနာဂါတ်အိပ်မက်ကိုဖြည့်ပါ"),
    pr: Yup.string().required('PR ဖြည့်ပါ'),
});

const EduInfo = ({ cv }) => {
    const toEditData = useSelector((state)=> state.CvForm.toEditCv)
    const [photo, setPhoto] = useState(null);
    const [qrPhoto, setQrPhoto] = useState(null);
    const [dob, setDob] = useState(null);
    const [ bloodType,setBloodType ] = useState(toEditData?.blood_type || "A")
    const [ handed,setHanded ] = useState(toEditData?.left_right_handed || "ဘယ်");
    const [ gender,setGender ] = useState(toEditData?.gender || "ကျား")
    const [ bicycle,setBicycle ] = useState( toEditData?.bicycle ||'')
    const [ marriageStatus, setMarriageStatus ] = useState(toEditData?.marriage_status || '')
    const [ groupLive, setGroupLive ] = useState(toEditData?.group_live || '')

  
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
    reset,
  } = useForm({
    resolver: yupResolver(personalSchema),
  });

  const getBase64 = async (type, url) => {
    try {
      const result = await transform(url);
      type === 'p' ? setPhoto(result) : setQrPhoto(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getImgData = async () => {
    await getBase64('p', cv.photo);
    await getBase64('qr', cv.qr_photo);
  };

  const handleUpdate = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (cv) {
      getImgData();
    }
  }, [cv]);

  useEffect(()=>{
    if(toEditData){
        setDob(toEditData.date_of_birth)
        setValue('name_eng', toEditData.name_eng)
        setValue('name_jp',toEditData.name_jp)
        setValue('phone', toEditData.phone)
        setValue('email', toEditData.email)
        setValue('date_of_birth',toEditData.date_of_birth)
        setValue('hometown',toEditData.hometown)
        setValue('height',toEditData.height)
        setValue('weight',toEditData.weight)
        setValue('blood_type',toEditData.blood_type)
        setValue('religion',toEditData.religion)
        setValue('eye_left',toEditData.eye_left)
        setValue('eye_right',toEditData.eye_right)
        setBloodType(toEditData.blood_type)
        setValue('left_right_handed', toEditData.left_right_handed);
        setValue('gender', toEditData.gender);
        setValue('bicycle', toEditData.bicycle);
        setValue('marriage_status', toEditData.marriage_status);
        setValue('group_live', toEditData.group_live);
        setValue('surgery', toEditData.surgery);
        setValue('betal', toEditData.betal);
        setValue('alcohol', toEditData.alcohol);
        setValue('cigrette', toEditData.cigrette);
        setValue('tattoo', toEditData.tattoo);
        setValue('hobby', toEditData.hobby)
        setValue('strong_point', toEditData.strong_point)
        setValue('weak_point', toEditData.weak_point)
        setValue('dream', toEditData.dream)
        setValue('pr', toEditData.pr)
        
        setCheckedValues({
            betal: toEditData.betal || false,
            cigrette: toEditData.cigrette || false,
            alcohol: toEditData.alcohol || false,
            tattoo: toEditData.tattoo || false,
        });
    }
  },[toEditData])

  useEffect(()=>{
    setValue('blood_type', bloodType)
  },[bloodType])

  useEffect(()=>{
    setValue('date_of_birth', dob)
  },[dob])

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
        <Stack direction="row" spacing={2} sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end'}}>
            <Button type="button" size="large" onClick={() => reset()} variant="text">
            Cancel
            </Button>
            <Button type="submit" size="large" variant="contained" sx={{ color: theme.palette.common.white }}>
            Update
            </Button>
        </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="name_eng" sx={{ mb: 1 }}>Name (English) </InputLabel>
            <TextField
                error={!!errors?.name_eng}
                helperText={errors?.name_eng?.message}
                {...register('name_eng')}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="name_jp" sx={{ mb: 1 }}>Name (Japanese) </InputLabel>
            <TextField
                error={!!errors?.name_jp}
                helperText={errors?.name_jp?.message}
                {...register('name_jp')}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="phone" sx={{ mb: 1 }}>Phone</InputLabel>
            <TextField
                error={!!errors?.phone}
                helperText={errors?.phone?.message}
                {...register('phone')}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="email" sx={{ mb: 1 }}>Email</InputLabel>
            <TextField
                error={!!errors?.email}
                helperText={errors?.email?.message}
                {...register('email')}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="date_of_birth" sx={{ mb: 1 }}>Date Of Birth</InputLabel>
            <FormDatePicker dateVal={dob} placeholderText="" setDate={setDob} errors={errors} />
        </Grid>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="hometown" sx={{ mb: 1 }}>Hometown</InputLabel>
            <TextField
                error={!!errors?.hometown}
                helperText={errors?.hometown?.message}
                {...register('hometown')}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex' }} gap={2}>
            <Box sx={{ width: '50%' }}>
                <InputLabel htmlFor="height" sx={{ mb: 1 }}>Height(cm)</InputLabel>
                <TextField
                    error={!!errors?.height}
                    helperText={errors?.height?.message}
                    {...register('height')}
                    fullWidth
                />
            </Box>
            <Box sx={{ width: '50%' }}>
                <InputLabel htmlFor="weight" sx={{ mb: 1 }}>Weight(kg)</InputLabel>
                <TextField
                    error={!!errors?.weight}
                    helperText={errors?.weight?.message}
                    {...register('weight')}
                    fullWidth
                />
            </Box>
        </Grid>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="blood_type" sx={{ mb: 1 }}>Blood Type</InputLabel>
            <BloodType val={bloodType} setVal={setBloodType} label={""} errors={errors}></BloodType>
        </Grid>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="religion" sx={{ mb: 1 }}>Religion</InputLabel>
            <TextField
                error={!!errors?.religion}
                helperText={errors?.religion?.message}
                {...register('religion')}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} md={4} gap={2} sx={{ display: 'flex' }}>
            <Box sx={{ width: '50%' }}>
                <InputLabel htmlFor="eye_left" sx={{ mb: 1 }}>Visibility(Left)</InputLabel>
                <TextField
                    error={!!errors?.eye_left}
                    helperText={errors?.eye_left?.message}
                    {...register('eye_left')}
                    fullWidth
                />
            </Box>
            <Box sx={{ width: '50%' }}>
                <InputLabel htmlFor="eye_right" sx={{ mb: 1 }}>Visibility(Right)</InputLabel>
                <TextField
                    error={!!errors?.eye_right}
                    helperText={errors?.eye_right?.message}
                    {...register('eye_right')}
                    fullWidth
                />
            </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex' }} gap={2}>
            <Box sx={{ width: '50%'}}>
                <InputLabel htmlFor="left_right_handed" sx={{ mb: 1 }}>Left / Right Handed</InputLabel>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={handed}
                        onChange={(e)=>{
                          setHanded(e.target.value)
                          setValue('left_right_handed', e.target.value)
                        }}
                    >
                        <MenuItem value={"ဘယ်"}>左</MenuItem>
                        <MenuItem value={"ညာ"}>右</MenuItem>
                </Select>
                </FormControl>
            </Box>
            <Box sx={{ width: '50%'}}>
                <InputLabel htmlFor="gender" sx={{ mb: 1 }}>Gender</InputLabel>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        onChange={(e)=> {
                          setGender(e.target.value)
                          setValue('gender', e.target.value)
                        }}
                    >
                        <MenuItem value={"ကျား"}>男</MenuItem>
                        <MenuItem value={"မ"}>女性</MenuItem>
                </Select>
                </FormControl>
            </Box>
        </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', }}>
                <InputLabel htmlFor="" sx={{ pb: 3 }}>ကြိုက်နှစ်သက်သောအရာ</InputLabel>
                <Box
                    sx={{
                    display: "flex",
                    alignItems: "end",
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
            </Grid>
        <Grid item xs={12} md={4}>
            <FormControl fullWidth>
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
        </Grid>
        <Grid item xs={12} md={4}>
            <FormControl fullWidth>
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
                  label={<Typography>無</Typography>}
                />
              </RadioGroup>
            </Box>
              {errors?.marriage_status && (
                <FormHelperText sx={{ color: theme.palette.danger.main }}>
                  {errors.marriage_status.message}
                </FormHelperText>
              )}
            </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
            <FormControl fullWidth>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>
                အများနှင့်စုပေါင်းနေထိုင်ခြင်း
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
                  label={<Typography sx={{ marginRight: 5 }}>ရှိ</Typography>}
                />
                <FormControlLabel
                  value={"မရှိ"}
                  control={<Radio sx={errors?.group_live && {color: 'red'}} />}
                  label={<Typography>無</Typography>}
                />
              </RadioGroup>
            </Box>
              {errors?.group_live && (
                <FormHelperText sx={{ color: theme.palette.danger.main }}>
                  {errors.group_live.message}
                </FormHelperText>
              )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="hobby" sx={{ mb: 1 }}>Hobby</InputLabel>
            <TextField
                error={!!errors?.hobby}
                helperText={errors?.hobby?.message}
                {...register('hobby')}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="strong_point" sx={{ mb: 1 }}>Strong Point</InputLabel>
            <TextField
                error={!!errors?.strong_point}
                helperText={errors?.strong_point?.message}
                {...register('strong_point')}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="weak_point" sx={{ mb: 1 }}>Weak Point</InputLabel>
            <TextField
                error={!!errors?.weak_point}
                helperText={errors?.weak_point?.message}
                {...register('weak_point')}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="dream" sx={{ mb: 1 }}>Dream</InputLabel>
            <TextField
                error={!!errors?.dream}
                helperText={errors?.dream?.message}
                {...register('dream')}
                fullWidth
            />
        </Grid>
        <Grid item xs={12} md={4}>
            <InputLabel htmlFor="pr" sx={{ mb: 1 }}>Pr</InputLabel>
            <TextField
                error={!!errors?.pr}
                helperText={errors?.pr?.message}
                {...register('pr')}
                fullWidth
                multiline
            />
        </Grid>
      </Grid>
    </form>
  );
};

export default EduInfo;

