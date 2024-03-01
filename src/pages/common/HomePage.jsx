import React, { useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import cloverLogo from '../../assets/images/clover.png'
import theme from '../../utils/theme';
import { useDispatch, useSelector } from 'react-redux';
import { getCvStatus } from '../../slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const dispatch = useDispatch()
  const profileData = useSelector(state=>state.User.profile)
  const status = useSelector(state=> state.User.cvStatus)
  const navigate = useNavigate()

  const getStatus = async (id)=>{
    dispatch(getCvStatus(id))
  }

  const handleClick = ()=>{
    if(status && profileData){
      const cvStatus = status.data.status
      //cv မဖြည့်ရသေး
      if(profileData.data.is_admin === 1){
        navigate('/back-office/pending-list')
      }else if(cvStatus === false && profileData.data.account_status === 'accept' && profileData.data.is_engineer === 0){
        navigate('/create-cv/tit-ssw/1')
      }else if(cvStatus === false && profileData.data.account_status === 'accept' && profileData.data.is_engineer === 1){
        navigate('/create-cv/sw/1')
      }else if(cvStatus === false && profileData.data.account_status === 'pending'){
        navigate('/after-register')
      }else if(cvStatus === true){
        //cv ဖြည့်ပြီး
        navigate('/edit-pr')
      }
    }
  }

  useEffect(()=>{
    if(profileData){
      getStatus(profileData.data.id)
      // profileData.data.is_admin === '1' && navigate('/back-office/pending-list')
    }
  },[profileData])

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <img
        style={{ width: '250px' }}
        src={cloverLogo}
        alt="Hero Image"
      />
      <Typography sx={{ mt: 3, mb: 1 }}  color='darkgray' >Hello, { profileData?.data?.name }</Typography>
      <Typography sx={{ mb: 2 }} color='darkgray' >Welcome to Clover Mandalay</Typography>
      <Button
        onClick={()=> handleClick() } 
        variant="contained"
        color="primary"
        sx={{
          marginTop: 2,
          color: theme.palette.common.white
        }}
      >
        {profileData?.data?.is_admin === 1 ? "Go To Admin Panel" : "Let's create your cv form"}
      </Button>
    </Container>
  );
};
export default HomePage;
