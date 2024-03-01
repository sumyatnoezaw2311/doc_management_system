import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, FormHelperText, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CollectionsIcon from '@mui/icons-material/Collections';
import CreateLayout from '../../../components/layouts/CreateLayout';
import { setStep9Data } from '../../../slices/cvForm/TitsswSlice';
import { setStep5Data, getAllSwData } from '../../../slices/cvForm/SwSlice';
import { getAllData } from '../../../slices/cvForm/TitsswSlice';
import { getProfile } from '../../../slices/auth/authSlice';

const finalSchema = Yup.object().shape({
  pr: Yup.string().required('PR ဖြည့်ပါ'),
  photo_data: Yup.string().required('Passport ပုံထည့်ပါ'),
  qr_photo_data: Yup.string().required('Telegram QR ထည့်ပါ'),
});

const FieldUpload = ({ label, accept, onChange, error, helperText }) => (
  <Box
    sx={{
      width: '100%',
      height: '200px',
      border: '1px dotted #666666',
      borderRadius: 1,
      marginY: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CollectionsIcon sx={{ color: '#666666' }} />
    <Button component="label" variant="text" sx={{ marginY: 1 }}>
      {label ? label : `Upload ${helperText}`}
      <input type="file" accept={accept} onChange={onChange} style={{ display: 'none' }} />
    </Button>
    <Typography sx={{ marginBottom: 1, fontSize: '14px' }} color={'#666666'} variant="small">
      {helperText}
    </Typography>
    <FormHelperText error={!!error}>{error?.message}</FormHelperText>
  </Box>
);

const CreateCvStep9 = () => {
  const profileData = useSelector((state) => state.User?.profile?.data);
  const step9Data = useSelector((state) => state.TitSswCv.step9Data);
  const step8Data = useSelector((state) => state.TitSswCv.step8Data);
  const step5Data = useSelector((state) => state.SwCv.step5Data);
  const [photoLabel, setPhotoLabel] = useState(null);
  const [qrLabel, setQrLabel] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate();
  const reader = new FileReader();

  const { handleSubmit, register, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(finalSchema),
  });

  const handleCancel = () => {
    profileData.is_engineer === '1' ? navigate('/create-cv/sw/4') : navigate('/create-cv/tit-ssw/8')
  };

  const handleUpload = (e, key, labelState) => {
    const file = e.target.files[0];
    convertToBase64String(file, key, labelState);
  };

  const convertToBase64String = (file, key, labelState) => {
    if (!file) return;
    labelState(file?.name);
    reader.onloadend = () => {
      const base64String = reader.result;
      setValue(key, base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (data) => {
    if(!profileData) return
    const setDataAction = profileData && profileData.is_engineer === 1 ? setStep5Data : setStep9Data;
    await dispatch(setDataAction({ ...data, ...{ photo_label: photoLabel, qr_label: qrLabel } }));
    await dispatch(profileData && profileData.is_engineer === 1 ? getAllSwData() : getAllData());
    setPhotoLabel(null);
    setQrLabel(null);
    navigate(profileData && profileData.is_engineer === 1 ? '/create-cv/sw/confirmation' : '/create-cv/tit-ssw/confirmation');
  };

  useEffect(() => {
    if(step5Data || step9Data) {
      setValue('pr', step5Data?.pr || step9Data?.pr);
      setValue('photo_data', step5Data?.photo_data || step9Data?.photo_data);
      setValue('qr_photo_data', step5Data?.qr_photo_data || step9Data?.qr_photo_data);
      setPhotoLabel(step5Data?.photo_label || step9Data?.photo_label);
      setQrLabel(step5Data?.qr_label || step9Data?.qr_label);
    }
  }, [step9Data, step5Data]);

  React.useEffect(() => {
    if(!step8Data && path.includes('/tit-ssw')) navigate(-1);
  }, [step8Data]);

  useEffect(()=>{
    dispatch(getProfile())
  },[])

  return (
    <CreateLayout title="" submTitle="Step.9">
      <form autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ width: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <TextField error={!!errors?.pr} helperText={errors?.pr?.message || ''} {...register('pr')} label="PR" multiline />
          <FieldUpload
            label={photoLabel}
            accept="image/*"
            onChange={(e) => handleUpload(e, 'photo_data', setPhotoLabel)}
            error={errors?.photo_data}
            helperText="3*4 cm ဖြစ်ရမည်"
          />
          <FieldUpload
            label={qrLabel}
            accept="image/*"
            onChange={(e) => handleUpload(e, 'qr_photo_data', setQrLabel)}
            error={errors?.qr_photo_data}
            helperText="PNG, JPG"
          />
        </Box>
        <Box marginY={3} sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
          <Button onClick={handleCancel} type="button" variant="text" sx={{ color: '#000', marginRight: 3 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ color: 'white' }}>
            Save and Next
          </Button>
        </Box>
      </form>
    </CreateLayout>
  );
};

export default CreateCvStep9;