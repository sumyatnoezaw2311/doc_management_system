import React, { useEffect, useState } from 'react'
import cloverLogo from '../../assets/images/clover-rm-bg.png'
import PersonIcon from '@mui/icons-material/Person';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import {AppBar,Toolbar,Typography,Box, Menu, MenuItem, IconButton, Paper, Avatar, Button } from '@mui/material';
import theme from '../../utils/theme';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../utils/AlertDialog';
// import NotificationDot from '../utils/NotificationDot';
// import SaveAltIcon from '@mui/icons-material/SaveAlt';

const customBoxShadow = "0px 2px 10px rgba(0, 0, 0, 0.10)"

const ApplicationBar = () => {

  const [ alertToggle,setAlertToggle ] = useState(false)
  // const [auth, setAuth] = React.useState(true);
  const profileData = useSelector(state=> state.User.profile?.data)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleCancelAlert =()=>{
    setAlertToggle(false)
  }

  const handleConfirmAlert = ()=>{
    localStorage.removeItem('cmauth2023')
    setAlertToggle(false)
    navigate('/login')
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = ()=>{
    setAlertToggle(true)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#fff", boxShadow: customBoxShadow, paddingX: 2 }}>
        <AlertDialog type={'warning'} cancel={handleCancelAlert} confrim={handleConfirmAlert} toggle={alertToggle} setToggle={setAlertToggle} title={"Are you sure!"} content={"You want to logout from this account"}></AlertDialog>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              <img
                  height={70}
                  src={`${cloverLogo}`}
                  alt={"Clover Mandalay"}
                  loading="lazy"
              />
              <Typography sx={{ fontWeight: 'bold', fontFamily: 'Lato', textTransform: 'uppercase', marginLeft: 2 }} variant="h6" noWrap component="div">
                  Clover Mandalay
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              {/* <Paper elevation={3} sx={{ marginRight: 2 }}>
                <IconButton sx={{ borderRadius: "0px" }}>
                  <Badge badgeContent={4} color="info">
                    <SaveAltIcon sx={{ fontSize: "26px", color: theme.palette.dark.main }} />
                  </Badge>
                </IconButton>
              </Paper> */}
              {/* <Paper elevation={3} sx={{ marginRight: 2 }}>
                <IconButton sx={{ borderRadius: "0px" }}>
                  <NotificationsIcon sx={{ fontSize: "26px", color: theme.palette.dark.main }} />
                  <NotificationDot />
                </IconButton>
              </Paper> */}
              <Paper elevation={3}>
                <IconButton
                    sx={{ borderRadius: "0px"}}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                  <PersonIcon sx={{ fontSize: "26px", color: theme.palette.dark.main}} />
                </IconButton>
              </Paper>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar/>
                    <Typography sx={{ mt: 2 }} >{profileData?.name}</Typography>
                    <Typography sx={{ mt: 1 }} variant='body2'>Email : {profileData?.email}</Typography>
                    
                  </Box>
                </MenuItem>
                <MenuItem onClick={()=>handleLogout()} sx={{ p: 0 }}>
                  <Box sx={{ p: 2 ,bgcolor: '#fff', width: '100%' }}>
                    <Button variant='contained' sx={{ textAlign: 'center', color: theme.palette.common.white }} color='warning' fullWidth>Log Out</Button>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default ApplicationBar
