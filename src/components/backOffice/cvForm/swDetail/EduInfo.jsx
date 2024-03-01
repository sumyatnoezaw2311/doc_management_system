import React, { useState } from 'react'
import { Box, Grid, IconButton, Typography } from '@mui/material';
import CvListItem from '../../../main/CvListItem';
import { DriveFileRenameOutline } from '@mui/icons-material';
import HsEdit from '../swEdit/HsEdit';
import UniEdit from '../swEdit/UniEdit';

const EduInfo = ({cv}) => {

  const [ editHsOpen,setEditHsOpen ] = useState(false)
  const [ editUniOpen,setEditUniOpen ] = useState(false)
        
  return (
            <Grid container columns={{ md: 12 }}>
              <HsEdit open={editHsOpen} setOpen={setEditHsOpen}></HsEdit>
              <UniEdit open={editUniOpen} setOpen={setEditUniOpen}></UniEdit>
              <Grid item md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Hight School</Typography>
                  <IconButton
                    onClick={() => setEditHsOpen(true) }
                    size="small"
                    variant="outlined"
                    color="warning"
                  >
                    <DriveFileRenameOutline />
                  </IconButton>
                </Box>
                <CvListItem primary="Name" value={cv.hs_name}></CvListItem>
                <CvListItem primary="Hight School End" value={cv.hs_end}></CvListItem>
                <Typography sx={{ fontWeight: 'bold', mt: 3 }}></Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 'bold' }}>University</Typography>
                  <IconButton
                    onClick={() => setEditUniOpen(true) }
                    size="small"
                    variant="outlined"
                    color="warning"
                  >
                    <DriveFileRenameOutline />
                  </IconButton>
                </Box>
                <CvListItem primary="University Name" value={cv.uni_name}></CvListItem>
                <CvListItem primary="Major" value={cv.major}></CvListItem>
                <CvListItem primary="Start - End" value={`${cv.uni_start} ~ ${cv.uni_end}`}></CvListItem>
                <CvListItem primary="Is Graduated" value={`${cv.is_graduated === '1' ? "Graduated" : "Ungraduated"}`}></CvListItem>
                {
                    cv.last_attended_year && <CvListItem primary="Last attended year" value={cv.last_attended_year}></CvListItem>
                }
              </Grid>
            </Grid>
  )
}

export default EduInfo