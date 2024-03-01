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
import { Box, FormControl, FormHelperText, Grid, MenuItem, Select, TextField } from '@mui/material';
import DatePicker from '../../../components/main/DatePicker'
import { useDispatch, useSelector } from 'react-redux';
import { createDemand, getOldDataDemandSw, updateDemand } from '../../../slices/backOffice/documentSlice';
import { useParams } from 'react-router-dom';
import { getGroupById } from '../../../slices/backOffice/interviewGpSlice';
import Loading from '../../../components/utils/Loading';

const createDemandSchema = Yup.object().shape({
    job_category_eng: Yup.string().required("Job category in english is required"),
    job_category_mm:  Yup.string().required("Job category in burmese is required"),
    job_category_jp:  Yup.string().required("Job category in japanese is required"),
    work_place:  Yup.string().required("Work place is required"),
    working_day_eng:  Yup.string().required("Working day in english is required"),
    working_day_mm:  Yup.string().required("Working day in burmese is requried"),
    holiday_eng:  Yup.string().required("Holiday in english is required"),
    holiday_mm:  Yup.string().required("Holiday in burmese is required"),
    working_hours_eng:  Yup.string().required("Working hours in english is required"),
    working_hours_mm:  Yup.string().required("Working hours in burmese is requried"),
    qualification_eng:  Yup.string().required("Qualification in english is requried"),
    qualification_mm:  Yup.string().required("Qualification in burmese is requried"),
    basic_salary:  Yup.string()
    .matches(/^[0-9]+$/, 'Please enter a valid amount')
    .required("Basic salary is required"),
    payment_method:  Yup.string().required(),
    accommodation:  Yup.string().required("Accomodation is required"),
    demand_letter_date:  Yup.string().required("Demand Letter date is required"),
    oath_date:  Yup.string().required("OATH date is required"),
    // training_period_wage_scale:  Yup.string()
    // .matches(/^[0-9]+$/, 'Please enter a valid amount')
    // .required('Training period wage scale is required'),
})

