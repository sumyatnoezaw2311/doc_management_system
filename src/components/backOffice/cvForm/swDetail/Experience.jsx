import React, { Fragment, useEffect, useState } from 'react'
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWorkExp, getCvById } from '../../../../slices/backOffice/cvFromSlice';
import { AddBox, Delete, DriveFileRenameOutlineRounded } from '@mui/icons-material';
import WorkExpAdd from '../swEdit/WorkExpAdd';
import WorkExpEdit from '../swEdit/WorkExpEdit';
import AlertDialog from '../../../utils/AlertDialog';

const Experience = ({cv}) => {
    
    const dispatch = useDispatch()
    const [ isOpen,setIsOpen ] = useState(false)
    const [ addOpen,setAddOpen ] = useState(false)
    const [ oldData,setOldData ] = useState(null)
    const [alertToggle, setAlertToggle] = useState(false);
    const [idToDel, setIdToDel] = useState(null);
    const data = useSelector(state=> state.CvForm.data)
    
    const handleEdit = (expId)=>{
        if(cv && expId){
            const currentEdit = cv.work_exp_data.filter((exp)=> exp.id === expId)
            setOldData(currentEdit)
            setIsOpen(true)
        }
    }

    const handleCancelAlert = () => {
        setAlertToggle(false);
    };
    
    const handleConfirmAlert = async () => {
        setAlertToggle(false);
        await dispatch(deleteWorkExp({ type: 'sw', id: idToDel}))
    };

    const handleDelete  = async (expId)=>{
        if(cv && expId){
            setAlertToggle(true);
            setIdToDel(expId)
        }
    }

    useEffect(()=>{
        dispatch(getCvById({ type: 'sw', id: cv.id }))
    },[data])
    
  return (
    <Box sx={{ width: 1 }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <AlertDialog
                type={'danger'}
                cancel={handleCancelAlert}
                confrim={handleConfirmAlert}
                toggle={alertToggle}
                setToggle={setAlertToggle}
                title={"Are you sure!"}
                content={"You want to delete this item."}
            />
            <WorkExpAdd open={addOpen} setOpen={setAddOpen} cvId={cv.id}></WorkExpAdd>
            <WorkExpEdit open={isOpen} setOpen={setIsOpen} oldData={oldData}></WorkExpEdit>
            {
                cv.work_exp_data.map((work,index)=>
                <Fragment key={index}>
                    <Box gridColumn="span 2" sx={{ height: '100%' }}>
                        <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                            <Typography sx={{ textAlign: "center" }}>{index+1} . Position</Typography>
                            <Typography color="text.secondary" sx={{ textAlign: "center" }}>{work.position}</Typography>    
                        </Paper>
                    </Box>
                    <Box gridColumn="span 2">
                        <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                            <Typography sx={{ textAlign: "left", pl: 1 }}>Company</Typography>
                            <Typography color="text.secondary" variant='body2' sx={{ textAlign: "left", pl: 1 }}>{work.company}</Typography>
                            <Typography sx={{ textAlign: "left", pl: 1 }}>Business Type</Typography>
                            <Typography color="text.secondary" variant='body2' sx={{ textAlign: "left", pl: 1 }}>{work.business_type}</Typography>  
                        </Paper>
                    </Box>
                    <Box gridColumn="span 1">
                        <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                            <Typography sx={{ textAlign: "center" }}>Duration</Typography>
                            <Typography color="text.secondary" variant='body2' sx={{ textAlign: "center" }}>{work.start} <br/> {work.end}</Typography>    
                        </Paper>
                    </Box>
                    <Box gridColumn="span 3">
                        <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                            <Typography sx={{ textAlign: "left", pl: 1 }}>Responsibilities</Typography>
                            <Typography color="text.secondary" variant='body2' sx={{ textAlign: "left", pl: 1 }}>{work.responsibilities}</Typography>    
                        </Paper>
                    </Box>
                    <Box gridColumn="span 2">
                        <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                            <Typography sx={{ textAlign: "left", pl: 1 }}>Reason of leaving</Typography>
                            <Typography color="text.secondary" variant='body2' sx={{ textAlign: "left", pl: 1 }}>{work.reason_of_leaving}</Typography>    
                        </Paper>
                    </Box>
                    <Box gridColumn="span 2">
                        <Paper elevation={3} sx={{ py: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end', p: 2 }}>
                            { index === cv.work_exp_data.length - 1 &&
                                <IconButton onClick={()=> setAddOpen(true) } edge="end" aria-label="edit" sx={{ mr: 1 }}>
                                    <AddBox color='info' />
                                </IconButton>
                            }
                            <IconButton onClick={()=> handleEdit(work.id) } edge="end" aria-label="edit" sx={{ mr: 1 }}>
                                <DriveFileRenameOutlineRounded color='warning' />
                            </IconButton>
                            {
                                cv.work_exp_data.length > 1 &&
                                <IconButton onClick={()=> handleDelete(work.id)} edge="end" aria-label="delete">
                                    <Delete color='danger' />
                                </IconButton>
                            }     
                        </Paper>
                    </Box>
                </Fragment>
            )}
        </Box>
    </Box>
  )
}

export default Experience