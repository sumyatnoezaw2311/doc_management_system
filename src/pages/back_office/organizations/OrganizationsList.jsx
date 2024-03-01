import React, { useEffect, useState } from 'react'
import { Paper,Table,TableBody,TableCell,TableContainer,TableHead,Button,TableRow, Box, Alert, TextField } from '@mui/material';
import theme from '../../../utils/theme';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrganization, getOrganizations, resetIncharge } from '../../../slices/backOffice/organizationSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/utils/Loading';
import AlertDialog from '../../../components/utils/AlertDialog';

const OrganizationsList = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orgFromState = useSelector(state=> state.Organization.orgs)
  const orgLoading = useSelector(state=> state.Organization.loading)
  const [ orgs,setOrgs ] = useState([])
  const [alertToggle, setAlertToggle] = useState(false);
  const [idToDel, setIdToDel] = useState(null);

  const handleOnSearch = (e)=>{
    if (e.target.value) {
      const filteredOrgs = orgFromState?.data?.filter((org) =>
        org.name_eng.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setOrgs(filteredOrgs || []);
    } else {
      setOrgs(orgFromState?.data || []);
    }
  }

  const handleCancelAlert = () => {
    setAlertToggle(false);
  };

  const handleConfirmAlert = async () => {
    setAlertToggle(false);
    await dispatch(deleteOrganization(idToDel))
    await dispatch(getOrganizations())
  };

  const handleDelete = async (id)=>{
    setAlertToggle(true)
    setIdToDel(id)
  }

  useEffect(()=>{
    dispatch(getOrganizations())
    dispatch(resetIncharge())
  },[])

  useEffect(()=>{
    if(orgFromState) setOrgs(orgFromState.data)
  },[orgFromState])


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3, minHeight: '100vh', borderRadius: 0, pb: 10 }}>
      <AlertDialog
        type={'danger'}
        cancel={handleCancelAlert}
        confrim={handleConfirmAlert}
        toggle={alertToggle}
        setToggle={setAlertToggle}
        title={"Are you sure!"}
        content={"You want to delete this organization."}
      />
      {
        orgLoading && <Loading/>
      }
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <Button onClick={()=> navigate(`/back-office/create-organization`)} variant='contained' sx={{ color: theme.palette.common.white }} startIcon={<AddCircleIcon></AddCircleIcon>}>Add New</Button>
        <TextField sx={{ width: 300 }} size='small' onChange={handleOnSearch} placeholder='Search By Name'></TextField>
      </Box>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>PHONE NUMBER</TableCell>
              <TableCell>CHAIRMAN</TableCell>
              <TableCell>LOCATION</TableCell>
              <TableCell align='center'>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
              orgs.length === 0 ?
              <TableRow>
                <TableCell sx={{ py: 1, px: 0 }} colSpan={7}>
                  <Alert severity="warning">There is no record for organization informations!</Alert>
                </TableCell>
              </TableRow>
              :
              orgs.map((org,index)=>
                  <TableRow hover role="checkbox" tabIndex={-1} key={org.id}>
                    <TableCell sx={{ py: 1 }}>
                      {index+1}
                    </TableCell>
                    <TableCell sx={{ py: 1 }}>{org.name_eng}</TableCell>
                    <TableCell sx={{ py: 1 }}>{org.email}</TableCell>
                    <TableCell sx={{ py: 1 }}>{org.phone}</TableCell>
                    <TableCell sx={{ py: 1 }}>{org.chairman_eng}</TableCell>
                    <TableCell sx={{ py: 1 }}>{org.address_eng}</TableCell>
                    <TableCell sx={{ py: 1, whiteSpace: 'nowrap' }} align='center'>
                      <Button onClick={()=> navigate(`/back-office/organization-detail/${org.id}`)} variant="text" sx={{ mr: 1 }} color='info'>Detail</Button>
                      <Button onClick={()=> navigate(`/back-office/organization-edit/${org.id}`)} variant="text" sx={{ mr: 1 }} color='warning'>Edit</Button>
                      <Button variant="text" onClick={()=> handleDelete(org.id)} color='danger'>Delete</Button>
                    </TableCell>
                  </TableRow>  
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default OrganizationsList
