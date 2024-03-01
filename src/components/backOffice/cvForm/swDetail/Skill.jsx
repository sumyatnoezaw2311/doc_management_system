import React, { Fragment, useEffect, useState } from 'react'
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AddBox, Delete, DriveFileRenameOutline } from '@mui/icons-material';
import { deleteSkill, getCvById } from '../../../../slices/backOffice/cvFromSlice';
import SkillAdd from '../swEdit/SkillAdd';
import SkillEdit from '../swEdit/SkillEdit';
import AlertDialog from '../../../utils/AlertDialog';

const Skill = ({cv}) => {   
    
    const dispatch = useDispatch()
    const [ isOpen,setIsOpen ] = useState(false)
    const [ addOpen,setAddOpen ] = useState(false)
    const [ oldData,setOldData ] = useState(null)
    const [alertToggle, setAlertToggle] = useState(false);
    const [idToDel, setIdToDel] = useState(null);
    const data = useSelector(state=> state.CvForm.data)
    
    const handleEdit = (skillId)=>{
        if(cv && skillId){
            const currentEdit = cv.skill_data.filter((skill)=> skill.id === skillId)
            setOldData(currentEdit)
            setIsOpen(true)
        }
    }

    const handleCancelAlert = () => {
        setAlertToggle(false);
    };
    
    const handleConfirmAlert = async () => {
        setAlertToggle(false);
        await dispatch(deleteSkill(idToDel))
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
        <SkillAdd open={addOpen} setOpen={setAddOpen} cvId={cv.id}></SkillAdd>
        <SkillEdit open={isOpen} setOpen={setIsOpen} oldData={oldData}></SkillEdit>
        <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
        {
            cv.skill_data.map((skill,index)=>
            <Fragment key={index}>
                <Box gridColumn="span 2" sx={{ height: '100%' }}>
                    <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                        <Typography sx={{ textAlign: "center" }}>{index+1} . Name</Typography>
                        <Typography color="text.secondary" sx={{ textAlign: "center" }}>{skill.name}</Typography>    
                    </Paper>
                </Box>
                <Box gridColumn="span 2">
                    <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                        <Typography sx={{ textAlign: "center" }}>Date</Typography>
                        <Typography color="text.secondary" sx={{ textAlign: "center" }}>{skill.year_month}</Typography>    
                    </Paper>
                </Box>
                <Box gridColumn="span 2">
                        <Paper elevation={3} sx={{ py: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end', p: 2 }}>
                            { index === cv.skill_data.length - 1 &&
                                <IconButton onClick={()=> setAddOpen(true) } edge="end" aria-label="edit" sx={{ mr: 1 }}>
                                    <AddBox color='info' />
                                </IconButton>
                            }
                            <IconButton onClick={()=> handleEdit(skill.id) } edge="end" aria-label="edit" sx={{ mr: 1 }}>
                                <DriveFileRenameOutline color='warning' />
                            </IconButton>
                            {
                                cv.skill_data.length > 1 &&
                                <IconButton onClick={()=> handleDelete(skill.id)} edge="end" aria-label="delete">
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

export default Skill