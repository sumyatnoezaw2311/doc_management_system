import * as React from 'react';
import Box from '@mui/material/Box';
import { CssBaseline, Grid } from '@mui/material';
import ApplicationBar from '../main/AppBar';
import SideBar from '../main/SideBar';
import Header from '../main/Header';

const AdminLayout = (props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ApplicationBar />
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{
              position: 'relative',
              top: 170,
              overflow: 'auto',
            }}>
              {props.children}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AdminLayout;
