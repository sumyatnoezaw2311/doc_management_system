import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Box, Typography } from '@mui/material';
import theme from '../../utils/theme';

const AlertDialog = ({toggle,setToggle,cancel,confrim,content,title,type})=>{
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setToggle(false)
  };

  React.useEffect(()=>{
    setOpen(toggle)
  },[toggle])

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <AnnouncementIcon sx={{ mr: 2 }} color={type}/>
                <Typography align='center' variant='h5' sx={type === 'danger' ? { color: theme.palette.danger.main } : type === 'info' ? {color : theme.palette.info.main } : {color : theme.palette.warning.main }}>{title}</Typography>
            </Box>
        </DialogTitle>
        <DialogContent sx={{ width: 350 }}>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3 }}>
          <Button color={type} onClick={cancel}>Cancel</Button>
          <Button color={type} onClick={confrim} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


export default AlertDialog