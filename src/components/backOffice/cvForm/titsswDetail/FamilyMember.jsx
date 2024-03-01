import React, { Fragment, useEffect, useState } from 'react'
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { AddBox, Delete, DriveFileRenameOutline } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFamilyMember, getCvById } from '../../../../slices/backOffice/cvFromSlice';
import MemberAdd from '../titsswEdit/MemberAdd';
import MemberEdit from '../titsswEdit/MemberEdit';
import AlertDialog from '../../../utils/AlertDialog';

const FamilyMember = ({cv}) => {    

    const dispatch = useDispatch()
    const [ isOpen,setIsOpen ] = useState(false)
    const [ addOpen,setAddOpen ] = useState(false)
    const [ oldData,setOldData ] = useState(null)
    const [alertToggle, setAlertToggle] = useState(false);
    const [idToDel, setIdToDel] = useState(null);
    const data = useSelector(state=> state.CvForm.data)

    const handleEdit = async (memberId)=>{
        if(cv && memberId){
            const currentEdit = cv.family_data.filter((edu)=> edu.id === memberId)
            setOldData(currentEdit)
            setIsOpen(true)
        }
    }

    const handleCancelAlert = () => {
        setAlertToggle(false);
    };
    
    const handleConfirmAlert = async () => {
        setAlertToggle(false);
        await dispatch(deleteFamilyMember(idToDel))
    };

    const handleDelete = async (memberId)=>{
        if(cv && memberId){
           setAlertToggle(true)
           setIdToDel(memberId)
        }
    }

    useEffect(()=>{
        dispatch(getCvById({ type: 'titssw', id: cv.id }))
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
        <MemberAdd open={addOpen} setOpen={setAddOpen} cvId={cv.id}></MemberAdd>
        <MemberEdit open={isOpen} setOpen={setIsOpen} oldData={oldData}></MemberEdit>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        {
            cv.family_data.map((member,index)=>
            <Fragment key={index}>
                <Box gridColumn="span 2" sx={{ height: '100%' }}>
                    <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                        <Typography sx={{ textAlign: "center" }}>{index+1} . Name</Typography>
                        <Typography color="text.secondary" sx={{ textAlign: "center" }}>{member.name}</Typography>    
                    </Paper>
                </Box>
                <Box gridColumn="span 2">
                    <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                        <Typography sx={{ textAlign: "center" }}>Age</Typography>
                        <Typography color="text.secondary" sx={{ textAlign: "center" }}>{member.age}</Typography>    
                    </Paper>
                </Box>
                <Box gridColumn="span 2">
                    <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                        <Typography sx={{ textAlign: "center" }}>Relation</Typography>
                        <Typography color="text.secondary" sx={{ textAlign: "center" }}>{member.relationship}</Typography>    
                    </Paper>
                </Box>
                <Box gridColumn="span 2">
                    <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                        <Typography sx={{ textAlign: "center" }}>Job</Typography>
                        <Typography color="text.secondary" sx={{ textAlign: "center" }}>{member.job}</Typography>    
                    </Paper>
                </Box>
                <Box gridColumn="span 2">
                    <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                        <Typography sx={{ textAlign: "center" }}>Address</Typography>
                        <Typography color="text.secondary" variant='body2' sx={{ textAlign: "center" }}>{member.address}</Typography>    
                    </Paper>
                </Box>
                <Box gridColumn="span 2">
                    <Paper elevation={3} sx={{ py: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        { index === cv.family_data.length - 1 &&
                            <IconButton onClick={()=> setAddOpen(true) } edge="end" aria-label="edit" sx={{ mr: 1 }}>
                                <AddBox color='info' />
                            </IconButton>
                        }
                        <IconButton onClick={()=> handleEdit(member.id) } edge="end" aria-label="edit" sx={{ mr: 1 }}>
                            <DriveFileRenameOutline color='warning' />
                        </IconButton>
                        {
                            cv.family_data.length > 1 &&
                            <IconButton onClick={()=> handleDelete(member.id)} edge="end" aria-label="delete">
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

export default FamilyMember