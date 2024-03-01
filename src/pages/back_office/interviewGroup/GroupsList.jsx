import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, Button, TableRow, Box, Alert, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteGroup, getAllGroup, resetGroup } from '../../../slices/backOffice/interviewGpSlice';
import Loading from '../../../components/utils/Loading';
import AlertDialog from '../../../components/utils/AlertDialog';
import CustomDropdown from '../../../components/utils/CustomDropdown';
import AppPagination from '../../../components/main/AppPagination';
import SearchInput from '../../../components/main/filter-components/SearchInput';

const GroupsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const gpFromState = useSelector(state => state.IntGroup.groups);
  const gpLoading = useSelector(state => state.IntGroup.loading);
  const [alertToggle, setAlertToggle] = useState(false);
  const [idToDel, setIdToDel] = useState(null);
  const [selectedComId, setSelectedComId] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [ currentPage,setCurrentPage ] = React.useState(1)

  const fetchData = async () => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    const keyword = params.get('keyword');
    const company_id = params.get('company_id');
    await dispatch(getAllGroup({ pageNo: page, keyword: keyword, companyId: company_id }));
    setCurrentPage(Number(gpFromState?.meta?.current_page) || 1)
    setPageCount(Math.ceil(gpFromState?.meta?.total / gpFromState?.meta?.per_page) || 1);
  };

  const handleCancelAlert = () => {
    setAlertToggle(false);
  };

  const handleConfirmAlert = async () => {
    setAlertToggle(false);
    await dispatch(deleteGroup(idToDel));
    fetchData();
    setIdToDel(null);
  };

  const handleDelete = (id) => {
    setIdToDel(id);
    setAlertToggle(true);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (selectedComId) {
      searchParams.set('company_id', selectedComId);
      searchParams.delete('page');
      navigate(`?${searchParams.toString()}`);
    } else {
      searchParams.delete('company_id');
      navigate(`?${searchParams.toString()}`);
    }
  }, [selectedComId, navigate]);

  useEffect(() => {
    fetchData();
  }, [location.search]);

  useEffect(() => {
    fetchData();
    dispatch(resetGroup());
  }, [dispatch]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', px: 3, minHeight: '100vh', borderRadius: 0 }}>
      <AlertDialog
        type={'danger'}
        cancel={handleCancelAlert}
        confrim={handleConfirmAlert}
        toggle={alertToggle}
        setToggle={setAlertToggle}
        title={"Are you sure!"}
        content={"You want to delete this group."}
      />
      {gpLoading && <Loading />}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 3 }}>
        <Box sx={{ width: 300 }}>
          <CustomDropdown type="company" setSelectedId={setSelectedComId} label="Filter by company" size={"small"} />
        </Box>
        <Box sx={{ width: 400 }}>
          <SearchInput />
        </Box>
      </Box>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>NO</TableCell>
              <TableCell>GROUP NAME</TableCell>
              <TableCell align='center'>INTERVIEW DATE</TableCell>
              <TableCell>ORGANIZATION</TableCell>
              <TableCell>COMPANY</TableCell>
              <TableCell align='center'>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gpFromState?.data?.length === 0 ? (
              <TableRow>
                <TableCell sx={{ py: 1, px: 0 }} colSpan={7}>
                  <Alert severity="warning">There is no record for interview group information!</Alert>
                </TableCell>
              </TableRow>
            ) : (
              gpFromState?.data?.length > 0 ?
              gpFromState?.data?.map((gp, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell sx={{ py: 1 }} align='center'>
                    {(currentPage-1)*20 + (index + 1)}
                  </TableCell>
                  <TableCell sx={{ py: 1 }}>
                    {gp.name} <Chip color="info" size="small" label={gp.type && ['TIT', 'SSW', 'SW'][gp.type - 1]} />
                  </TableCell>
                  <TableCell sx={{ py: 1 }} align='center'>{gp.interview_date}</TableCell>
                  <TableCell sx={{ py: 1 }}>{gp.company?.organization?.name_eng}</TableCell>
                  <TableCell sx={{ py: 1 }}>{gp.company?.name_eng}</TableCell>
                  <TableCell sx={{ py: 1 }} align='center'>
                    <Button onClick={() => navigate(`/back-office/group-docs-${gp.type === 1 || gp.type === 2  ? 'titssw' : 'sw'}/${gp.id}`)} variant="text" sx={{ mr: 1 }} color='info'>Docs</Button>
                    <Button onClick={() => navigate(`/back-office/group-edit-${gp.type === 1 || gp.type === 2  ? 'titssw' : 'sw'}/${gp.id}`)} variant="text" sx={{ mr: 1 }} color='warning'>Edit</Button>
                    <Button variant="text" onClick={() => handleDelete(gp.id)} color='danger'>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
              :
              <TableRow>
                <TableCell sx={{ py: 1, px: 0 }} colSpan={7}>
                  <Alert severity="warning">There is no groups!</Alert>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AppPagination pageCount={pageCount} currentPage={currentPage}/>
    </Paper>
  );
};

export default GroupsList;
