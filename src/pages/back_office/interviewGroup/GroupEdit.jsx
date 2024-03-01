import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getGroupById, updateIntGroup } from '../../../slices/backOffice/interviewGpSlice'
import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Date from '../../../components/main/Date'
import { getAllCompanies } from '../../../slices/backOffice/companySlice'
import { createSelector } from '@reduxjs/toolkit'
import EditMembersList from './EditMembersList'
import Loading from '../../../components/utils/Loading'


const updateGpSchema = Yup.object().shape({
    name: Yup.string().required("Group name is required"),
    interview_date: Yup.string().required("Interview date is required"),
    type: Yup.number().required("Please choose the type of group"),
    company_id: Yup.number().required("Please choose the company")
})

const GroupEdit = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const [ intDate,setIntDate ] = useState(null)
    const [ selectedOrgId,setSelectedOrgId ] = useState(null)
    const [ selectedType,setSelectedType ] = useState(null)
    const [ selectedCom,setSelectedCom ] = useState(null)
    const singleGroup = useSelector(state=> state.IntGroup.group?.data)
    const gpLoading = useSelector(state=> state.IntGroup.loading)
    const toggleLoading = useSelector(state=> state.UsersList.loading)
    const getCompanyData = (state) => state.Company.coms?.data || [];

    const getComDropdownItems = getCompanyData.length > 0 && createSelector([getCompanyData], (companyData) => {
        return companyData.map((item) => ({
            id: item.id,
            label: item.name_eng,
            organization_id : item.organization_id
        }));
    });

    const comDropdownItems = useSelector(getComDropdownItems);

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(updateGpSchema),
    });

    const handleTypeSelect = (e)=>{
        setSelectedType(e.target.value)
        setValue('type', e.target.value)
    }


    const handleComSelect = (newVal)=>{
        if(newVal){
            setSelectedCom(newVal)
            setValue('company_id', newVal.id)
            setSelectedOrgId(newVal.organization_id)
        }else{
            setSelectedCom(null)
            setValue('company_id', null)
            setSelectedOrgId(null)
        }
    }
    
    const handleUpdate = async (data) => {
        await dispatch(updateIntGroup({gpData: { ...data, org_id: Number(selectedOrgId) }, id: id}));
        navigate(-1)
    };

    const handleCancel = ()=>{
        reset()
        setIntDate(null)
        setSelectedCom(null)
        setSelectedType(null)
        navigate(-1)
    }
    
    useEffect(() => {
        if (id) {
            dispatch(getGroupById(id));
            dispatch(getAllCompanies());
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (singleGroup) {
            setValue('name', singleGroup.name);
            setValue('interview_date', singleGroup.interview_date);
            setValue('company_id', Number(singleGroup.company?.id || null));
            setValue('type', Number(singleGroup.type));
            setIntDate(singleGroup.interview_date);
            setSelectedCom({ id: singleGroup.company?.id || null, label: singleGroup.company?.name_eng || '', organization_id: Number(singleGroup.company?.organization_id) });
            setSelectedOrgId(singleGroup.company?.organization_id || null);
            setSelectedType(singleGroup.type);
        }
    }, [singleGroup, setValue]);


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', px: 3, minHeight: '100vh', borderRadius: 0 }}>
        {
            (gpLoading || toggleLoading) && <Loading/>
        }
        <form onSubmit={handleSubmit(handleUpdate)}>
            <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={3}>
                    <InputLabel sx={{ mb: 1 }}>Group Name</InputLabel>
                    <TextField fullWidth {...register('name')} placeholder={'Group Name'} error={!!errors.name} helperText={errors?.name?.message}></TextField>
                </Grid>
                <Grid item xs={3}>
                    <InputLabel sx={{ mb: 1 }}>Interview Date</InputLabel>
                    <Date dateVal={intDate} setDate={setIntDate} error={errors?.interview_date}></Date>
                </Grid>
                <Grid item xs={3}>
                    <InputLabel sx={{ mb: 1 }}>Company</InputLabel>
                    <Autocomplete
                        disablePortal
                        id={`combo-box-company}`}
                        options={comDropdownItems}
                        value={selectedCom}
                        getOptionLabel={(option) => option?.label || ''}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(event, newValue) => handleComSelect(newValue)}
                        renderInput={(params) => <TextField error={!!errors?.company_id} {...params} helperText={errors?.company_id?.message} />}
                    />
                </Grid>
                <Grid item xs={3}>
                    <InputLabel sx={{ mb: 1 }}>Visa Type</InputLabel>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedType || ""}
                            onChange={handleTypeSelect}
                        >
                            <MenuItem value={1}>TIT</MenuItem>
                            <MenuItem value={2}>SSW</MenuItem>
                            <MenuItem value={3}>SW</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 2 }}>
                    <Button type='button' onClick={()=> handleCancel()}>Cancel</Button>
                    <Button type='submit' sx={{ ml: 2 }} autoFocus>
                        Update
                    </Button>
                </Grid>
            </Grid>
        </form>
        <EditMembersList></EditMembersList>
    </Paper>
  )
}

export default GroupEdit