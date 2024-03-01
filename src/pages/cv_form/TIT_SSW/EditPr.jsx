import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, FormHelperText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import CollectionsIcon from '@mui/icons-material/Collections';
import CreateLayout from '../../../components/layouts/CreateLayout';
import { getCvById } from '../../../slices/backOffice/cvFromSlice';
import { transform } from '../../../utils/transformsrc';
import { getOldData as getOldDataSw } from '../../../slices/backOffice/updateSwSlice'
import { getOldData as getOldDataTitssw } from '../../../slices/backOffice/updateTitsswslice'
import { updateCvForm as titsswUpdate } from '../../../slices/backOffice/updateTitsswslice';
import { updateCvForm as swUpdate } from '../../../slices/backOffice/updateSwSlice';
import Loading from '../../../components/utils/Loading';


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

  const dispatch = useDispatch()
  const profileData = useSelector((state) => state.User?.profile?.data);
  const [photoLabel, setPhotoLabel] = useState(null);
  const [qrLabel, setQrLabel] = useState(null);
  const cvById = useSelector(state=> state.CvForm.cv)
  const titsswOldData = useSelector((state) => state.UpdateTitssw.oldData);
  const swOldData = useSelector((state) => state.UpdateSw.oldData);
  const swLoading = useSelector(state=> state.UpdateSw.loading)
  const titSswLoading = useSelector(state=> state.UpdateTitssw.loading)
  const navigate = useNavigate();
  const reader = new FileReader();

  const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(finalSchema),
  });

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

  const handleCancel = () => {
    navigate('/')
  };

  const handleFormSubmit = async (data) => {
    if(!profileData) return
    const updateAction = profileData.titssw_id ? titsswUpdate : swUpdate;
    const oldDataFromState = await profileData.titssw_id ? titsswOldData : swOldData;
    const newData = {
          ...oldDataFromState,
          photo_data: data.photo_data,
          qr_photo_data: data.qr_photo_data
    }      
    await dispatch(updateAction({ data: newData, id: profileData.titssw_id || profileData.sw_id }));    
    setPhotoLabel(null);
    setQrLabel(null);
    reset()
  };

  const setOldData = async (oldData) => {
    if (oldData && profileData) {
      const base64Photo = await transform(oldData.photo);
      const base64QrPhoto = await transform(oldData.qr_photo);
      profileData.sw_id ? await dispatch(
        getOldDataSw({
          ...oldData,
          ...{
            user_id: profileData.id,
            photo: base64Photo,
            qr_photo: base64QrPhoto,
          },
        })
      ):
      await dispatch(
        getOldDataTitssw({
          ...oldData,
          ...{
            user_id: profileData.id,
            photo: base64Photo,
            qr_photo: base64QrPhoto,
          },
        })
      );
    }
  };


  useEffect(()=>{
    if(cvById){
      setOldData(cvById);
    }
  },[cvById])

  useEffect(()=>{
    if(profileData){
      profileData.sw_id ? dispatch(getCvById({type: 'sw', id: profileData.sw_id})) : dispatch(getCvById({type: 'titssw' ,id: profileData.titssw_id}))
    }
  },[profileData])

  return (
    <CreateLayout title="" submTitle="">
      <form autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
        {
          (titSswLoading || swLoading) && <Loading/>
        }
        <Box sx={{ width: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography sx={{ mb: 3 }}>Since your cv information is already filled in, you can edit pr and photos</Typography>
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
            helperText="Your Telegram QR Code"
          />
        </Box>
        <Box marginY={3} sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
          <Button onClick={handleCancel} type="button" variant="text" sx={{ color: '#000', marginRight: 3 }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ color: 'white' }}>
            Confirm
          </Button>
        </Box>
      </form>
    </CreateLayout>
  );
};

export default CreateCvStep9;