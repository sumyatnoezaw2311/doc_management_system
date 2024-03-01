import * as React from 'react';
import { Paper,Table,TableBody,TableCell,TableContainer,TableHead,Button,TableRow, Box, Alert } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import theme from '../../../utils/theme'
import AppPagination from '../../../components/main/AppPagination'
import SearchInput from '../../../components/main/filter-components/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingUsers, toggleAccountStatus } from '../../../slices/backOffice/userSlice';
import Loading from '../../../components/utils/Loading';
import AlertDialog from '../../../components/utils/AlertDialog';
import { useLocation } from 'react-router-dom';

const PendingUsersList = ()=>{
  const dispatch = useDispatch()
  const location = useLocation()
  const pendingUserFromState = useSelector(state=> state.UsersList.pendingUsers)
  const pendingLoading = useSelector(state=> state.UsersList.loading)
  const [ pendingUsers,setPendingUsers ] = React.useState(null)
  const [ alertToggle,setAlertToggle ] = React.useState(false)
  const [ status,setStatus ] = React.useState(null)
  const [ idToUse,setIdToUse ] = React.useState(null)
  const [ pageCount, setPageCount ] = React.useState(1);
  const [ currentPage,setCurrentPage ] = React.useState(1)

  const fetchData = async (pageNo,keyword)=>{
    await dispatch(getPendingUsers({pageNo: pageNo, keyword: keyword}))
  }

  const handleToggleStatus = async (id,status)=>{
    setStatus(status)
    setIdToUse(id)
    setAlertToggle(true)
  }

  const handleCancelAlert =()=>{
    setAlertToggle(false)
  }

  const handleConfirmAlert = async ()=>{
    setAlertToggle(false)
    const params = new URLSearchParams(location.search);
    const keyword = params.get('keyword')
    await dispatch(toggleAccountStatus({status: status, id: idToUse}))
    fetchData(currentPage, keyword)
  }

  React.useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const keyword = params.get('keyword') || null;
    fetchData(currentPage,keyword)
  },[location.search])

  React.useEffect(()=>{
    if(pendingUserFromState){
      const params = new URLSearchParams(location.search);
      setPendingUsers(pendingUserFromState.data)
      const count = Math.ceil(pendingUserFromState?.meta?.total / pendingUserFromState?.meta?.per_page) || 1;
      const page = params.get('page') || 1;
      setPageCount(count);
      setCurrentPage(Number(page))
    }
  },[pendingUserFromState])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', px: 3, minHeight: '100vh', borderRadius: 0 }}>
      <AlertDialog type={status === 'accept' ? 'info' : 'danger'} cancel={handleCancelAlert} confrim={handleConfirmAlert} toggle={alertToggle} setToggle={setAlertToggle} title={"Are you sure!"} content={`You want to ${status === 'accept' ? "accept" : "reject" } this user.`}></AlertDialog>
      {
        pendingLoading && <Loading/>
      }
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <Box sx={{ width: 400 }}>
          <SearchInput></SearchInput>
        </Box>
      </Box>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>NO</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>PHONE NUMBER</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Is_ENGINEER</TableCell>
              <TableCell align='center'>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              pendingUsers && pendingUsers.length > 0 ?
              pendingUsers.map((user,index)=>
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell align='center' sx={{ py: 1 }}>
                    {(currentPage-1)*20 + (index + 1)}
                  </TableCell>
                  <TableCell sx={{ py: 1, whiteSpace: 'nowrap' }}>{user.name}</TableCell>
                  <TableCell sx={{ py: 1 }}>{user.phone}</TableCell>
                  <TableCell sx={{ py: 1 }}>{user.email}</TableCell>
                  <TableCell sx={{ py: 1, textAlign: 'center' }}>
                    {
                      user.is_engineer === 1 && <TaskAltIcon sx={{ color: theme.palette.primary.main }}/>
                    }
                  </TableCell>
                  <TableCell sx={{ py: 1, whiteSpace: 'nowrap' }} align='center'>
                    <Button onClick={()=> handleToggleStatus(user.id, "accept" )} sx={{ mr: 1 }} color='primary' variant="text" >
                      Approve
                    </Button>
                    <Button onClick={()=> handleToggleStatus(user.id,"reject")} variant="text" color="error">
                      Reject
                    </Button>
                  </TableCell>
              </TableRow>
              )
              :
              <TableRow>
                <TableCell sx={{ py: 1, px: 0 }} colSpan={7}>
                  <Alert severity="warning">There is no account in pending state!</Alert>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <AppPagination pageCount={pageCount} currentPage={currentPage}/>
    </Paper>
  );
}


export default PendingUsersList