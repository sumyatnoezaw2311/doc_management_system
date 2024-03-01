import * as React from 'react';
import { Paper,Table,TableBody,TableCell,TableContainer,TableHead,Button,TableRow, Box, Alert, ToggleButtonGroup, ToggleButton } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import theme from '../../../utils/theme'
import AppPagination from '../../../components/main/AppPagination'
import SearchInput from '../../../components/main/filter-components/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { getRejectedUser, toggleAccountStatus } from '../../../slices/backOffice/userSlice';
import Loading from '../../../components/utils/Loading';
import AlertDialog from '../../../components/utils/AlertDialog';
import { useLocation } from 'react-router-dom';

const RejectedAccounts = ()=>{
  const dispatch = useDispatch()
  const location = useLocation()
  const rejectedUsersFromState = useSelector(state=> state.UsersList.rejectedUsers)
  const loading = useSelector(state=> state.UsersList.loading)
  const [ rejectedUsers,setRejectedUsers ] = React.useState(null)
  const [ alertToggle,setAlertToggle ] = React.useState(false)
  const [ status,setStatus ] = React.useState(null)
  const [ idToUse,setIdToUse ] = React.useState(null)
  const [ pageCount, setPageCount ] = React.useState(1);
  const [ currentPage,setCurrentPage ] = React.useState(1)

  const handleToggleStatus = async (id,status)=>{
    setStatus(status)
    setIdToUse(id)
    setAlertToggle(true)
  }

  const fetchData = async (pageNo, keyword)=>{
    await dispatch(getRejectedUser({pageNo: currentPage, keyword: keyword}))
  }

  const handleCancelAlert =()=>{
    setAlertToggle(false)
  }

  const handleConfirmAlert = async ()=>{
    const params = new URLSearchParams(location.search);
    const keyword = params.get('keyword')
    await dispatch(toggleAccountStatus({status: status, id: idToUse}))
    fetchData(currentPage,keyword);
    setAlertToggle(false)
  }

  React.useEffect(()=>{
    if(rejectedUsersFromState){
      const params = new URLSearchParams(location.search);
      setRejectedUsers(rejectedUsersFromState.data)
      const count = Math.ceil(rejectedUsersFromState?.meta?.total / rejectedUsersFromState?.meta?.per_page) || 1;
      const page = params.get('page')
      setPageCount(count);
      setCurrentPage(Number(page) || 1)
    }
  },[rejectedUsersFromState])

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get('keyword') || null;
    fetchData(currentPage,keyword);
  }, [location.search]);


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', px: 3, minHeight: '100vh', borderRadius: 0 }}>
      <AlertDialog type={'info'} cancel={handleCancelAlert} confrim={handleConfirmAlert} toggle={alertToggle} setToggle={setAlertToggle} title={"Are you sure!"} content={"You want to restore this account"}></AlertDialog>
      {
        loading && <Loading/>
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
              rejectedUsers && rejectedUsers.length > 0 ?
              rejectedUsers.map((user,index)=>
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
                    <Button onClick={()=> handleToggleStatus(user.id, "pending")} color='info' variant="text" >
                      Restore
                    </Button>
                  </TableCell>
              </TableRow>
              )
              :
              <TableRow>
                <TableCell sx={{ py: 1, px: 0 }} colSpan={7}>
                  <Alert severity="warning">There is no account in rejected list!</Alert>
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


export default RejectedAccounts