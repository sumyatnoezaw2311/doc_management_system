import React, { useEffect, useState } from 'react'
import { Box, Grid, IconButton, List, Typography } from '@mui/material';
import CvListItem from '../../../main/CvListItem';
import DriveFileRenameOutline from '@mui/icons-material/DriveFileRenameOutline';
import PSchoolEdit from '../titsswEdit/PSchoolEdit';
import MSchoolEdit from '../titsswEdit/MSchoolEdit';
import HSchoolEdit from '../titsswEdit/HSchoolEdit';
import JpAndMatricEdit from '../titsswEdit/JpAndMatricEdit';
import { transform } from '../../../../utils/transformsrc';
import { useDispatch, useSelector } from 'react-redux';
import { getOldData } from '../../../../slices/backOffice/updateTitsswslice';
import UniEdit from '../titsswEdit/UniEdit';

const EduInfo = ({cv}) => {

  const dispatch = useDispatch()
  const [ psOpen,setPsOpen ] = useState(false)
  const [ msOpen,setMsOpen ] = useState(false)
  const [ hsOpen,setHsOpen ] = useState(false)
  const [ uniEditOpen,setUniEditOpen ] = useState(false)
  const profile = useSelector((state) => state.User?.profile?.data);
  const [ jPAndMatricOpen,setJpAndMarticOpen ] = useState(false)

  
  const setOldData = async (oldData) => {
    if (oldData && profile) {
      const base64Photo = await transform(oldData.photo);
      const base64QrPhoto = await transform(oldData.qr_photo);
      await dispatch(
        getOldData({
          ...oldData,
          ...{ user_id: Number(oldData.user_id), photo: base64Photo, qr_photo: base64QrPhoto },
        })
      );
    }
  };

  useEffect(() => {
    if (cv) {
      setOldData(cv)
    }
  }, [cv,profile]);
      
  return (
    <Grid container gap={3} columns={{ md: 10 }}>
        <PSchoolEdit open={psOpen} setOpen={setPsOpen}></PSchoolEdit>
        <MSchoolEdit open={msOpen} setOpen={setMsOpen}></MSchoolEdit>
        <HSchoolEdit open={hsOpen} setOpen={setHsOpen}></HSchoolEdit>
        <UniEdit open={uniEditOpen} setOpen={setUniEditOpen}></UniEdit>
        <JpAndMatricEdit open={jPAndMatricOpen} setOpen={setJpAndMarticOpen}></JpAndMatricEdit>
        <Grid item md={3}>
        <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Typography sx={{ fontWeight: 'bold' }}>Primary School</Typography>
              <IconButton
                onClick={() => setPsOpen(true) }
                size="small"
                variant="outlined"
                color="warning"
              >
                <DriveFileRenameOutline />
              </IconButton>
            </Box>
            <CvListItem primary="Name" value={cv.ps_name}></CvListItem>
            <CvListItem primary="Start - End" value={`${cv.ps_start} ~ ${cv.ps_end}`}></CvListItem>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Typography sx={{ fontWeight: 'bold' }}>Middle School</Typography>
              <IconButton
                onClick={() => setMsOpen(true) }
                size="small"
                variant="outlined"
                color="warning"
              >
                <DriveFileRenameOutline />
              </IconButton>
            </Box>
            <CvListItem primary="Name" value={cv.ms_name}></CvListItem>
            <CvListItem primary="Start - End" value={`${cv.ms_start} ~ ${cv.ms_end}`}></CvListItem>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Typography sx={{ fontWeight: 'bold' }}>Hight School</Typography>
              <IconButton
                onClick={() => setHsOpen(true) }
                size="small"
                variant="outlined"
                color="warning"
              >
                <DriveFileRenameOutline />
              </IconButton>
            </Box>
            <CvListItem primary="Name" value={cv.hs_name ? cv.hs_name : "Data မရှိပါ"}></CvListItem>
            <CvListItem primary="Start - End" value={cv.hs_start && cv.hs_end ? `${cv.hs_start} ~ ${cv.hs_end}` : "Data မရှိပါ"}></CvListItem>
        </List>
        </Grid>
        <Grid item md={3}>
          <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Typography sx={{ fontWeight: 'bold' }}></Typography>
                <IconButton
                  onClick={() => setJpAndMarticOpen(true) }
                  size="small"
                  variant="outlined"
                  color="warning"
                >
                  <DriveFileRenameOutline />
                </IconButton>
              </Box>
              <CvListItem primary="Japanese Level" value={cv.japanese_level}></CvListItem>
              <CvListItem primary="Matriculation" value={`${cv.matric_passed === '1' ? "Passed" : "Failed"}`}></CvListItem>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                <Typography sx={{ fontWeight: 'bold' }}>University</Typography>
                <IconButton
                  onClick={() => setUniEditOpen(true) }
                  size="small"
                  variant="outlined"
                  color="warning"
                >
                  <DriveFileRenameOutline />
                </IconButton>
              </Box>
              <CvListItem primary="University Name" value={cv.uni_name ? cv.uni_name : "Data မရှိပါ"}></CvListItem>
              <CvListItem primary="Start - End" value={cv.uni_start && cv.uni_end ? `${cv.uni_start} ~ ${cv.uni_end}` : "Data မရှိပါ"}></CvListItem>
              <CvListItem primary="Is Graduated" value={cv.is_graduated ? `${cv.is_graduated === '卒業' ? "Graduated" : "Ungraduated"}` : "Data မရှိပါ"}></CvListItem>
              <CvListItem primary="Major" value={cv.major ? cv.major : "Data မရှိပါ"}></CvListItem>
              {
                cv.last_attended_year && <CvListItem primary="Last attended year" value={cv.last_attended_year ? cv.last_attended_year : "Data မရှိပါ"}></CvListItem>
              }
          </List>
        </Grid> 
    </Grid>
  )
}

export default EduInfo