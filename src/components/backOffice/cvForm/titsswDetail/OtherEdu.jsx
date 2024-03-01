import React, { Fragment, useEffect, useState } from 'react'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import OtherEduEdit from '../titsswEdit/OtherEduEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOtherEdu, getCvById } from '../../../../slices/backOffice/cvFromSlice';
import AddBoxIcon from '@mui/icons-material/AddBox';
import OtherEduAdd from '../titsswEdit/OtherEduAdd';
import AlertDialog from '../../../utils/AlertDialog';


const OtherEdu = ({cv}) => {

    const dispatch = useDispatch()
    const [ isOpen,setIsOpen ] = useState(false)
    const [ addOpen,setAddOpen ] = useState(false)
    const [ oldData,setOldData ] = useState(null)
    const [alertToggle, setAlertToggle] = useState(false);
    const [idToDel, setIdToDel] = useState(null);
    const data = useSelector(state=> state.CvForm.data)

    const handleEdit = async (eduId)=>{
        if(cv && eduId){
            const currentEdit = cv.other_edu_data.filter((edu)=> edu.id === eduId)
            setOldData(currentEdit)
            setIsOpen(true)
        }
    }

    const handleCancelAlert = () => {
        setAlertToggle(false);
    };
    
    const handleConfirmAlert = async () => {
        setAlertToggle(false);
        await dispatch(deleteOtherEdu(idToDel))
    };    

    const handleDelete = async (eduId)=>{
        if(cv && eduId){
            setAlertToggle(true)
            setIdToDel(eduId)
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
                <OtherEduAdd open={addOpen} setOpen={setAddOpen} cvId={cv.id}></OtherEduAdd>
                <OtherEduEdit open={isOpen} setOpen={setIsOpen} oldData={oldData}></OtherEduEdit>
              <Box display="grid" gridTemplateColumns="repeat(9, 1fr)" gap={2}>
              {
                  cv.other_edu_data.map((edu,index)=>
                  <Fragment key={index}>
                      <Box gridColumn="span 3" sx={{ height: '100%' }}>
                          <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                              <Typography sx={{ textAlign: "center" }}>{index+1} . School Name</Typography>
                              <Typography color="text.secondary" sx={{ textAlign: "center" }}>{edu.name}</Typography>    
                          </Paper>
                      </Box>
                      <Box gridColumn="span 3">
                          <Paper elevation={3} sx={{ py: 2, height: '100%' }}>
                              <Typography sx={{ textAlign: "center" }}>Duration</Typography>
                              <Typography color="text.secondary" sx={{ textAlign: "center" }}>{`${edu.start} ~ ${edu.end}`}</Typography>    
                          </Paper>
                      </Box>
                      <Box gridColumn="span 3">
                          <Paper elevation={3} sx={{ py: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            { index === cv.other_edu_data.length - 1 &&
                                <IconButton onClick={()=> setAddOpen(true) } edge="end" aria-label="edit" sx={{ mr: 2 }}>
                                    <AddBoxIcon color='info' />
                                </IconButton>
                            }
                            <IconButton onClick={()=> handleEdit(edu.id) } edge="end" aria-label="edit" sx={{ mr: 2 }}>
                              <DriveFileRenameOutlineIcon color='warning' />
                            </IconButton>
                            {
                                cv.other_edu_data.length > 1 &&
                                <IconButton onClick={()=> handleDelete(edu.id)} edge="end" aria-label="delete">
                                    <DeleteIcon color='danger' />
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

export default OtherEdu
