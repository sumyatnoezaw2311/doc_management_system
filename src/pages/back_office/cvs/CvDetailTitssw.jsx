import React, { useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box ,Paper , Tab } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCvById } from '../../../slices/backOffice/cvFromSlice';
import PersonalInfo from '../../../components/backOffice/cvForm/titsswDetail/PersonalInfo';
import EduInfo from '../../../components/backOffice/cvForm/titsswDetail/EduInfo';
import WorkExp from '../../../components/backOffice/cvForm/titsswDetail/WorkExp';
import FamilyMember from '../../../components/backOffice/cvForm/titsswDetail/FamilyMember';
import OtherEdu from '../../../components/backOffice/cvForm/titsswDetail/OtherEdu';
import Loading from '../../../components/utils/Loading';

const CvDetailTitssw = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const cvData = useSelector((state) => state.CvForm.cv);
  const cvLoading = useSelector((state) => state.CvForm.loading);
  const [value, setValue] = useState('1');
  const [cv, setCv] = useState(null);

  const getData = async () => {
    await dispatch(getCvById({ type: 'titssw', id: id }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (cvData) {
      setCv(cvData)
    }
  }, [cvData]);

  useEffect(() => {
    getData();
  },[]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', px: 1, minHeight: '100vh', borderRadius: 0 }}>
      {
        cvLoading && <Loading/>
      }
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Personal Info" value="1" />
              <Tab label="Education" value="2" />
              <Tab label="Other Attended Courses" value="5" />
              <Tab label="Work Experiences" value="3" />
              <Tab label="Family" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {
              cv && <PersonalInfo cv={cv}></PersonalInfo>
            }
          </TabPanel>
          <TabPanel value="2">
            {
              cv && <EduInfo cv={cv}></EduInfo>
            }
          </TabPanel>
          <TabPanel value="3">
            {
              cv && <WorkExp cv={cv}></WorkExp>
            }
          </TabPanel>
          <TabPanel value="4">
            {
              cv && <FamilyMember cv={cv}></FamilyMember>
            }
          </TabPanel>
          <TabPanel value="5">
            {
              cv && <OtherEdu cv={cv}></OtherEdu>
            }
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  )
}

export default CvDetailTitssw