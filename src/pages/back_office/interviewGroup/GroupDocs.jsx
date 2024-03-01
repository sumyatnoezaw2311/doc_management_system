import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getGroupById } from '../../../slices/backOffice/interviewGpSlice'
import { Box, Button, Paper, Typography } from '@mui/material'
import DocSteps from '../../../components/backOffice/group/DocSteps'
import theme from '../../../utils/theme'
import MembersList from '../../../components/backOffice/group/MembersList'
import Loading from '../../../components/utils/Loading'
import { generatePdf, resetLink } from '../../../slices/backOffice/documentSlice'
import { downAtBlink } from '../../../utils/downAtBlink'

const types = ['TIT','SSW','SW']

const GroupDocs = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const singleGroup = useSelector(state=> state.IntGroup.group)
    const gpLoading = useSelector(state=> state.IntGroup.loading)
    const [ gpData,setGpData ] = useState(null)
    const [ canDownload, setCanDownload ] = useState(false)

    const getGroup = async (id)=>{
        await dispatch(getGroupById(id))
    }

    const downloadByGroup = async (gpId,gpName ,type)=>{
        const option = {
          export_type: "group",
          id: gpId,
          data_kind: type
        }
        const downloadFunc = await dispatch(generatePdf(option));
        const url = downloadFunc.payload?.data
        await downAtBlink(url, `${Date.now()}_${gpName}_${type}.zip`)
        dispatch(resetLink())
    }

    useEffect(()=>{
        if(id) getGroup(id)
    },[id])

    useEffect(()=>{
        if(singleGroup){
            const data = singleGroup.data
            setGpData(data)
            singleGroup.data.type === '1' ? setCanDownload(Boolean(data.demand_letter_date && data.coe_datas && data.predeparture && data.departure_date && data.smart_card_date)) :
            setCanDownload(Boolean(data.demand_letter_date && data.predeparture && data.departure_date && data.smart_card_date));
        }
    },[singleGroup])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', px: 3, pb: 5 , minHeight: '100vh', borderRadius: 0 }}>
        {
            gpLoading && <Loading/>
        }
        <Box sx={{ width: '80%', pb: 5 }}>
            <Box sx={{ width: '100%', py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>Group Name : {gpData?.name}</Typography>
                <Typography>Type : {types[gpData?.type - 1]}</Typography>
                <Button disabled={!canDownload} onClick={()=> downloadByGroup(gpData?.id, gpData?.name ,'all')} variant='contained' sx={{ color: theme.palette.common.white }}>Download All</Button>
            </Box>
            <DocSteps></DocSteps>
        </Box>
        <MembersList members={gpData?.member_data}></MembersList>
    </Paper>
  )
}

export default GroupDocs