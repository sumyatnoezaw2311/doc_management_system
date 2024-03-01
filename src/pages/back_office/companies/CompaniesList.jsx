import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, Button, TableRow, Box, Alert, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompany, getAllCompanies, resetIncharge } from '../../../slices/backOffice/companySlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/utils/Loading';
import AlertDialog from '../../../components/utils/AlertDialog';

const CompaniesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comFromState = useSelector((state) => state.Company.coms);
  const compLoading = useSelector((state) => state.Company.loading);
  const [coms, setComs] = useState([]);
  const [alertToggle, setAlertToggle] = useState(false);
  const [idToDel, setIdToDel] = useState(null);

  const handleCancelAlert = () => {
    setAlertToggle(false);
  };

  const handleConfirmAlert = async () => {
    setAlertToggle(false);
    await dispatch(deleteCompany(idToDel));
    await dispatch(getAllCompanies());
  };

  const handleDelete = async (id) => {
    setIdToDel(id)
    setAlertToggle(true)
  };

  const handleOnSearch = (e)=>{
    if (e.target.value !== "") {
      const filteredComs = comFromState?.data?.filter((com) =>
        com.name_eng.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setComs(filteredComs || []);
    } else {
      setComs(comFromState?.data || []);
    }
  }

  useEffect(() => {
    dispatch(getAllCompanies());
    dispatch(resetIncharge());
  }, []);

  useEffect(() => {
    if (comFromState) setComs(comFromState.data);
  }, [comFromState]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3, minHeight: '100vh', borderRadius: 0, pb: 10 }}>
      <AlertDialog
        type={'danger'}
        cancel={handleCancelAlert}
        confrim={handleConfirmAlert}
        toggle={alertToggle}
        setToggle={setAlertToggle}
        title={"Are you sure!"}
        content={"You want to delete this company."}
      />
      {compLoading && <Loading />}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <Button onClick={() => navigate(`/back-office/create-company`)} variant="contained" sx={{ color: '#fff' }} startIcon={<AddCircleIcon />}>
          Add New
        </Button>
        <TextField sx={{ width: 300 }} size='small' onChange={handleOnSearch} placeholder='Search By Name'></TextField>
      </Box>
      <TableContainer sx={{ width: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell>COMPANY NAME</TableCell>
              <TableCell>ORG NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>PHONE NUMBER</TableCell>
              <TableCell>CHAIRMAN</TableCell>
              <TableCell>LOCATION</TableCell>
              <TableCell align="center">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coms.length === 0 ? (
              <TableRow>
                <TableCell sx={{ py: 1, px: 0 }} colSpan={8}>
                  <Alert severity="warning">There is no record for company information!</Alert>
                </TableCell>
              </TableRow>
            ) : (
              coms.map((com, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={com.id}>
                  <TableCell sx={{ py: 1 }}>{index + 1}</TableCell>
                  <TableCell sx={{ py: 1 }}>{com.name_eng}</TableCell>
                  <TableCell sx={{ py: 1 }}>{com.organization.name_eng}</TableCell>
                  <TableCell sx={{ py: 1 }}>{com.email}</TableCell>
                  <TableCell sx={{ py: 1 }}>{com.phone}</TableCell>
                  <TableCell sx={{ py: 1 }}>{com.ceo_eng}</TableCell>
                  <TableCell sx={{ py: 1 }}>{com.address_eng}</TableCell>
                  <TableCell sx={{ py: 1 }} align="center">
                    <Button onClick={() => navigate(`/back-office/company-detail/${com.id}`)} variant="text" sx={{ mr: 1 }} color="info">
                      Detail
                    </Button>
                    <Button onClick={() => navigate(`/back-office/company-edit/${com.id}`)} variant="text" sx={{ mr: 1 }} color="warning">
                      Edit
                    </Button>
                    <Button variant="text" onClick={() => handleDelete(com.id)} color="danger">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CompaniesList;
