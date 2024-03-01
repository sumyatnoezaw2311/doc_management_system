import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateCvForm as titsswUpdate } from '../../../../slices/backOffice/updateTitsswslice';
import { updateCvForm as swUpdate } from '../../../../slices/backOffice/updateSwSlice';
import { useLocation, useParams } from 'react-router-dom';
import { getCvById } from '../../../../slices/backOffice/cvFromSlice';
import FieldUpload from '../../../../pages/common/FieldUpload';

const photoSchema = Yup.object().shape({
  selected_photo: Yup.string().required('Select your file'),
});

const PhotosEdit = ({ open, setOpen, type }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation()
  const path = location.pathname
  const [isOpen, setIsOpen] = useState(open);
  const [ photoType,setPhotoType ] = useState(null)
  const [photoLabel, setPhotoLabel] = useState(null);
  const titsswOldData = useSelector((state) => state.UpdateTitssw.oldData);
  const swOldData = useSelector((state) => state.UpdateSw.oldData);
  const reader = new FileReader();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(photoSchema),
  });

  const handleClose = () => {
    reset();
    setIsOpen(false);
    setOpen(false);
  };

  const convertToBase64String = (file, labelState) => {
    if (!file) return;
    labelState(file?.name);
    reader.onloadend = () => {
      const base64String = reader.result;
      setValue('selected_photo', base64String);
    };
    reader.readAsDataURL(file);
  };


  const handleUpload = (e, labelState) => {
    const file = e.target.files[0];
    convertToBase64String(file, labelState);
  };

  const handleUpdate = async (data) => {
    const updateAction = path.includes('titssw') ? titsswUpdate : swUpdate;
    const refetchAction = path.includes('titssw') ? 'titssw' : 'sw'
    const oldDataFromState = await path.includes('titssw') ? titsswOldData : swOldData;
    const newData = photoType === 'userPhoto'
      ? {
          ...oldDataFromState,
          photo_data: data.selected_photo
        }
      : {
          ...oldDataFromState,
          qr_photo_data: data.selected_photo
        };        
      await dispatch(updateAction({ data: newData, id: id }));    
      await dispatch(getCvById({type: refetchAction , id: id}))
      reset()
      setPhotoLabel(null)
      handleClose();
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);


  useEffect(() => {
    if(type){
      setPhotoType(type);
    }
  }, [isOpen]);
  

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{type === "userPhoto" ? "Change user photo" : "Change Telegram Qr"}</DialogTitle>
            <DialogContent sx={{ width: 500 }}>
                <form autoComplete="off" onSubmit={handleSubmit(handleUpdate)}>
                    <FieldUpload
                        label={photoLabel}
                        accept="image/*"
                        onChange={(e) => handleUpload(e, setPhotoLabel)}
                        error={errors?.selected_photo}
                        helperText={type === 'userPhoto' ? "3*4 cm ဖြစ်ရမည်" : "" }
                    />
                    <Box sx={{ textAlign: 'right' }}>
                      <Button type="button" onClick={handleClose}>  
                        Cancel
                      </Button>
                      <Button type="submit" sx={{ ml: 2 }} autoFocus>
                        Update
                      </Button>
                    </Box>
                </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default PhotosEdit;
