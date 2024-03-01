import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import theme from '../../../utils/theme'
import { Box, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupById } from '../../../slices/backOffice/interviewGpSlice';
import FormDatePicker from '../../../components/main/DatePicker';
import { createCoe, updateCoe } from '../../../slices/backOffice/documentSlice';
import Loading from '../../../components/utils/Loading';

const createCoeSchema = Yup.object().shape({
    myanmar_company_name: Yup.string().required("Myanmar company name is required"),
    myanmar_company_chairman:  Yup.string().required("Myanmar company's chairman is required"),
    myanmar_company_address: Yup.string().required("Myanmar company's address is required"),
    myanmar_company_start_date: Yup.string().required("Start date is required"),
    coe_dc_date:  Yup.string().required("COE document created date is required"),
    yen_per_dollar:  Yup.string()
    .matches(/^[0-9]+$/, 'Please enter a valid amount')
    .required("Current Yen/Dollar price is required"),
    first_training_start:  Yup.string().required("First traning start date is required"),
    // first_training_end:  Yup.string().required("First training end date is requried"),
    // first_training_duration:  Yup.string().required("First training duration is required"),
    // second_training_start:  Yup.string().required("Second traning start date is required"),
    // second_training_end:  Yup.string().required("Second training end date is requried"),
    // second_training_duration:  Yup.string().required("Second training duration is required"),
    // third_training_start:  Yup.string().required("Third traning start date is required"),
    // third_training_end:  Yup.string().required("Third training end date is requried"),
    // third_training_duration:  Yup.string().required("Third training duration is required"),
})

