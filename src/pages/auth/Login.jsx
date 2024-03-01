import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  Grid,
  TextField,
  Box,
  Typography,
  Button,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { loginUser } from '../../slices/auth/authSlice';
import cloverLogo from '../../assets/images/clover.png'
import theme from '../../utils/theme';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

const Login = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (formData) => {
    const userLogin = await dispatch(loginUser(formData));
    if (userLogin.meta.requestStatus === 'fulfilled' && userLogin.payload.data.is_admin === 0) {
      navigate('/');
    }else if(userLogin.meta.requestStatus === 'fulfilled' && userLogin.payload.data.is_admin === 1){
      navigate('/back-office/pending-list');
    }
  };

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
      <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', p: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '350px' }}>
          <img alt="clover mandalay" width={200} src={cloverLogo} loading="lazy" />
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
            marginTop={4}
            marginBottom={3}
          >
            Login To Your Account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ width: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <TextField
                {...register('email')}
                error={!!errors.email}
                helperText={errors?.email?.message}
                sx={{ marginY: 3 }}
                id="email"
                label="Email"
                variant="outlined"
              />
              <FormControl error={!!errors.password} sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  {...register('password')}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {errors?.password && (
                  <FormHelperText sx={{ color: 'red' }}>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Button disabled={loading} type="submit" variant="contained" fullWidth sx={{ color: 'white', marginY: 3 }}>
                {loading ? <CircularProgress sx={{ color: theme.palette.dark.main, ml: 2 }} size={20} /> : "Login"}
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <RouterLink to={"/register"}>
                  <Typography sx={{ color: theme.palette.secondary.dark}} variant='body2'>Create Account</Typography>
                </RouterLink>
                <RouterLink to={"/forgot-password"}>
                  <Typography sx={{ color: theme.palette.secondary.dark}} variant='body2'>Forgot Password?</Typography>
                </RouterLink>
              </Box>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
