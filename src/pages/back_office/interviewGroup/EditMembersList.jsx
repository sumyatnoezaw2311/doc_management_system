import React, { useState } from 'react';
import { Alert, Button, Paper, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import theme from '../../../utils/theme';
import AddFillData from './titssw/AddtitsswFillData';
import AddSwFillData from './sw/AddSwFillData';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIntStatus } from '../../../slices/backOffice/userSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteMemberFromGroup, getGroupById, setToAddGpId, toggleAdd } from '../../../slices/backOffice/interviewGpSlice';
import { getCvById } from '../../../slices/backOffice/cvFromSlice';
import AlertDialog from '../../../components/utils/AlertDialog';

const EditMembersList = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const navigate = useNavigate()
    const path = useLocation().pathname
    const [openFillData, setOpenFillData] = useState(false);
    const [cvId, setCvId] = useState(null);
    const [ alertToggle,setAlertToggle ] = useState(false)
    const singleGroup = useSelector(state=> state.IntGroup.group?.data)
    const [ idToDel,setIdToDel ] = useState(null)

    const toggle = async (event, user_id) => {
        const status = event.target.checked ? 'pass' : 'pending';
        await dispatch(toggleIntStatus({ status, id: user_id }));
        await dispatch(getGroupById(id))
    };

    const handleAddMember = ()=>{
        dispatch(toggleAdd())
        dispatch(setToAddGpId(id))
        navigate('/back-office/users-list')
    }

    const handleCancelAlert =()=>{
        setAlertToggle(false)
    }
    
    const handleConfirmAlert = async ()=>{
        setAlertToggle(false)
        await dispatch(deleteMemberFromGroup(Number(idToDel)))
        await dispatch(getGroupById(id))
    }

    const removeMember = (memberId)=>{
        setIdToDel(memberId)
        setAlertToggle(true)
    }

    const handleClick = (id) => {
        setOpenFillData(true);
        dispatch(getCvById({type: path.includes('titssw') ? 'titssw': 'sw', id: Number(id)}))
        setCvId(id);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
            <AlertDialog type={'danger'} cancel={handleCancelAlert} confrim={handleConfirmAlert} toggle={alertToggle} setToggle={setAlertToggle} title={"Are you sure!"} content={"You want to remove this member from this group."}></AlertDialog>
            {singleGroup?.type !== 3 ? (
                <AddFillData isOpen={openFillData} setIsOpen={setOpenFillData} cvId={cvId}></AddFillData>
            ) : (
                <AddSwFillData isOpen={openFillData} setIsOpen={setOpenFillData} cvId={cvId}></AddSwFillData>
            )}
            <Button onClick={handleAddMember} variant='contained' sx={{ m: 3, color: theme.palette.common.white }}>
                Add Member
            </Button>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>NO</TableCell>
                            <TableCell align='center'>NAME</TableCell>
                            <TableCell align='center'>INTERVIEW STATE</TableCell>
                            <TableCell align='center'>EMAIL</TableCell>
                            <TableCell align='center'>PHONE</TableCell>
                            <TableCell align='center'>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {singleGroup &&
                            singleGroup.member_data.length > 0 ?
                            singleGroup.member_data.map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell align='center'>{index + 1}</TableCell>
                                    <TableCell align='center'>{member.name}</TableCell>
                                    <TableCell align='center'>
                                        <Stack direction='row' spacing={1} alignItems='center' justifyContent={'center'}>
                                            <Typography>Failed</Typography>
                                            <Switch
                                                checked={Boolean(member.interview_status === 'pass')}
                                                onChange={(event) => toggle(event, member.user_id)}
                                            />
                                            <Typography>Passed</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align='center'>{member.email}</TableCell>
                                    <TableCell align='center'>{member.phone}</TableCell>
                                    <TableCell align='center'>
                                        {
                                            member.interview_status === 'pass' ?
                                            <Button variant='text' color='warning' onClick={() => handleClick(member.titssw_id || member.sw_id)}>
                                                Fill Data
                                            </Button>
                                            :
                                            <Button onClick={()=> removeMember(member.id) } variant='text' color='danger'>
                                                Remove
                                            </Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            )) :
                            <TableRow>
                                <TableCell sx={{ py: 1, px: 0 }} colSpan={6}>
                                    <Alert severity="warning">There is no members in this group!</Alert>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default EditMembersList;