const CreateCoe = ({isOpen,setIsOpen})=>{

  const dispatch = useDispatch()
  const { id } = useParams()
  const [open, setOpen] = React.useState(isOpen);
  const [ mmComStartDate,setMmComStartDate ] = React.useState(null)
  const currentGroup = useSelector(state=> state.IntGroup.group)
  const createLoading = useSelector(state=> state.Document.loading)
  const [ coeDcDate,setCoeDcDate ] = React.useState(null)
  const [ firstStart,setFirstStart ] = React.useState(null)
  const [ firstEnd,setFirstEnd ] = React.useState(null)
  const [ secondStart,setSecondStart ] = React.useState(null)
  const [ secondEnd,setSecondEnd ] = React.useState(null)
  const [ thirdStart,setThirdStart ] = React.useState(null)
  const [ thirdEnd,setThirdEnd ] = React.useState(null)
  
  const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(createCoeSchema),
    });


    const handleClose = () => {
        setOpen(false);
        setIsOpen(false)
        reset()
        setMmComStartDate(null)
        setFirstStart(null)
        setFirstEnd(null)
        setSecondStart(null)
        setSecondEnd(null)
        setThirdEnd(null)
        setThirdStart(null)
        setCoeDcDate(null)
    };

  const handleOnSubmit = async (data)=>{
    const newData = {
        myanmar_company_name: data.myanmar_company_name,
        myanmar_company_chairman: data.myanmar_company_chairman,
        coe_dc_date: data.coe_dc_date,
        yen_per_dollar: data.yen_per_dollar,
        first_training_start: data.first_training_start,
        third_training_duration: data.first_training_duration,
        myanmar_company_address: data.myanmar_company_address,
        myanmar_company_start_date: data.myanmar_company_start_date
    }
    // console.log(newData);
    currentGroup?.data?.coe_datas ? await dispatch(updateCoe({data: {...newData, group_id: Number(id)}, coeId: currentGroup?.data?.coe_datas?.id})) : await dispatch(createCoe({...newData, group_id: Number(id)}));
    await dispatch(getGroupById(id))
    handleClose()
  }

  React.useEffect(()=>{
    mmComStartDate && setValue('myanmar_company_start_date', mmComStartDate)
    coeDcDate && setValue('coe_dc_date', coeDcDate)
    firstStart && setValue('first_training_start', firstStart)
    // firstEnd && setValue('first_training_end', firstEnd)
    // secondStart && setValue('second_training_start', secondStart)
    // secondEnd && setValue('second_training_end', secondEnd)
    // thirdStart && setValue('third_training_start', thirdStart)
    // thirdEnd && setValue('third_training_end', thirdEnd)
  },[coeDcDate,firstStart,firstEnd,secondStart,secondEnd,thirdStart,thirdEnd, mmComStartDate])


  React.useEffect(()=>{
    setOpen(isOpen)
  },[isOpen])

  React.useEffect(()=>{
    if(currentGroup && currentGroup?.data?.coe_datas){
        const data = currentGroup?.data?.coe_datas
        setValue('coe_dc_date',data.coe_dc_date)
        setValue('first_training_start', data.first_training_start)
        // setValue('first_training_end', data.first_training_end)
        // setValue('first_training_duration', data.first_training_duration)
        // setValue('second_training_start', data.second_training_start)
        // setValue('second_training_end', data.second_training_end)
        // setValue('second_training_duration', data.second_training_duration)
        // setValue('third_training_start', data.third_training_start)
        // setValue('third_training_end', data.third_training_end)
        // setValue('third_training_duration', data.third_training_duration)
        setValue('yen_per_dollar', data.yen_per_dollar)
        setValue('myanmar_company_address', data.myanmar_company_address)
        setValue('myanmar_company_chairman', data.myanmar_company_chairman)
        setValue('myanmar_company_name', data.myanmar_company_name)
        setValue('myanmar_company_start_date', data.myanmar_company_start_date)
        // setSecondStart(data.second_training_start)
        // setSecondEnd(data.second_training_end)
        setFirstStart(data.first_training_start)
        // setFirstEnd(data.first_training_end)
        // setThirdStart(data.third_training_start)
        // setThirdEnd(data.third_training_end)
        setCoeDcDate(data.coe_dc_date)
        setMmComStartDate(data.myanmar_company_start_date)
    }
  },[currentGroup,isOpen])

  return (
    <React.Fragment >
        {
            createLoading && <Loading/>
        }
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
            <DialogTitle id="alert-dialog-title">
                Create COE
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ mb: 2 }}>
                    Fill the required fields to create COE.
                </DialogContentText>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={3}>
                            <TextField label="Myanmar Company Name" {...register('myanmar_company_name')} error={!!errors?.myanmar_company_name} helperText={errors?.myanmar_company_name?.message} fullWidth placeholder="Myanmar Company's Name"></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Myanmar Company's Address" {...register('myanmar_company_address')} error={!!errors?.myanmar_company_address} helperText={errors?.myanmar_company_address?.message} fullWidth placeholder="Myanmar Company's Address"></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Myanmar Company's CEO" {...register('myanmar_company_chairman')} error={!!errors?.myanmar_company_chairman } helperText={errors?.myanmar_company_chairman?.message} fullWidth placeholder="Myanmar Company's Chairman"></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Yen Per Dollar" {...register('yen_per_dollar')} error={!!errors?.yen_per_dollar } helperText={errors?.yen_per_dollar?.message} fullWidth placeholder="Current Rate (Yen per dollar)"></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <FormDatePicker dateVal={mmComStartDate} setDate={setMmComStartDate} placeholderText={"Myanmar Company Start Date"} error={errors?.myanmar_company_start_date}></FormDatePicker>
                        </Grid>
                        <Grid item xs={3}>
                            <FormDatePicker dateVal={coeDcDate} setDate={setCoeDcDate} placeholderText={"COE Document Created Date"} error={errors?.myanmar_company_start_date}></FormDatePicker>
                        </Grid>
                        <Grid item xs={3}>
                            <FormDatePicker dateVal={firstStart} setDate={setFirstStart} placeholderText={"KJLA First Training Start Date"} error={errors?.first_training_start}></FormDatePicker>
                        </Grid>
                        {/* <Grid item xs={3}>
                            <FormDatePicker dateVal={firstEnd} setDate={setFirstEnd} placeholderText={"First Training End Date"} error={errors?.first_training_end}></FormDatePicker>
                        </Grid> */}
                        {/* <Grid item xs={3}>
                            <Box sx={{ pt: 1 }}></Box>
                            <TextField label="First Training Duration" {...register('first_training_duration')} error={!!errors?.first_training_duration} helperText={errors?.first_training_duration?.message} fullWidth placeholder="First Training Duration"></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <FormDatePicker dateVal={secondStart} setDate={setSecondStart} placeholderText={"Second Training Start Date"} error={errors?.second_training_start}></FormDatePicker>
                        </Grid>
                        <Grid item xs={3}>
                            <FormDatePicker dateVal={secondEnd} setDate={setSecondEnd} placeholderText={"Second Training End Date"} error={errors?.second_training_end}></FormDatePicker>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ pt: 1 }}></Box>
                            <TextField label="Second Training Duration" {...register('second_training_duration')} error={!!errors?.second_training_duration} helperText={errors?.second_training_duration?.message} fullWidth placeholder="Second Training Duration"></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <FormDatePicker dateVal={thirdStart} setDate={setThirdStart} placeholderText={"Third Training Start Date"} error={errors?.third_training_start}></FormDatePicker>
                        </Grid>
                        <Grid item xs={3}>
                            <FormDatePicker dateVal={thirdEnd} setDate={setThirdEnd} placeholderText={"Third Training End Date"} error={errors?.third_training_end}></FormDatePicker>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ pt: 1 }}></Box>
                            <TextField label="Third Training Duration" {...register('third_training_duration')} error={!!errors?.third_training_duration} helperText={errors?.third_training_duration?.message} fullWidth placeholder="Third Training Duration"></TextField>
                        </Grid> */}
                    </Grid>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', mt: 3 }}>
                        <Button type='button' onClick={handleClose} sx={{ color: theme.palette.common.black }}>Cancel</Button>
                        <Button type='submit' autoFocus sx={{ mx: 2 }}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateCoe