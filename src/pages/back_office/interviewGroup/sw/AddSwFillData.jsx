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
import { Box, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import NrcForFill from '../../../../components/utils/NrcForFill';
import { getNrcData, splitNrc } from 'mm-nrc';
import { convertToMyanmarNumbers } from '../../../../utils/enTomm';
import Loading from '../../../../components/utils/Loading';
import { getGroupById } from '../../../../slices/backOffice/interviewGpSlice';
import { fillData, getOldFillDataSw, updateFillData } from '../../../../slices/backOffice/fillDataSlice';
import { useParams } from 'react-router-dom';
import { mmToEng } from '../../../../utils/mmToEng';


const fillDataSchema = Yup.object().shape({
    name_mm: Yup.string().required("Name in burmese is required"),
    passport: Yup.string().required("Passport is required"),
    nrc_eng: Yup.string().required("NRC is required"),
    nrc_mm: Yup.string().required("NRC is required"),
    father_name_eng : Yup.string().required("Father name is required"),
    father_name_mm : Yup.string().required("Father name in burmese is required"),
    mother_name_eng : Yup.string().required("Father name is required"),
    mother_name_mm : Yup.string().required("Father name in burmese is required"),
    ethnicity_region_mm: Yup.string().required("Ethnicity and region in burmese is required"),
    state_or_division_address: Yup.string().required("State or division is required"),
    districts: Yup.string().required("Districts is required"),
    townships: Yup.string().required("Township is required"),
    ward_or_village: Yup.string().required("Ward or village is required"),
    road: Yup.string().required("Address(Road_ is required"),
    address_no: Yup.string().required("Address(NO) is required"),
    hometown_mm: Yup.string().required("Hometown is required"),
    edu_status: Yup.string().required("Education status is required"),
    promient_mark: Yup.string().required("Promient mark in burmese is required"),
    inheritance_name_mm: Yup.string().required("Inheritance name in burmese is required"),
    inheritance_relationship_mm: Yup.string().required("Inheritance relationship in burmese is required"),
    inheritance_phone: Yup.string().matches(/^\d{9,11}$/, 'Please fill a valid phone number').required("Inheritance's phone is required"),
    inheritance_state_or_division_address: Yup.string().required("Inheritance's address (State or division) is required"),
    inheritance_districts: Yup.string().required("Inheritance's address (Districts) is required"),
    inheritance_townships: Yup.string().required("Inheritance's address (Township) is required"),
    inheritance_ward_or_village: Yup.string().required("Inheritance's address (ward or village) is required"),
    inheritance_road: Yup.string().required("Inheritance's address (Road) is required"),
    inheritance_address_no: Yup.string().required("Inheritance's address(NO) is required"),
    inheritance_nrc_mm: Yup.string().required("NRC is required"),
})

const AddSwFillData = ({cvId,isOpen,setIsOpen})=>{

    const dispatch = useDispatch()
    const { id } = useParams()
    const [open, setOpen] = useState(isOpen);
    const [nrcData, setNrcData] = useState(null);
    const [inhNrcData, setInhNrcData] = useState(null);
    const loading = useSelector(state=> state.FillData.loading)
    const cvData = useSelector(state=> state.CvForm.cv)
    const cvDataLoading = useSelector(state=> state.CvForm.loading)
    const oldFillDataSw = useSelector(state=> state.FillData.getOldFillDataSw)
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

      const changeNrcFormatToEng = (nrcStringMm) => {
        const result = nrcStringMm.slice(-6);
        const match1 =  nrcStringMm.match(/[၀-၉]+\/[က-အ]+\(နိုင်\)/);
        const result1 = match1 ? match1[0] : null;
        const destructuredNrcData = splitNrc(result1+mmToEng(result))
        const filteredState = getNrcData().nrcStates.find(
          (state) => state.number.mm === destructuredNrcData.stateNo
        );
        const filteredTownship = getNrcData().nrcTownships.find(
          (township) => township.short.mm === destructuredNrcData.townshipCode
        );
        const filteredType = getNrcData().nrcTypes.find(
          (type) => type.name.mm === destructuredNrcData.nrcType
        );
        const engType = filteredType?.name?.en;
        const engTownship = filteredTownship?.short?.en;
        const engState = filteredState?.number?.en;
        const engNrc = `${engState}/${engTownship}(${engType})${destructuredNrcData.nrcNumber}`;
        return engNrc;
      };

  const handleClose = () => {
    reset()
    setOpen(false);
    setIsOpen(false)
  };

  const handleOnSubmit = async (data)=>{
    const newData = {
        passport: data.passport,
        nrc_mm: data.nrc_mm,
        name_mm: data.name_mm,
        state_or_division_address: data.state_or_division_address,
        districts: data.districts,
        townships: data.townships,
        ward_or_village: data.ward_or_village,
        road: data.road,
        address_no: data.address_no,
        father_name_mm: data.father_name_mm,
        father_name_eng: data.father_name_eng,
        mother_name_mm: data.mother_name_mm,
        mother_name_eng: data.mother_name_eng,
        hometown_mm: data.hometown_mm,
        ethnicity_region_mm: data.ethnicity_region_mm,
        promient_mark: data.promient_mark,
        inheritance_name_mm: data.inheritance_name_mm,
        inheritance_relationship_mm: data.inheritance_relationship_mm,
        inheritance_nrc_mm: data.inheritance_nrc_mm,
        inheritance_phone: data.inheritance_phone,
        inheritance_state_or_division_address: data.inheritance_state_or_division_address,
        inheritance_districts: data.inheritance_districts,
        inheritance_townships: data.inheritance_townships,
        inheritance_ward_or_village: data.inheritance_ward_or_village,
        inheritance_road: data.inheritance_road,
        inheritance_address_no: data.inheritance_address_no,
        edu_status: data.edu_status
    }
    oldFillDataSw ? await dispatch(updateFillData({ type: 'sw', data: newData, id: Number(cvId)})) : await dispatch(fillData({ type: 'sw', data: newData, id: cvId}));;
    await dispatch(getGroupById(id))
    setNrcData(null)
    setInhNrcData(null)
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
    if(inhNrcData){
        const destructuredNrcData = splitNrc(inhNrcData);
        const formattedNrc = changeNrcFormat(destructuredNrcData.stateNo, destructuredNrcData.townshipCode, destructuredNrcData.nrcType, destructuredNrcData.nrcNumber)
        setValue("inheritance_nrc_mm",formattedNrc);
    }
  },[nrcData, inhNrcData])

  useEffect(()=>{
    if(oldFillDataSw && oldFillDataSw?.passport){
        setValue('edu_status', oldFillDataSw.edu_status)
        setValue('ethnicity_region_mm', oldFillDataSw.ethnicity_region_mm)
        setValue('father_name_eng', oldFillDataSw.father_name_eng)
        setValue('father_name_mm', oldFillDataSw.father_name_mm)
        setValue('mother_name_eng', oldFillDataSw.mother_name_eng)
        setValue('mother_name_mm', oldFillDataSw.mother_name_mm)
        setValue('name_mm', oldFillDataSw.name_mm)
        setValue('nrc_eng', changeNrcFormatToEng(oldFillDataSw.nrc_mm))
        setValue('nrc_mm', oldFillDataSw.nrc_mm)
        setValue('passport', oldFillDataSw.passport)
        setValue('state_or_division_address', oldFillDataSw.state_or_division_address)
        setValue('districts', oldFillDataSw.districts)
        setValue('townships', oldFillDataSw.townships)
        setValue('ward_or_village', oldFillDataSw.ward_or_village)
        setValue('road', oldFillDataSw.road)
        setValue('address_no', oldFillDataSw.address_no)
        setValue('hometown_mm', oldFillDataSw.hometown_mm)
        setValue('promient_mark', oldFillDataSw.promient_mark)
        setValue('inheritance_name_mm', oldFillDataSw.inheritance_name_mm)
        setValue('inheritance_relationship_mm', oldFillDataSw.inheritance_relationship_mm)
        setValue('inheritance_address_no', oldFillDataSw.inheritance_address_no)
        setValue('inheritance_districts', oldFillDataSw.inheritance_districts)
        setValue('inheritance_townships', oldFillDataSw.inheritance_townships)
        setValue('inheritance_road', oldFillDataSw.inheritance_road)
        setValue('inheritance_ward_or_village', oldFillDataSw.inheritance_ward_or_village)
        setValue('inheritance_phone', oldFillDataSw.inheritance_phone)
        setValue('inheritance_state_or_division_address', oldFillDataSw.inheritance_state_or_division_address)
        setValue('inheritance_nrc_mm', changeNrcFormatToEng(oldFillDataSw.inheritance_nrc_mm))
        setSelectedStateOrDivision(oldFillDataSw.state_or_division_address)
        setNrcData(changeNrcFormatToEng(oldFillDataSw.nrc_mm))
        setInhNrcData(changeNrcFormatToEng(oldFillDataSw.inheritance_nrc_mm))
    }
  },[oldFillDataSw])

  useEffect(()=>{
    setOpen(isOpen)
  },[isOpen])

  useEffect(()=>{
    cvData && dispatch(getOldFillDataSw(cvData))
  },[cvData])

  return (
    <Fragment >
        {
            loading || cvDataLoading && <Loading/>
        }
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
            <DialogTitle id="alert-dialog-title">
                Necessary Data (SW)
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
                                error={errors?.nrc_eng}
                            ></NrcForFill>
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
                            <TextField {...register('ethnicity_region_mm')} error={!!errors?.ethnicity_region_mm} helperText={errors?.ethnicity_region_mm?.message} fullWidth placeholder='Ethnicity and Religion (Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('edu_status')} error={!!errors?.edu_status} helperText={errors?.edu_status?.message} fullWidth placeholder='Education Status'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            {/* <TextField {...register('state_or_division_address')} error={!!errors?.state_or_division_address} helperText={errors?.state_or_division_address?.message} fullWidth placeholder='State or Division (Burmese)'></TextField> */}
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
                            { errors?.state_or_division_address && <FormHelperText sx={{ color: theme.palette.danger.main }}>Select an option</FormHelperText>}
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('districts')} error={!!errors?.districts} helperText={errors?.districts?.message} fullWidth placeholder='District (Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('townships')} error={!!errors?.townships} helperText={errors?.townships?.message} fullWidth placeholder='Township (Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('ward_or_village')} error={!!errors?.ward_or_village} helperText={errors?.ward_or_village?.message} fullWidth placeholder='Ward Or Village'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('road')} error={!!errors?.road} helperText={errors?.road?.message} fullWidth placeholder='Road Name'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('address_no')} error={!!errors?.address_no} helperText={errors?.address_no?.message} fullWidth placeholder='House No'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('hometown_mm')} error={!!errors?.hometown_mm} helperText={errors?.hometown_mm?.message} fullWidth placeholder='Hometown(Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('promient_mark')} error={!!errors?.promient_mark} helperText={errors?.promient_mark?.message} fullWidth placeholder='Promient Mark (Burmese)'></TextField>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 3 }}>Inheritance Data</Divider>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={3}>
                            <TextField {...register('inheritance_name_mm')} error={!!errors?.inheritance_name_mm} helperText={errors?.inheritance_name_mm?.message} fullWidth placeholder='Inheritance Name (Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('inheritance_relationship_mm')} error={!!errors?.inheritance_relationship_mm} helperText={errors?.inheritance_relationship_mm?.message} fullWidth placeholder='Inheritance Relationship (Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('inheritance_phone')} error={!!errors?.inheritance_phone} helperText={errors?.inheritance_phone?.message} fullWidth placeholder='Inheritance Phone'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('inheritance_state_or_division_address')} error={!!errors?.inheritance_state_or_division_address} helperText={errors?.inheritance_state_or_division_address?.message} fullWidth placeholder="Inheritance State or Division (Burmese)"></TextField>
                            {/* <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Inheritance State or Division</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedStateOrDivision1}
                                    label="Inheritance State or Division"
                                    onChange={handleStateOrDiChange1}
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
                            </FormControl> */}
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('inheritance_districts')} error={!!errors?.inheritance_districts} helperText={errors?.inheritance_districts?.message} fullWidth placeholder='Inheritance District (Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('inheritance_townships')} error={!!errors?.inheritance_townships} helperText={errors?.inheritance_townships?.message} fullWidth placeholder='Inheritance Township (Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('inheritance_ward_or_village')} error={!!errors?.inheritance_ward_or_village} helperText={errors?.inheritance_ward_or_village?.message} fullWidth placeholder='Inheritance Ward Or Village'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('inheritance_road')} error={!!errors?.inheritance_road} helperText={errors?.inheritance_road?.message} fullWidth placeholder='Inheritance Road Name'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('inheritance_address_no')} error={!!errors?.inheritance_address_no} helperText={errors?.inheritance_address_no?.message} fullWidth placeholder='Inheritance House No'></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <NrcForFill
                                data={inhNrcData}
                                setData={setInhNrcData}
                                error={errors?.inheritance_nrc_mm}
                            ></NrcForFill>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', mt: 3 }}>
                        <Button type='button' onClick={handleClose} sx={{ color: theme.palette.common.black }}>Cancel</Button>
                        <Button type='submit' autoFocus sx={{ mx: 2 }}>
                            {oldFillDataSw ? "Update" : "Submit"}
                        </Button>
                    </Box>
                </form>
            </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default AddSwFillData