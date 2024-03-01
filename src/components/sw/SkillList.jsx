import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { List,ListItem,ListItemAvatar,ListItemText,Avatar,IconButton,Alert } from '@mui/material'
import PsychologyIcon from '@mui/icons-material/Psychology';
import DeleteIcon from '@mui/icons-material/Delete';


const SkillList = ({listItems,getListItems}) => {
  const path = useLocation().pathname;
  const [ skills,setSkills ] = React.useState([])

  const handleDelete = (id)=>{
    const filteredItems = skills.filter(item=> item.id !== id)
    setSkills(filteredItems)
    getListItems(filteredItems)
  }

  React.useEffect(()=>{
    setSkills(listItems)
  },[listItems])

  return (
      <List>
            {
              skills?.length === 0 ?
              <Alert severity="warning">No skill information yet</Alert>
              :
              skills?.map((listItem,index)=>
                <ListItem key={index} 
                    secondaryAction={
                      !path.includes('/confirmation') &&
                      <IconButton onClick={()=> handleDelete(listItem.id)} edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PsychologyIcon />
                      </Avatar>
                    </ListItemAvatar>
                        <ListItemText
                          sx={{ flexWrap: 'wrap' }}
                          primary={listItem.name}
                          secondary={`${listItem.year_month}`}
                        />
                  </ListItem>
              )
            }
      </List>
  );
}


export default SkillList