import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemAvatar, Box, Avatar, IconButton, Alert, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../../utils/theme';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const JobsList = ({ listItems, setListItems }) => {
  const path = useLocation().pathname;
  const step7Data = useSelector((state) => state.TitSswCv.step7Data);
  const [jobs, setJobs] = useState([]);

  const handleDelete = (id) => {
    const filteredItems = jobs.filter((item) => item.id !== id);
    setJobs(filteredItems);
    setListItems(filteredItems);
  };

  useEffect(() => {
    setJobs(listItems);
  }, [listItems]);

  useEffect(() => {
    if (step7Data) {
      setJobs(step7Data);
    }
  }, [step7Data]);

  return (
    <List>
      {jobs.length === 0 ? (
        <Alert severity="warning">အလုပ်မှတ်တမ်းများမရှိသေးပါ။</Alert>
      ) : (
        jobs.map((listItem, index) => (
          <ListItem key={index} secondaryAction={ !path.includes('/confirmation') && (
            <IconButton onClick={() => handleDelete(listItem.id)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          )}>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="p" sx={{ fontSize: '18px', textTransform: 'capitalize' }}>{listItem.position}</Typography>
              <Typography variant="p" sx={{ color: theme.palette.secondary.main, fontSize: '14px', textTransform: 'capitalize' }}>{!path.includes('/confirmation') ? listItem.name : listItem.company_name}</Typography>
              <Typography variant="p" sx={{ color: theme.palette.secondary.main, fontSize: '14px', textTransform: 'capitalize' }}>{listItem.location}</Typography>
              <Typography variant="p" sx={{ color: theme.palette.secondary.main, fontSize: '14px', textTransform: 'capitalize' }}>{!path.includes('/confirmation') ? listItem.job_category : listItem.business_type}</Typography>
              <Typography variant="p" sx={{ color: theme.palette.secondary.main, fontSize: '14px', textTransform: 'capitalize' }}>{!path.includes('/confirmation') ? `${listItem.start_date}~${listItem.end_date}` : `${listItem.start}~${listItem.end}`}</Typography>
            </Box>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default JobsList;
