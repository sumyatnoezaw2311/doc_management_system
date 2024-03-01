import React from 'react'
import { Tab, Paper, Button,Box , TextField, InputLabel, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../../../utils/theme'
import { createOrganization, resetIncharge } from '../../../slices/backOffice/organizationSlice';
import InchargeSection from '../../../components/backOffice/organization/InchargeSection';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const orgSchema = Yup.object().shape({
  name_eng: Yup.string().required("Organization name in english is required"),
  name_jp: Yup.string().required("Organization name in japanese is required"),
  phone: Yup.string().required('Phone number is required')
  .matches(/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, 'Please fill a valid phone number'),
  email: Yup.string().email('Please fill a valid email address').required('Email is required'),
  fax: Yup.string()
    .matches(/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, 'Invalid fax characters')
    .required('Fax is required'),
  address_eng: Yup.string().required("Address in english is required"),
  address_jp: Yup.string().required("Address in japanese is required"),
  chairman_eng: Yup.string().required("Chairman name in english is required"),
  chairman_jp: Yup.string().required("Chairman name in japanese is required")
})

const CreateOrganization = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const incharges = useSelector(state=> state.Organization.incharges)

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(orgSchema),
  });

  const handleFormSubmit = async (data)=>{
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
    await dispatch(createOrganization({...data, ...{ incharge: inchargeToPost }}));
    await dispatch(resetIncharge())
    navigate('/back-office/organizations-list')
  }

  return ( 
    <Paper sx={{ width: '100%', overflow: 'hidden', px: 3, minHeight: '100vh', borderRadius: 0 }}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Incharge" value="1" />
              <Tab label="Organization" disabled={!(incharges.length > 0)} value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <InchargeSection></InchargeSection>
          </TabPanel>
          <TabPanel value="2">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 1}}>Fill organization information</Typography>
              <Grid container gap={3} columns={{ md: 10 }}>
                  <Grid item md={3}>
                    <InputLabel htmlFor="name_eng" sx={{ mb: 1 }}>Organization Name (English) </InputLabel>
                    <TextField error={!!errors?.name_eng} helperText={errors?.name_eng?.message} {...register('name_eng')} id='name_eng' name='name_eng' fullWidth></TextField>
                  </Grid>
                  <Grid item md={3}>
                    <InputLabel htmlFor="name_jp" sx={{ mb: 1 }}>Organization Name (Japanese) </InputLabel>
                    <TextField error={!!errors?.name_jp} helperText={errors?.name_jp?.message} {...register('name_jp')} id='name_jp' name='name_jp' fullWidth></TextField>
                  </Grid>
                  <Grid item md={3}>
                    <InputLabel htmlFor="phone" sx={{ mb: 1 }}>Phone</InputLabel>
                    <TextField error={!!errors?.phone} helperText={errors?.phone?.message} {...register('phone')} id='phone' name='phone' fullWidth></TextField>
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
                    <InputLabel htmlFor="email" sx={{ mb: 1 }}>Email</InputLabel>
                    <TextField error={!!errors?.email} helperText={errors?.email?.message} {...register('email')} id='email' name='email' fullWidth></TextField>
                  </Grid> 
                  <Grid item md={3}>
                    <InputLabel htmlFor="chairman_eng" sx={{ mb: 1 }}>Chariman Name (English) </InputLabel>
                    <TextField error={!!errors?.chairman_eng} helperText={errors?.chairman_eng?.message} {...register('chairman_eng')} id='chairman_eng' name='chairman_eng' fullWidth></TextField>
                  </Grid>
                  <Grid item md={3}>
                    <InputLabel htmlFor="chairman_jp" sx={{ mb: 1 }}>Chariman Name (Japanese) </InputLabel>
                    <TextField error={!!errors?.chairman_jp} helperText={errors?.chairman_jp?.message} {...register('chairman_jp')} id='chairman_jp' name='chairman_jp' fullWidth></TextField>
                  </Grid>
                  <Grid item md={3}>
                    <InputLabel htmlFor="fax" sx={{ mb: 1 }}>Fax</InputLabel>
                    <TextField error={!!errors?.fax} helperText={errors?.fax?.message} {...register('fax')} id='fax' name='fax' fullWidth></TextField>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', mt: 3 }}>
                      <Button type='button' size='large' onClick={()=>{
                        reset()
                        navigate("/back-office/organizations-list")
                      }} variant='text' sx={{ mr: 2 }}>Cancel</Button>
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

export default CreateOrganization
