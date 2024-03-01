import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, Typography, Avatar, IconButton, Alert, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../../utils/theme';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const FamilyMembersList = ({ listItems, setListItems }) => {
  const path = useLocation().pathname;
  const [members, setMembers] = useState([]);
  const step8Data = useSelector((state) => state.TitSswCv.step8Data);

  const handleDelete = (id) => {
    const filteredMembers = members.filter((member) => member.id !== id);
    setMembers(filteredMembers);
    setListItems(filteredMembers);
  };

  useEffect(() => {
    setMembers(listItems);
  }, [listItems]);

  useEffect(() => {
    if (step8Data) {
      setMembers(step8Data);
    }
  }, [step8Data]);

  return (
    <List>
      {members.length === 0 ? (
        <Alert severity="warning">မိသားစုဝင်များမရှိသေးပါ။</Alert>
      ) : (
        members.map((listItem, index) => (
          <ListItem key={index} secondaryAction={!path.includes('/confirmation') && (
            <IconButton onClick={() => handleDelete(listItem.id)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          )}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {['name', 'age', 'relation', 'job', 'address'].map((key) => (
                <Typography key={key} variant="p" sx={{ color: key === 'name' ? undefined : theme.palette.secondary.main, fontSize: '14px', textTransform: 'capitalize' }}>
                  {listItem[key]}
                  {key === 'age' && 'နှစ်'}
                </Typography>
              ))}
            </Box>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default FamilyMembersList;
