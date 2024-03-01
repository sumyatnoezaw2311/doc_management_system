import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, Button, TableRow, Box, Typography, Checkbox, ToggleButtonGroup, ToggleButton, Alert, ButtonGroup } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useDispatch, useSelector } from 'react-redux';
import { getAcceptedUsers, toggleAccountStatus } from '../../../slices/backOffice/userSlice';
import AnimatedBadge from '../../../components/utils/AnimatedBadge';
import CreateDialog from '../interviewGroup/CreateDialog';
import { addMemberToGroup, createCollection, toggleAdd } from '../../../slices/backOffice/interviewGpSlice';
import theme from '../../../utils/theme';
import AppPagination from '../../../components/main/AppPagination';
import SearchInput from '../../../components/main/filter-components/SearchInput';
import Loading from '../../../components/utils/Loading'
import AlertDialog from '../../../components/utils/AlertDialog';
import { useLocation, useNavigate } from 'react-router-dom';
import BackspaceIcon from '@mui/icons-material/Backspace';

const UsersList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const acceptedUsersFromState = useSelector(state => state.UsersList.acceptedUsers);
  const profileData = useSelector(state => state.User.profile);
  const addFromState = useSelector(state=> state.IntGroup.add)
  const collectedUser = useSelector(state=> state.IntGroup.collection)
  const gpId = useSelector(state=> state.IntGroup.toAddGpId)
  const acceptedLoading = useSelector(state => state.UsersList.loading);
  const [acceptedUsers, setAcceptedUsers] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [alertToggle, setAlertToggle] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [idToUse, setIdToUse] = React.useState(null);
  const [ pageCount, setPageCount ] = React.useState(1);
  const [ currentPage,setCurrentPage ] = React.useState(1)
  

  const handleToggleStatus = async (id, status) => {
    // const searchParams = new URLSearchParams(window.location.search);
    // searchParams.set('page', 1);
    // setStatus(status);
    setIdToUse(id);
    setAlertToggle(true);
  }

  const fetchData = async (status, page, keyword) => {
    await dispatch(getAcceptedUsers({ status: status, pageNo: page, keyword: keyword }));
  };

  const handleCancelAlert = () => {
    setAlertToggle(false);
  }

  const handleConfirmAlert = async () => {
    await dispatch(toggleAccountStatus({ status: 'reject', id: idToUse }));
    await fetchData(status, 1);
    setAlertToggle(false);
  }

  const handleChange = (event, newStatus) => {
    setStatus(newStatus);
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('status', newStatus);
    searchParams.set('page', 1);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    fetchData(newStatus, 1);
  };


  const handleOnChange = (e,id) => {
    if(e.target.checked){
      dispatch(createCollection([...collectedUser, {user_id: id}]))
    }else{
      const filteredUsers = collectedUser.filter(item=> item.user_id !== id)
      dispatch(createCollection(filteredUsers))
    }
  };

  const handleCreateGroup = async () => {
    setOpenDialog(true);
  };

  const handleAddGroup = async () => {
    await dispatch(addMemberToGroup({data: collectedUser, gpId: gpId}));
    dispatch(createCollection([]))
    dispatch(toggleAdd())
    navigate(-1)
  }

  const handleRemoveAdd = ()=>{
    dispatch(toggleAdd())
    dispatch(createCollection([]))
  }

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newStatus = params.get('status') || 'accepted';
    const newPage = params.get('page') || 1;
    const keyword = params.get('keyword') || null;
    setStatus(newStatus);
    setPageCount(1);
    fetchData(newStatus, newPage, keyword);
  }, [location.search]);

  React.useEffect(() => {
    fetchData(status, 1);
  }, [status]);

  React.useEffect(() => {
    if (acceptedUsersFromState) {
      const searchParams = new URLSearchParams(window.location.search);
      setAcceptedUsers(acceptedUsersFromState.data);
      const count = Math.ceil(acceptedUsersFromState?.meta?.total / acceptedUsersFromState?.meta?.per_page) || 1;
      const page = searchParams.get('page')
      setPageCount(count);
      setCurrentPage(Number(page) || 1)
    }
  }, [acceptedUsersFromState]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2, px: 3, height: '100vh', borderRadius: 0 }}>
      <AlertDialog type={'danger'} cancel={handleCancelAlert} confrim={handleConfirmAlert} toggle={alertToggle} setToggle={setAlertToggle} title={"Are you sure!"} content={"You want to reject this account"}></AlertDialog>
      {
        acceptedLoading && <Loading />
      }
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'end' }}>
          <Button onClick={handleCreateGroup} variant='contained' disabled={!(collectedUser.length > 0 && addFromState === false)} sx={{ color: theme.palette.common.white }}>
            Create Group
          </Button>
          <ButtonGroup
              sx={{ ml: 2 }}
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
              disabled={!(collectedUser.length > 0 && addFromState === true)}
            >
              <Button onClick={handleAddGroup} sx={{ color: theme.palette.common.white }}>Add To</Button>
              <Button onClick={handleRemoveAdd} sx={{ color: theme.palette.common.white }}>
                <BackspaceIcon/>
              </Button>
          </ButtonGroup>
                    {/* <Button onClick={handleAddGroup} variant='contained' disabled={!(memberToGroup.length > 0 && addFromState === true)} sx={{ color: theme.palette.common.white, ml: 2 }}>
            Add To
          </Button> */}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'end' }}>
          <ToggleButtonGroup color="primary" exclusive value={status} onChange={handleChange} size="small" aria-label="Small sizes">
            <ToggleButton value="accepted" key="accepted">
              All
            </ToggleButton>
            <ToggleButton value="passed" key="passed">
              Passed
            </ToggleButton>
            <ToggleButton value="pending" key="pending">
              Pending
            </ToggleButton>
            <ToggleButton value="free" key="free">
              Free
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ width: 400 }}>
          {
            status === 'accepted' ?
            <SearchInput />
            :
            <></>
          }
        </Box>
      </Box>
      <CreateDialog open={openDialog} setOpen={setOpenDialog}></CreateDialog>
      <TableContainer sx={{ maxHeight: 'calc(100% - 50px)' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='center'>NO</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell align='left'>INTERVIEW</TableCell>
              <TableCell align='center'>PHONE</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell align='center'>ENGINEER</TableCell>
              {
                status === 'accepted' &&
                <TableCell align='center'>ACTIONS</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {acceptedUsers && acceptedUsers.length > 0 ? (
              acceptedUsers.map((user, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>
                    {
                      (user.email !== profileData?.data?.email && (user.titssw_id || user.sw_id) && user.interview_status !== "pass") &&
                      <Checkbox checked={collectedUser.some(item=> item.user_id === user.id)} onChange={(e) => handleOnChange(e,user.id)} />
                    }
                  </TableCell>
                  <TableCell align='center' sx={{ py: 1 }}>{(currentPage-1)*20 + (index + 1)}</TableCell>
                  <TableCell sx={{ py: 1 }}>{user.name}</TableCell>
                  <TableCell>
                    <AnimatedBadge
                      badgecolor={
                        user.interview_status === 'pending'
                          ? theme.palette.warning.main
                          : user.interview_status === 'pass'
                            ? theme.palette.primary.main
                            : theme.palette.info.main
                      }>
                    </AnimatedBadge>
                    <Typography variant='body2' sx={{ ml: 2, display: 'inline-block' }}>{user.interview_status}</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 1, textAlign: 'center' }}>{user.phone}</TableCell>
                  <TableCell sx={{ py: 1 }}>{user.email}</TableCell>
                  <TableCell sx={{ py: 1, textAlign: 'center' }}>
                    {user.is_engineer === 1 && <TaskAltIcon sx={{ color: theme.palette.primary.main }} />}
                  </TableCell>
                  <TableCell sx={{ py: 1 }} align='center'>
                    {
                      (user.email !== profileData?.data?.email && status === 'accepted') &&
                      <Button onClick={() => handleToggleStatus(user.id, "reject")} variant="text" color="error" >
                        Reject
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell sx={{ py: 1, px: 0 }} colSpan={8}>
                  <Alert severity="warning">There is no users in {status} state!</Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <AppPagination pageCount={pageCount} currentPage={currentPage}/>
      </TableContainer>
    </Paper>
  );
};

export default UsersList;