import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  TableRow,
  Box,
  Alert,
  ButtonGroup,
} from '@mui/material';
import AppPagination from '../../../components/main/AppPagination';
import SearchInput from '../../../components/main/filter-components/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  deleteCvForm,
  downloadCvExcel,
  getAllCvForm,
  resetDownloadLink,
} from '../../../slices/backOffice/cvFromSlice';
import theme from '../../../utils/theme';
import Loading from '../../../components/utils/Loading';
import AlertDialog from '../../../components/utils/AlertDialog';
import { downAtBlink } from '../../../slices/backOffice/documentSlice';
import TitsswPdf from '../pdfs/titssw/TitsswPdf';
import SwPdf from '../pdfs/sw/SwPdf';

const CvsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cvsFromState = useSelector((state) => state.CvForm.cvs);
  const cvsLoading = useSelector((state) => state.CvForm.loading);
  const downAtBlinkLoading = useSelector(state=> state.Document.loading)
  const [cvs, setCvs] = useState([]);
  const [tabVal, setTabVal] = useState('titssw');
  const [alertToggle, setAlertToggle] = useState(false);
  const [idToDel, setIdToDel] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [ currentPage,setCurrentPage ] = React.useState(1)
  const [ pdfOpen,setPdfOpen ] = useState(false)
  const [ cvId,setCvId ] = useState(null)

  const handleCancelAlert = () => {
    setAlertToggle(false);
  };

  const fetchData = async () => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page') || 1;
    const keyword = params.get('keyword');
    await dispatch(getAllCvForm({ type: tabVal, pageNo: page, keyword: keyword }));
  };

  const handleConfirmAlert = async () => {
    await dispatch(deleteCvForm({ type: tabVal, id: idToDel }));
    fetchData();
    setAlertToggle(false);
    setIdToDel(null);
  };

  const handleDelete = async (id) => {
    setIdToDel(id);
    setAlertToggle(true);
  };

  const handleDownload = async (id) => {
    const downloadFunc = await dispatch(downloadCvExcel(id));
    if(!downloadFunc.payload) return;
    const url = downloadFunc.payload.url;
    await dispatch(downAtBlink({url: url, filename: downloadFunc.payload.filename}));
    await dispatch(resetDownloadLink());
  };

  const handleDownloadPdf = async (id)=>{
    setCvId(id)
    setPdfOpen(true)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('page', 1)
    navigate('?page=1')
    setCurrentPage(1)
    fetchData();
  }, [tabVal]);

  useEffect(() => {
    if (cvsFromState){
      setCvs(cvsFromState.data);
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page')
      const count = Math.ceil(cvsFromState?.meta?.total / cvsFromState?.meta?.per_page) || 1;
      setPageCount(count);
      setCurrentPage(Number(page) || 1)
    }
  }, [cvsFromState]);

  useEffect(() => {
    fetchData();
  }, [location.search]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', px: 3, minHeight: '100vh', borderRadius: 0}}>
      {
        tabVal === 'titssw' ?
        <TitsswPdf isOpen={pdfOpen} setIsOpen={setPdfOpen} cvId={cvId}></TitsswPdf>
        :
        <SwPdf isOpen={pdfOpen} setIsOpen={setPdfOpen} cvId={cvId}></SwPdf>
      }
      <AlertDialog
        type={'danger'}
        cancel={handleCancelAlert}
        confrim={handleConfirmAlert}
        toggle={alertToggle}
        setToggle={setAlertToggle}
        title={"Are you sure!"}
        content={"You want to delete this cv form."}
      />
      {(cvsLoading || downAtBlinkLoading) && <Loading />}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button disabled={tabVal === 'titssw'} onClick={() => setTabVal('titssw')} sx={{ color: theme.palette.common.white }}>TIT/SSW</Button>
          <Button disabled={tabVal === 'sw'} onClick={() => setTabVal('sw')} sx={{ color: theme.palette.common.white }}>SW</Button>
        </ButtonGroup>
        <Box sx={{ width: 400 }}>
          <SearchInput />
        </Box>
      </Box>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>NO</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align='center'>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cvs.length === 0 ? (
              <TableRow>
                <TableCell sx={{ py: 1, px: 0 }} colSpan={7}>
                  <Alert severity="warning">There is no record for cv information!</Alert>
                </TableCell>
              </TableRow>
            ) : (
              cvs.map((cv, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell align='center' sx={{ py: 1 }}>
                    {(currentPage-1)*20 + (index + 1)}
                  </TableCell>
                  <TableCell sx={{ py: 1 }}>
                    {cv.name_eng}
                  </TableCell>
                  <TableCell sx={{ py: 1 }}>{cv.email}</TableCell>
                  <TableCell sx={{ py: 1 }}>{cv.phone}</TableCell>
                  <TableCell sx={{ py: 1 }} align='center'>
                    <Button onClick={() => handleDownloadPdf(cv.id)} variant='text' color='warning' sx={{ mr: 1 }}>PDF</Button>
                    <Button onClick={() => handleDownload(cv.user_id)} variant='text' color='primary' sx={{ mr: 1 }}>XlSX</Button>
                    <Button onClick={() => navigate(`/back-office/cv-detail-${tabVal}/${cv.id}`, { state: { data: tabVal } })} variant="text" sx={{ mr: 1 }} color='info'>Detail</Button>
                    {/* <Button onClick={() => navigate(`/back-office/cv-edit-${tabVal}/${cv.id}`, { state: { data: tabVal } })} variant="text" sx={{ mr: 1 }} color='warning'>Edit</Button> */}
                    <Button variant="text" onClick={() => handleDelete(cv.id)} color='danger'>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AppPagination pageCount={pageCount} currentPage={currentPage} />
    </Paper>
  );
}

export default CvsList;