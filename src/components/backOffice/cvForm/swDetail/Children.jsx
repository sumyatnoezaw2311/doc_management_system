import React, { Fragment, useEffect, useState } from 'react'
import { Alert, Box, IconButton, Link, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AddBox, Delete, DriveFileRenameOutline } from '@mui/icons-material';
import { deleteChild, getCvById } from '../../../../slices/backOffice/cvFromSlice';
import AddChild from '../swEdit/AddChild';
import EditChild from '../swEdit/EditChild';
import AlertDialog from '../../../utils/AlertDialog';

const Children = ({cv}) => {   
    
    const dispatch = useDispatch()
    const [ addOpen,setAddOpen ] = useState(false)
    const [ editOpen,setEditOpen ] = useState(false)
    const [ oldData,setOldData ] = useState(null)
    const [alertToggle, setAlertToggle] = useState(false);
    const [idToDel, setIdToDel] = useState(null);
    const data = useSelector(state=> state.CvForm.data)
    
    const handleEdit = (childId)=>{
        if(cv && childId){
            const currentEdit = cv.children_data.filter((child)=> child.id === childId)
            setOldData(currentEdit)
            setEditOpen(true)
        }
    }

    const handleCancelAlert = () => {
        setAlertToggle(false);
    };
    
    const handleConfirmAlert = async () => {
        setAlertToggle(false);
        await dispatch(deleteChild(idToDel))
    };

    const handleDelete  = async (skillId)=>{
        if(cv && skillId){
           setAlertToggle(true)
           setIdToDel(skillId)
        }
    }

    useEffect(()=>{
        dispatch(getCvById({ type: 'sw', id: cv.id }))
    },[data])
    
  return (
    <Box sx={{ width: 1 }}>
        <AlertDialog
            type={'danger'}
            cancel={handleCancelAlert}
            confrim={handleConfirmAlert}
            toggle={alertToggle}
            setToggle={setAlertToggle}
            title={"Are you sure!"}
            content={"You want to delete this item."}
        />
        <AddChild open={addOpen} setOpen={setAddOpen} cvId={cv.id}></AddChild>
        <EditChild open={editOpen} setOpen={setEditOpen} oldData={oldData}></EditChild>
        <Box display="grid" gridTemplateColumns="repeat(8, 1fr)" gap={2}>
        {
            cv.children_data.length > 0 ?
            cv.children_data.map((child,index)=>
                <Fragment key={index}>
                    <Box gridColumn="span 2" sx={{ height: '100%' }}>
                        <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                            <Typography sx={{ textAlign: "center" }}>{index+1} . Name(Burmese)</Typography>
                            <Typography color="text.secondary" sx={{ textAlign: "center" }}>{child.name_mm}</Typography>    
                        </Paper>
                    </Box>
                    <Box gridColumn="span 2">
                        <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                            <Typography sx={{ textAlign: "center" }}>Age</Typography>
                            <Typography color="text.secondary" sx={{ textAlign: "center" }}>{child.age}</Typography>    
                        </Paper>
                    </Box>
                    <Box gridColumn="span 2">
                        <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                            <Typography sx={{ textAlign: "center" }}>NRC NO (Burmese)</Typography>
                            <Typography color="text.secondary" sx={{ textAlign: "center" }}>{child.nrc_mm ? child.nrc_mm : "No national registration"}</Typography>    
                        </Paper>
                    </Box>
                    <Box gridColumn="span 2">
                            <Paper elevation={3} sx={{ py: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end', p: 2 }}>
                                { index === cv.children_data.length - 1 &&
                                    <IconButton onClick={()=> setAddOpen(true) } edge="end" aria-label="edit" sx={{ mr: 1 }}>
                                        <AddBox color='info' />
                                    </IconButton>
                                }
                                <IconButton onClick={()=> handleEdit(child.id) } edge="end" aria-label="edit" sx={{ mr: 1 }}>
                                <DriveFileRenameOutline color='warning' />
                                    </IconButton>
                                <IconButton onClick={()=> handleDelete(child.id)} edge="end" aria-label="delete">
                                    <Delete color='danger' />
                                </IconButton>      
                            </Paper>
                    </Box>
                </Fragment>
            )
            :
            <Box gridColumn="span 12">
                <Paper elevation={3}>
                    <Alert severity="warning">There is no children! <Link onClick={()=> setAddOpen(true)} sx={{ cursor: 'pointer', ml: 3 }}>Add Child</Link></Alert>
                </Paper>
            </Box>
        }
        </Box>
    </Box>
  )
}

export default Children