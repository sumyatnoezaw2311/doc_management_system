import React from 'react';
import { Grid, TextField, Box, Typography, Button } from '@mui/material';
import cloverLogo from '../../assets/images/clover.png';
import theme from '../../utils/theme';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

// const accountSchema = Yup.object().shape({
//   password: Yup.string().required("Password is required!").min(6,"Password must have at least 6 characters!"),
//   confirm_password: Yup.string().required("Password is required!").min(6,"Password must have at least 6 characters!").oneOf([Yup.ref('password'), null], 'Confirm password must match with password!'),
// });

const ResetPassword = () => {
  const oneTimeToken = useParams().oneTimeToken;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const resetLoading = useSelector(state=> state.resetPassword.loading)
  // const { loading: verifyLoading, data: verifyData, error: verifyError } = useSelector(state=> state.verifyToken)
  const passwordsSchema = Yup.object().shape({
      password:Yup.string().required("Password is required!").min(6,"Password must have at least 6 characters!"),
      confirm_password: Yup.string().required("Password is required!").min(6,"Password must have at least 6 characters!").oneOf([Yup.ref('password'), null], 'Confirm password must match with password!'),
  })

  const { register,handleSubmit,formState: {errors}} = useForm({
      resolver : yupResolver(passwordsSchema),
  })
  
  // const checkToken = async ()=>{
  //     await dispatch(verifyToken(oneTimeToken))
  // }

  const onSubmit = async(data)=>{
    console.log(data);
      // if(verifyData && verifyData.data){
      //     const resetData = {
      //         email: verifyData.data.email,
      //         ...data
      //     }
      //     await dispatch(resetPassword({resetData: resetData, oneTimeToken: oneTimeToken}));
      //     navigate('/login')
      // }
  }

  // useEffect(()=>{
  //     checkToken()
  // },[])

  // useEffect(()=>{
  //     if(verifyError){
  //         navigate('/login')
  //     }        
  // },[verifyError])

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 15 }}>
      <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img width={200} src={cloverLogo} loading="lazy" alt="Clover Logo" />
          <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }} marginTop={2} marginBottom={2}>
            Reset Your Password
          </Typography>
          <Box sx={{ width: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <TextField {...register('password')} error={!!errors?.password} helperText={errors?.password?.message} sx={{ my: 3 }} id="password" label="Password" variant="outlined" />
            <TextField {...register('confirm_password')} error={!!errors?.confirm_password} helperText={errors?.confirm_password?.message} sx={{ mb: 3 }} id="confirm_password" label="Confrim Password" variant="outlined" />
          </Box>
          <Button variant="contained" fullWidth sx={{ color: theme.palette.common.white, mb: 3 }} onClick={handleSubmit(onSubmit)}>
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

export default ResetPassword;
