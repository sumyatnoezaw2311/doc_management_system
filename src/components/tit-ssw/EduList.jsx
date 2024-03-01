import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, Alert } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const EduList = ({ listItems, getListItems }) => {
  const path = useLocation().pathname;
  const step6Data = useSelector((state) => state.TitSswCv.step6Data);
  const [edus, setEdus] = useState([]);

  const handleDelete = (id) => {
    const filteredItems = edus.filter((item) => item.id !== id);
    setEdus(filteredItems);
    getListItems(filteredItems);
  };

  useEffect(() => {
    setEdus(listItems);
  }, [listItems]);

  useEffect(() => {
    if (step6Data) {
      setEdus(step6Data);
    }
  }, [step6Data]);

  return (
    <List>
      {edus.length <= 0 ? (
        <Alert severity="warning">အခြားတက်ရောက်ခဲ့သောကျောင်းများမရှိသေးပါ။</Alert>
      ) : (
        edus.map((listItem, index) => (
          <ListItem key={index} secondaryAction={!path.includes('/confirmation') && (
            <IconButton onClick={() => handleDelete(listItem.id)} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          )}>
            <ListItemAvatar>
              <Avatar>
                <SchoolIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ flexWrap: 'wrap' }}
              primary={listItem.name}
              secondary={`${listItem.start} ~ ${listItem.end}`}
            />
          </ListItem>
        ))
      )}
    </List>
  );
};

export default EduList;
