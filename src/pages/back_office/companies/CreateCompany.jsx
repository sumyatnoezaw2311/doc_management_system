import React, { useEffect, useState } from 'react'
import { Tab, Paper ,Button , Box, TextField, InputLabel, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../../utils/theme'
import InchargeSection from '../../../components/backOffice/organization/InchargeSection';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import OrgSelect from '../../../components/main/OrgSelect';
import { createCompany,resetIncharge } from '../../../slices/backOffice/companySlice';

const companySchema = Yup.object().shape({
  name_eng: Yup.string().required("Company name in english is required"),
  name_jp: Yup.string().required("Company name in japanese is required"),
  phone: Yup.string().required('Phone number is required')
  .matches(/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, 'Please fill a valid phone number'),
  email: Yup.string().email('Please fill a valid email address').required('Email is required'),
  fax: Yup.string()
    .matches(/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, 'Invalid fax characters')
    .required('Fax is required'),
  address_eng: Yup.string().required("Address in english is required"),
  address_jp: Yup.string().required("Address in japanese is required"),
  address_mm: Yup.string().required("Address in burmese is required"),
  region_mm: Yup.string().required("State or region is required"),
  ceo_eng: Yup.string().required("CEO name in english is required"),
  ceo_jp: Yup.string().required("CEO name in japanese is required"),
  organization_id: Yup.number().required("Select a relevant organization")
})

const CreateCompany = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const incharges = useSelector(state=> state.Company.incharges)
  const [ tabValue, setTabValue] = React.useState('1');
  const [ orgId, setOrgId ] = useState(null)

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(companySchema),
  });

  const handleFormSubmit = async (data)=>{
    console.log(data);
    const inchargeToPost = []
    if(incharges && incharges.length > 0){
      await incharges.map(inch=> inchargeToPost.push({
        name: inch.name,
        position: inch.position,
        email: inch.email,
        })
      )
    }else{
      console.log("you can't create");
      return
    }
    await dispatch(createCompany({...data, ...{ incharge: inchargeToPost }}));
    await dispatch(resetIncharge())
    navigate('/back-office/companies-list')
  }

  useEffect(()=>{
    orgId && setValue('organization_id', orgId);
  },[orgId])

  useEffect(()=>{
    dispatch(resetIncharge())
  },[])

  return ( 
    <Paper sx={{ width: '100%', overflow: 'hidden', px: 3, minHeight: '100vh', borderRadius: 0 }}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Incharge" value="1" />
              <Tab label="Company" disabled={!(incharges.length > 0)} value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <InchargeSection></InchargeSection>
          </TabPanel>
          <TabPanel value="2">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 1}}>Fill company information</Typography>
              <Grid container gap={3} columns={{ md: 10 }}>
                  <Grid item md={3}>
                    <InputLabel htmlFor="name_eng" sx={{ mb: 1 }}>Company Name (English) </InputLabel>
                    <TextField error={!!errors?.name_eng} helperText={errors?.name_eng?.message} {...register('name_eng')} id='name_eng' name='name_eng' fullWidth></TextField>
                  </Grid>
                  <Grid item md={3}>
                    <InputLabel htmlFor="name_jp" sx={{ mb: 1 }}>Company Name (Japanese) </InputLabel>
                    <TextField error={!!errors?.name_jp} helperText={errors?.name_jp?.message} {...register('name_jp')} id='name_jp' name='name_jp' fullWidth></TextField>
                  </Grid> 
                  <Grid item md={3}>
                    <InputLabel htmlFor="name_jp" sx={{ mb: 1 }}>Select a relevant organization</InputLabel>
                    <OrgSelect getId={setOrgId} error={errors?.organization_id}></OrgSelect>
                  </Grid> 
                  <Grid item md={3}>
                    <InputLabel htmlFor="address_eng" sx={{ mb: 1 }}>Address (English) </InputLabel>
                    <TextField error={!!errors?.address_eng} helperText={errors?.address_eng?.message} {...register('address_eng')} id='address_eng' name='address_eng' fullWidth></TextField>
                  </Grid>
                  <Grid item md={3}>
                    <InputLabel htmlFor="address_jp" sx={{ mb: 1 }}>Address (Japanese) </InputLabel>
                    <TextField error={!!errors?.address_jp} helperText={errors?.address_jp?.message} {...register('address_jp')} id='address_jp' name='address_jp' fullWidth></TextField>
                  </Grid>
                  <Grid item md={3}>
                    <InputLabel htmlFor="address_jp" sx={{ mb: 1 }}>Address (Burmese) </InputLabel>
                    <TextField error={!!errors?.address_mm} helperText={errors?.address_mm?.message} {...register('address_mm')} id='address_mm' name='address_mm' fullWidth></TextField>
                  </Grid>
                  <Grid item md={3}>
                    <InputLabel htmlFor="region_mm" sx={{ mb: 1 }}>Region in burmese where the company is located</InputLabel>
                    <TextField error={!!errors?.region_mm} helperText={errors?.region_mm?.message} {...register('region_mm')} id='region_mm' name='region_mm' fullWidth></TextField>
                  </Grid>
                  <Grid item md={3}>
                    <InputLabel htmlFor="ceo_eng" sx={{ mb: 1 }}>CEO Name (English) </InputLabel>
                    <TextField error={!!errors?.ceo_eng} helperText={errors?.ceo_eng?.message} {...register('ceo_eng')} id='ceo_eng' name='ceo_eng' fullWidth></TextField>
                  </Grid>
                  <Grid item md={3}>
                    <InputLabel htmlFor="ceo_jp" sx={{ mb: 1 }}>CEO Name (Japanese) </InputLabel>
                    <TextField error={!!errors?.ceo_jp} helperText={errors?.ceo_jp?.message} {...register('ceo_jp')} id='ceo_jp' name='ceo_jp' fullWidth></TextField>
                  </Grid>
                  <Grid item md={3}>
                    <InputLabel htmlFor="phone" sx={{ mb: 1 }}>Phone</InputLabel>
                    <TextField error={!!errors?.phone} helperText={errors?.phone?.message} {...register('phone')} id='phone' name='phone' fullWidth></TextField>
                  </Grid> 
                  <Grid item md={3}>
                    <InputLabel htmlFor="email" sx={{ mb: 1 }}>Email</InputLabel>
                    <TextField error={!!errors?.email} helperText={errors?.email?.message} {...register('email')} id='email' name='email' fullWidth></TextField>
                  </Grid> 
                  <Grid item md={3}>
                    <InputLabel htmlFor="fax" sx={{ mb: 1 }}>Fax</InputLabel>
                    <TextField error={!!errors?.fax} helperText={errors?.fax?.message} {...register('fax')} id='fax' name='fax' fullWidth></TextField>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', mt: 3 }}>
                      <Button type='button' size='large' onClick={()=> reset()} variant='text' sx={{ mr: 2 }}>Cancel</Button>
                      <Button type='submit' size='large' variant='contained' sx={{ color: theme.palette.common.white, float: 'right' }}>Create</Button>
                    </Box>
                  </Grid>         
              </Grid>
            </form>
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  )
}

export default CreateCompany
