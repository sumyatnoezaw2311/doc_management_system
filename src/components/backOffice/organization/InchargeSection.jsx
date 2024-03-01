import React, { useEffect, useState } from 'react'
import { Grid, InputLabel, TextField, Typography, Box, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Zoom, Alert } from '@mui/material'
import theme from '../../../utils/theme'
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addIncharge as addOrgIncharge, deleteIncharge as deleteOrgIncharge } from '../../../slices/backOffice/organizationSlice';
import { addIncharge as addComIncharge, deleteIncharge as deleteComIncharge } from '../../../slices/backOffice/companySlice';
import { useLocation, useNavigate } from 'react-router-dom';

const inchargeSchema = Yup.object().shape({
  name: Yup.string().required("Incharge's name is required"),
  position: Yup.string().required("Position is required"),
  email: Yup.string().email('Invalid email format').required('Email is required'),
})

const InchargeSection = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ incharges, setIncharges ] = useState(null)
  const location = useLocation()
  const path = location.pathname
  const currentPath = path.includes('organization') ? 'organization' : 'company'
  const inchargesFromState = useSelector(state=> currentPath === 'organization' ? state.Organization.incharges : state.Company.incharges)
  
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(inchargeSchema),
  });

  const handleInchargeOperation = async (data, operation) => {
    const inchargeData = await { ...data, id: nanoid() };
    if (currentPath === 'organization') {
      operation === 'add' ? await dispatch(addOrgIncharge(inchargeData)) : await dispatch(deleteOrgIncharge(data.id));
    } else {
      operation === 'add' ? await dispatch(addComIncharge(inchargeData)) : await dispatch(deleteComIncharge(data.id));
    }
    reset();
  };

  const handleFormSubmit = async (data) => {
    handleInchargeOperation(data, 'add');
  };

  const handleDelete = async (id) => {
    handleInchargeOperation({ id }, 'delete');
  };

  useEffect(()=>{
    if(inchargesFromState){
      setIncharges(inchargesFromState)
    }
  },[inchargesFromState])


  return (
        <Grid container gap={4} columns={{ md: 10, lg: 12 }}>
            <Grid item md={6} lg={4}>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2}}>Incharge Info</Typography>
                  <Typography sx={{ mb: 2}} variant='body2'>At least one representative person is required to create a new {currentPath}.<Typography sx={{ color: theme.palette.danger.main }} variant='span'>***</Typography></Typography>
                  <InputLabel htmlFor="name" sx={{ mb: 1 }}>Name(English)</InputLabel>
                  <TextField error={!!errors?.name} helperText={errors?.name?.message} {...register('name')} id='name' name='name' fullWidth></TextField>
                  <InputLabel htmlFor="position" sx={{ mt: 2, mb: 1 }}>Position</InputLabel>
                  <TextField error={!!errors?.position} helperText={errors?.position?.message} {...register('position')} id='position' name='position' fullWidth></TextField>
                  <InputLabel htmlFor="incharge_email" sx={{ mt: 2, mb: 1 }}>Email</InputLabel>
                  <TextField error={!!errors?.email} helperText={errors?.email?.message} {...register('email')} id='incharge_email' name='email' fullWidth></TextField>
                  <Box sx={{ textAlign: 'right'}}>
                    <Button type='button' onClick={()=>{
                      reset()
                    }} variant='text' sx={{ mt: 3, mr: 2 , color: theme.palette.common.black }}>Cancel</Button>
                    <Button type='submit' variant='contained' sx={{ mt: 3 , color: theme.palette.common.white }}>Add New</Button>
                  </Box>
                </form>
            </Grid>
            <Grid item md={6} lg={4}>
              <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2}}>Incharges List</Typography>
              {
                incharges && incharges.length > 0 ?
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {
                    incharges.map(({ id, name, position, email }, index) => (
                      <Zoom key={index} in={true} style={{ transitionDelay: true ? '300ms' : '0ms' }}>
                        <ListItem sx={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: 1, mb: 2 }} secondaryAction={
                          <IconButton aria-label="delete" onClick={() => handleDelete(id)}>
                            <DeleteIcon color='danger' />
                          </IconButton>
                        }>
                          <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
                              <PersonIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={`${name} (${position})`} secondary={<Typography variant="body2">{email}</Typography>} />
                        </ListItem>
                      </Zoom>
                    ))
                  }
              </List>
              :
              <Alert severity="warning">No incharge information yet</Alert>
              }
            </Grid>
        </Grid>
  )
}

export default InchargeSection
