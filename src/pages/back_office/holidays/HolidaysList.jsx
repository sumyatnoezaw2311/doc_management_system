import { Alert, Box, Button, IconButton, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHoliday, getHolidays } from '../../../slices/backOffice/holidaySlice'
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../../../utils/theme';
import AddHoliday from './AddHoliday';
import AppPagination from '../../../components/main/AppPagination';
import Loading from '../../../components/utils/Loading';
import { useLocation } from 'react-router-dom';
import AlertDialog from '../../../components/utils/AlertDialog';

const HolidaysList = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [ addOpen,setAddOpen ] = useState(false)
    const holidays = useSelector(state=> state.Holiday?.data)
    const loading = useSelector(state=> state.Holiday.loading)
    const [ pageCount,setPageCount ] = useState(1)
    const [ currentPage,setCurrentPage ] = React.useState(1)
    const [alertToggle, setAlertToggle] = useState(false);
    const [idToDel, setIdToDel] = useState(null);

    const fetchData = async ()=>{
        const params = new URLSearchParams(window.location.search);
        const page = params.get('page');
        await dispatch(getHolidays({pageNo: page}))
    }

    const handleCancelAlert = () => {
        setAlertToggle(false);
      };
    
    const handleConfirmAlert = async () => {
        setAlertToggle(false);
        await dispatch(deleteHoliday(idToDel))
        fetchData()
    };
    

    const handleDelete = async (id)=>{
        setAlertToggle(true)
        setIdToDel(id)
    }

    useEffect(()=>{
        if(holidays){
            const count = Math.ceil(holidays?.meta?.total / holidays?.meta?.per_page) || 1;
            const page = Number(holidays?.meta?.current_page)
            setPageCount(count);
            setCurrentPage(page)
        }
    },[holidays])

    useEffect(() => {
        fetchData();
    }, [location.search]);

    useEffect(()=>{
        fetchData()
    },[])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2, px: 3, height: '100vh', borderRadius: 0 }}>
        <AlertDialog
            type={'danger'}
            cancel={handleCancelAlert}
            confrim={handleConfirmAlert}
            toggle={alertToggle}
            setToggle={setAlertToggle}
            title={"Are you sure!"}
            content={"You want to delete this holiday."}
        />
        {
            loading && <Loading/>
        }
        <AddHoliday isOpen={addOpen} setIsOpen={setAddOpen}></AddHoliday>
        <Button variant="contained" onClick={()=> setAddOpen(true) } sx={{ mt: 1, mb: 3, color: theme.palette.common.white }}>Add</Button>
        <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" gap={2} sx={{ mb: 5 }}>
            {
                holidays && holidays?.data.length > 0 ?
                holidays.data.map((holiday,index)=>
                    <Box gridColumn="span 2" key={index}>
                        <Paper elevation={3} sx={{ px: 2, height: '100%' , pb: 1}}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography>Year - {holiday.year}</Typography>
                                <IconButton color='danger' onClick={()=> handleDelete(holiday.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Box>
                            <Typography color="text.secondary">Date - {holiday.date}</Typography>  
                        </Paper>
                    </Box>
                )
                :
                <Box gridColumn="span 12">
                    <Paper elevation={3}>
                        <Alert severity="warning">No holidays entered!</Alert>
                    </Paper>
                </Box>
            }
        </Box>
        <AppPagination pageCount={pageCount} currentPage={currentPage}/>
    </Paper>
  )
}

export default HolidaysList