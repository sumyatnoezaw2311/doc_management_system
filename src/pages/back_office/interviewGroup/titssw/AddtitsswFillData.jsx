import React, { useState, useEffect, Fragment } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import theme from '../../../../utils/theme'
import { Box, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupById } from '../../../../slices/backOffice/interviewGpSlice';
import NrcForFill from '../../../../components/utils/NrcForFill';
import { getNrcData, splitNrc } from 'mm-nrc';
import { convertToMyanmarNumbers } from '../../../../utils/enTomm';
import { fillData, getOldFillData, updateFillData } from '../../../../slices/backOffice/fillDataSlice';
import Loading from '../../../../components/utils/Loading';


const fillDataSchema = Yup.object().shape({
    name_mm: Yup.string().required("Name in burmese is required"),
    passport: Yup.string().required("Passport is required"),
    nrc_eng: Yup.string().required("NRC is required"),
    nrc_mm: Yup.string().required("NRC is required"),
    father_name_eng : Yup.string().required("Father name is required"),
    father_name_mm : Yup.string().required("Father name in burmese is required"),
    mother_name_eng : Yup.string().required("Father name is required"),
    mother_name_mm : Yup.string().required("Father name in burmese is required"),
    state_or_division_address: Yup.string().required("State or division is required"),
    rest_of_address_eng: Yup.string().required("Rest of address in english is required"),
    rest_of_address_mm: Yup.string().required("Rest of address in burmese is required"),
    ethnicity_religion_mm: Yup.string().required("Ethnicity and religion in burmese is required"),
    edu_status: Yup.string().required("Education status is required")
})