const CreateDemandSw = ({isOpen,setIsOpen})=>{

  const dispatch = useDispatch()
  const { id } = useParams()
  const [open, setOpen] = React.useState(isOpen);
  const [ payMeth, setPayMeth ] = React.useState(0)
  const [ demandDate,setDemandDate ] = React.useState(null)
  const [ oathDate,setOathDate ] = React.useState(null)
  const [ type,setType ] = React.useState(null);
  const currentGroup = useSelector(state=> state.IntGroup.group)
  const oldDataDemand = useSelector(state=> state.Document.oldDataDemandSw)
  const createLoading = useSelector(state=> state.Document.loading)
  const [ catMm, setCatMm ] = React.useState(null)
  const [ catEng, setCatEng ] = React.useState(null)
  const [ catJp, setCatJp ] = React.useState(null)

  const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(createDemandSchema),
    });

    const handlePayMethChange = (e)=>{
        setPayMeth(e.target.value);
        setValue('payment_method', e.target.value)
    }

  const handleClose = () => {
    reset()
    setDemandDate(null)
    setOathDate(null)
    setCatEng(null)
    setCatMm(null)
    setCatJp(null)
    setOpen(false);
    setIsOpen(false)
  };

  const handleOnSubmit = async (data)=>{
    oldDataDemand ? await dispatch(updateDemand({ data: data, gpId: id})) : await dispatch(createDemand({ data: data, gpId: id}));
    await dispatch(getGroupById(id))
    handleClose()
  }

  React.useEffect(()=>{
    catEng && setValue('job_category_eng', catEng)
    catMm && setValue('job_category_mm', catMm)
    catJp && setValue('job_category_jp', catJp)
  },[catEng,catJp,catMm])

  React.useEffect(()=>{
    oathDate && setValue('oath_date', oathDate)
    demandDate && setValue('demand_letter_date', demandDate)
  },[oathDate,demandDate])

  React.useEffect(()=>{
    setOpen(isOpen)
  },[isOpen])

  React.useEffect(()=>{
    if(oldDataDemand){
        setValue('work_place', oldDataDemand.work_place)
        setValue('working_day_eng', oldDataDemand.working_day_eng)
        setValue('working_day_mm', oldDataDemand.working_day_mm)
        setValue('working_hours_eng', oldDataDemand.working_hours_eng)
        setValue('working_hours_mm', oldDataDemand.working_hours_mm)
        setValue('accommodation', oldDataDemand.accommodation)
        setValue('basic_salary', oldDataDemand.basic_salary)
        setValue('demand_letter_date', oldDataDemand.demand_letter_date)
        setValue('holiday_eng', oldDataDemand.holiday_eng)
        setValue('holiday_mm', oldDataDemand.holiday_mm)
        setValue('job_category_eng', oldDataDemand.job_category_eng)
        setValue('job_category_jp', oldDataDemand.job_category_jp)
        setValue('job_category_mm', oldDataDemand.job_category_mm)
        setValue('oath_date', oldDataDemand.oath_date)
        setValue('payment_method', Number(oldDataDemand.payment_method))
        setValue('qualification_eng', oldDataDemand.qualification_eng)
        setValue('qualification_mm', oldDataDemand.qualification_mm)
        setPayMeth(oldDataDemand.payment_method)
        setOathDate(oldDataDemand.oath_date)
        setDemandDate(oldDataDemand.demand_letter_date)
    }
  },[oldDataDemand])

  React.useEffect(()=>{
    setType(currentGroup?.data?.type)
    if(currentGroup && currentGroup?.data?.demand_letter_date){
        dispatch(getOldDataDemandSw(currentGroup?.data))
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
                Demand Letter SW
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ mb: 2 }}>
                    Fill the required fields to create a demand letter.
                </DialogContentText>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={3}>
                            <TextField {...register('job_category_eng')} error={!!errors?.job_category_eng} helperText={errors?.job_category_eng?.message} fullWidth placeholder='Job Category (English)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('job_category_mm')} error={!!errors?.job_category_mm} helperText={errors?.job_category_mm?.message} fullWidth placeholder='Job Category (Burmese)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('job_category_jp')} error={!!errors?.job_category_jp} helperText={errors?.job_category_jp?.message} fullWidth placeholder='Job Category (Japanese)'></TextField>
                        </Grid>                
                        <Grid item xs={3}>
                            <TextField {...register('work_place')} error={!!errors?.work_place} helperText={errors?.work_place?.message} fullWidth placeholder='Workplace'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('working_day_eng')} error={!!errors?.working_day_eng} helperText={errors?.working_day_eng?.message} fullWidth placeholder='Working Day (English)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('working_day_mm')} error={!!errors?.working_day_mm } helperText={errors?.working_day_mm?.message} fullWidth placeholder='Working Day (Myanmar)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('holiday_eng')} error={!!errors?.holiday_eng} helperText={errors?.holiday_eng?.message} fullWidth placeholder='Holiday (English)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('holiday_mm')} error={!!errors?.holiday_mm} helperText={errors?.holiday_mm?.message} fullWidth placeholder='Holiday (Myanmar)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('working_hours_eng')} error={!!errors?.working_hours_eng} helperText={errors?.working_hours_eng?.message} fullWidth placeholder='Working Hours (English)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('working_hours_mm')} error={!!errors?.working_hours_mm} helperText={errors?.working_hours_mm?.message} fullWidth placeholder='Working Hours (Myanmar)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('qualification_eng')} error={!!errors?.qualification_eng} helperText={errors?.qualification_eng?.message} fullWidth placeholder='Qualification (English)'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('qualification_mm')} error={!!errors?.qualification_mm} helperText={errors?.qualification_mm?.message} fullWidth placeholder='Qualification (Myanmar)'></TextField>
                        </Grid>
                        {/* <Grid item xs={3}>
                            <TextField {...register('training_period_wage_scale')} error={!!errors?.training_period_wage_scale} helperText={errors?.training_period_wage_scale?.message} fullWidth placeholder='Training Period Wage Scale'></TextField>
                        </Grid> */}
                        <Grid item xs={3}>
                            <TextField {...register('basic_salary')} error={!!errors?.basic_salary} helperText={errors?.basic_salary?.message} fullWidth placeholder='Basic Salary'></TextField>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                    <Select
                                        error={!!errors?.payment_method}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={payMeth}
                                        placeholder="Payment Method"
                                        onChange={handlePayMethChange}
                                    >
                                        <MenuItem value={0} disabled>Payment Method</MenuItem>
                                        <MenuItem value={1}>Bank Transfer</MenuItem>
                                        <MenuItem value={2}>By Cash</MenuItem>
                                    </Select>
                            </FormControl>
                            {errors?.payment_method && <FormHelperText>Select an option</FormHelperText>}
                        </Grid>
                        <Grid item xs={3}>
                            <TextField {...register('accommodation')} error={!!errors?.accommodation} helperText={errors?.accommodation?.message} fullWidth placeholder='Accommodation'></TextField>
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}>
                            <DatePicker placeholderText={"Demand Letter Date"} dateVal={demandDate} setDate={setDemandDate} error={errors?.demand_letter_date}></DatePicker>
                        </Grid>
                        <Grid item xs={3}>
                            <DatePicker placeholderText={"OATH Date"} dateVal={oathDate} setDate={setOathDate} error={errors?.oath_date}></DatePicker>
                        </Grid>
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

export default CreateDemandSw