import React, { useEffect, useState } from 'react';
import { Grid, TextField, Box, Typography, FormControlLabel, Checkbox, Button, Link } from '@mui/material';
import cloverLogo from '../../assets/images/clover.png';
import theme from '../../utils/theme';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../slices/auth/authSlice';
import Loading from '../../components/utils/Loading'

const accountSchema = Yup.object().shape({
    name: Yup.string().required('အမည်ဖြည့်ပါ'),
    phone: Yup.string().matches(/^\d{9,11}$/, 'ဖုန်းနံပါတ်မှားယွင်းနေပါသည်').required('ဖုန်းနံပါတ်ဖြည့်ပါ'),
    email: Yup.string().email('Email ဖြည့်ပါ').required('Email ဖြည့်ပါ'),
    password: Yup.string().min(6, 'အနည်းဆုံး ၆ လုံးဖြည့်ပါ').required('Password ဖြည့်ပါ'),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwordနှင့်တူရမည်')
        .min(6, 'အနည်းဆုံး ၆ လုံးဖြည့်ပါ')
        .required('Confirm Password ဖြည့်ပါ'),
    is_engineer: Yup.boolean()
});

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ isEngineer,setIsEngineer ] = useState(false)
    const loading = useSelector(state=> state.User.loading)

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(accountSchema),
    });

    const handleCheck = ()=>{
        setIsEngineer(prev=> !prev)
    }

    const onSubmit = async (data) => {
        const newData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, value === true ? 1 : value === false ? 0 : value])
        );
        await dispatch(registerUser(newData))
        navigate('/login')
    };

    useEffect(()=>{
        setValue('is_engineer',isEngineer)
    },[isEngineer])

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
      {
        loading && <Loading/>
      }
      <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img width={200} src={cloverLogo} loading="lazy" alt="Clover Logo" />
          <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }} marginTop={2} marginBottom={2}>
            Create your account
          </Typography>
          <Box sx={{ width: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <TextField {...register('name')} error={!!errors?.name} helperText={errors?.name?.message} sx={{ marginY: 2 }} id="name" label="Name" variant="outlined" />
            <TextField {...register('email')} error={!!errors?.email} helperText={errors?.email?.message} sx={{ marginBottom: 2 }} id="email" label="Email" variant="outlined" />
            <TextField {...register('phone')} error={!!errors?.phone} helperText={errors?.phone?.message} sx={{ marginBottom: 2 }} id="phone" label="Phone" variant="outlined" />
            <TextField {...register('password')} error={!!errors?.password} helperText={errors?.password?.message} sx={{ marginBottom: 2 }} id="password" label="Password" variant="outlined" />
            <TextField
              {...register('password_confirmation')}
              error={!!errors?.password_confirmation} helperText={errors?.password_confirmation?.message}
              id="password_confirmation"
              label="Confirm Password"
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: 'flex', width: '100%' }}>
          <FormControlLabel
              control={
                <Checkbox
                  {...register('is_engineer')}
                  name="betal"
                  checked={isEngineer}
                  onChange={handleCheck}
                />
              }
              label={<Typography sx={{ fontSize: '12px', my: 3 }}>Do you want to apply for an engineering job?</Typography>}
            />
          </Box>
          <Button variant="contained" fullWidth sx={{ color: theme.palette.common.white, marginBottom: 2 }} onClick={handleSubmit(onSubmit)}>
            Register
          </Button>
          <Button onClick={()=> navigate('/login')} variant='outlined' fullWidth sx={{ mb: 5 }}>Back to Login</Button>
          {/* <Link href="/login" sx={{ mb: 3, mt: 2, color: theme.palette.dark.main, textDecoration: 'none' }}>
            Login
          </Link> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