const AddtitsswFillData = ({ cvId , isOpen , setIsOpen})=>{

    const { id } = useParams()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(isOpen);
    const [nrcData, setNrcData] = useState(null);
    const cvData = useSelector(state=> state.CvForm.cv)
    const oldFillData = useSelector(state=> state.FillData.getOldFillData)
    const loading = useSelector(state=> state.FillData.loading)
    const loading1 = useSelector(state=> state.CvForm.loading)
    const [ selectedStateOrDivision, setSelectedStateOrDivision ] = useState('')

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(fillDataSchema),
    });

    const changeNrcFormat = (stateNo, townshipCode, nrcType, nrcNumber) => {
        const filteredState = getNrcData().nrcStates.find(
          (state) => state.number.en === stateNo
        );
        const filteredTownship = getNrcData().nrcTownships.find(
          (township) => township.short.en === townshipCode
        );
        const filteredType = getNrcData().nrcTypes.find(
          (type) => type.name.en === nrcType
        );
        const mmNrcNumber = nrcNumber && convertToMyanmarNumbers(nrcNumber);
        const mmType = filteredType?.name?.mm;
        const mmTownship = filteredTownship?.short?.mm;
        const mmState = filteredState?.number?.mm;
        const mmNrc = `${mmState}/${mmTownship}(${mmType})${mmNrcNumber}`;
        return mmNrc;
      };

  const handleClose = () => {
    reset()
    setOpen(false);
    setIsOpen(false)
  };

  const handleOnSubmit = async (data)=>{
    oldFillData ? await dispatch(updateFillData({ type: 'titssw', data: data, id: Number(cvId)})) : await dispatch(fillData({ type: 'titssw', data: data, id: Number(cvId)}));
    await dispatch(getGroupById(id))
    handleClose()
  }

  const handleStateOrDiChange = (event)=>{
    setValue('state_or_division_address', event.target.value)
    setSelectedStateOrDivision(event.target.value);
  }

  useEffect(()=>{
    if(nrcData){
        setValue("nrc_eng",nrcData);
        const destructuredNrcData = splitNrc(nrcData);
        const formattedNrc = changeNrcFormat(destructuredNrcData.stateNo, destructuredNrcData.townshipCode, destructuredNrcData.nrcType, destructuredNrcData.nrcNumber)
        setValue("nrc_mm",formattedNrc);
    }
  },[nrcData])

  useEffect(()=>{
    if(oldFillData && oldFillData?.passport){
        setValue('edu_status', oldFillData.edu_status)
        setValue('ethnicity_religion_mm', oldFillData.ethnicity_religion_mm)
        setValue('father_name_eng', oldFillData.father_name_eng)
        setValue('father_name_mm', oldFillData.father_name_mm)
        setValue('mother_name_eng', oldFillData.mother_name_eng)
        setValue('mother_name_mm', oldFillData.mother_name_mm)
        setValue('name_mm', oldFillData.name_mm)
        setValue('nrc_eng', oldFillData.nrc_eng)
        setValue('nrc_mm', oldFillData.nrc_mm)
        setValue('passport', oldFillData.passport)
        setValue('rest_of_address_eng', oldFillData.rest_of_address_eng)
        setValue('rest_of_address_mm', oldFillData.rest_of_address_mm)
        setValue('state_or_division_address', oldFillData.state_or_division_address)
        setSelectedStateOrDivision(oldFillData.state_or_division_address)
        setNrcData(oldFillData.nrc_eng)
    }
  },[oldFillData])

  useEffect(()=>{
    setOpen(isOpen)
  },[isOpen])

  useEffect(()=>{
    cvData && dispatch(getOldFillData(cvData))
  },[cvData])

  useEffect(()=>{
    setNrcData(null)
  },[])

  return (
    <Fragment >
        {
            loading || loading1 && <Loading/>
        }
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
            <DialogTitle id="alert-dialog-title">
                Necessary Data (TIT/SSW)
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ mb: 2 }}>
                    After passing the interview, fill in the required fields to continue the documentation process.
                </DialogContentText>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={3}>
                            <TextField {...register('name_mm')} error={!!errors?.name_mm} helperText={errors?.name_mm?.message} fullWidth placeholder='Name(Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('passport')} error={!!errors?.passport} helperText={errors?.passport?.message} fullWidth placeholder='Passport No'></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <NrcForFill
                                data={nrcData}
                                setData={setNrcData}
                                error={errors?.nrc_mm}
                            ></NrcForFill>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('ethnicity_religion_mm')} error={!!errors?.ethnicity_religion_mm} helperText={errors?.ethnicity_religion_mm?.message} fullWidth placeholder='Ethnicity and Religion (Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('edu_status')} error={!!errors?.edu_status} helperText={errors?.edu_status?.message} fullWidth placeholder='Education Status'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('father_name_eng')} error={!!errors?.father_name_eng } helperText={errors?.father_name_eng?.message} fullWidth placeholder='Father Name (English)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('father_name_mm')} error={!!errors?.father_name_mm} helperText={errors?.father_name_mm?.message} fullWidth placeholder='Father Name (Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('mother_name_eng')} error={!!errors?.mother_name_eng} helperText={errors?.mother_name_eng?.message} fullWidth placeholder='Mother Name (English)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('mother_name_mm')} error={!!errors?.mother_name_mm} helperText={errors?.mother_name_mm?.message} fullWidth placeholder='Mother Name (Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">State or Division</InputLabel>
                                <Select
                                    error={!!errors?.state_or_division_address}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedStateOrDivision}
                                    label="State or Division"
                                    onChange={handleStateOrDiChange}
                                >
                                    <MenuItem value={'ရန်ကုန်တိုင်းဒေသကြီး'}>ရန်ကုန်တိုင်းဒေသကြီး</MenuItem>
                                    <MenuItem value={'မန္တလေးတိုင်းဒေသကြီး'}>မန္တလေးတိုင်းဒေသကြီး</MenuItem>
                                    <MenuItem value={'မကွေးတိုင်းဒေသကြီး'}>မကွေးတိုင်းဒေသကြီး</MenuItem>
                                    <MenuItem value={'စစ်ကိုင်းတိုင်းဒေသကြီး'}>စစ်ကိုင်းတိုင်းဒေသကြီး</MenuItem>
                                    <MenuItem value={'ဧရာ၀တီတိုင်းဒေသကြီး'}>ဧရာ၀တီတိုင်းဒေသကြီး</MenuItem>
                                    <MenuItem value={'နေပြည်တော်တိုင်းဒေသကြီး'}>နေပြည်တော်တိုင်းဒေသကြီး</MenuItem>
                                    <MenuItem value={'ပဲခူးတိုင်းဒေသကြီး'}>ပဲခူးတိုင်းဒေသကြီး</MenuItem>
                                    <MenuItem value={'တနင်္သာရီတိုင်းဒေသကြီး'}>တနင်္သာရီတိုင်းဒေသကြီး</MenuItem>
                                    <MenuItem value={'ကချင်ပြည်နယ်'}>ကချင်ပြည်နယ်</MenuItem>
                                    <MenuItem value={'ကယားပြည်နယ်'}>ကယားပြည်နယ်</MenuItem>
                                    <MenuItem value={'ကရင်ပြည်နယ်'}>ကရင်ပြည်နယ်</MenuItem>
                                    <MenuItem value={'ချင်းပြည်နယ်'}>ချင်းပြည်နယ်</MenuItem>
                                    <MenuItem value={'မွန်ပြည်နယ်'}>မွန်ပြည်နယ်</MenuItem>
                                    <MenuItem value={'ရခိုင်ပြည်နယ်'}>ရခိုင်ပြည်နယ်</MenuItem>
                                    <MenuItem value={'ရှမ်းပြည်နယ်'}>ရှမ်းပြည်နယ်</MenuItem>
                                </Select>
                            </FormControl>
                            { errors?.state_or_division_address && <FormHelperText>Select an option</FormHelperText>}
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('rest_of_address_eng')} error={!!errors?.rest_of_address_eng} helperText={errors?.rest_of_address_eng?.message} fullWidth placeholder='Rest of address (English)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('rest_of_address_mm')} error={!!errors?.rest_of_address_mm} helperText={errors?.rest_of_address_mm?.message} fullWidth placeholder='Rest of address (Burmese)'></TextField>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', mt: 3 }}>
                        <Button type='button' onClick={handleClose} sx={{ color: theme.palette.common.black }}>Cancel</Button>
                        <Button type='submit' autoFocus sx={{ mx: 2 }}>
                            {oldFillData && oldFillData.passport ? "Update" : "Submit"}
                        </Button>
                    </Box>
                </form>
            </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default AddtitsswFillData