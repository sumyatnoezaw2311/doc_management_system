import React, { useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box ,Paper , Tab } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCvById } from '../../../slices/backOffice/cvFromSlice';
import PersonalInfo from '../../../components/backOffice/cvForm/swDetail/PersonalInfo';
import EduInfo from '../../../components/backOffice/cvForm/swDetail/EduInfo';
import Skill from '../../../components/backOffice/cvForm/swDetail/Skill';
import Experience from '../../../components/backOffice/cvForm/swDetail/Experience';
import Children from '../../../components/backOffice/cvForm/swDetail/Children';
import Loading from '../../../components/utils/Loading';

const CvDetailSw = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const cvData = useSelector((state) => state.CvForm.cv);
  const cvLoading = useSelector((state) => state.CvForm.loading);
  const [value, setValue] = useState('1');
  const [cv, setCv] = useState(null);


  const getData = async () => {
    await dispatch(getCvById({ type: 'sw', id: id }));
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
  }, []);

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
              <Tab label="Skill" value="3" />
              <Tab label="Experiences" value="4" />
              <Tab label="Children" value="5" />
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
              cv && <Skill cv={cv}></Skill>
            }
          </TabPanel>
          <TabPanel value="4">
            {
              cv && <Experience cv={cv}></Experience>
            }
          </TabPanel>
          <TabPanel value="5">
            {
              cv && <Children cv={cv}></Children>
            }
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  )
}

export default CvDetailSw