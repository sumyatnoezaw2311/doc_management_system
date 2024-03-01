import React from 'react';
import { Grid, TextField, Box, Typography, Button } from '@mui/material';
import cloverLogo from '../../assets/images/clover.png';
import theme from '../../utils/theme';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { forgotPassword } from '../../slices/auth/authSlice';

const accountSchema = Yup.object().shape({
    email: Yup.string().email('Email ဖြည့်ပါ').required('Email ဖြည့်ပါ'),
});

const ForgotPassword = () => {
    // const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(accountSchema),
    });

    const onSubmit = async (data) => {
        await dispatch(forgotPassword(data))
        reset()
        // navigate('/login')
    };

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 15 }}>
      <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img width={200} src={cloverLogo} loading="lazy" alt="Clover Logo" />
          <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }} marginTop={2} marginBottom={2}>
            Forgot Password
          </Typography>
          <Box sx={{ width: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <TextField {...register('email')} error={!!errors?.email} helperText={errors?.email?.message} sx={{ my: 3 }} id="email" label="Email" variant="outlined" />
          </Box>
          <Button variant="contained" fullWidth sx={{ color: theme.palette.common.white, marginBottom: 2 }} onClick={handleSubmit(onSubmit)}>
              Submit
          </Button>
          <RouterLink to={"/login"}>
            <Typography sx={{ color: theme.palette.secondary.dark}} variant='body2'>Back to Login</Typography>
          </RouterLink>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
