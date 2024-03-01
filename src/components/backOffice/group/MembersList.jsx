import { Alert, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { downAtBlink, generatePdf, resetLink } from '../../../slices/backOffice/documentSlice'


const MembersList = () => {

    const singleGroup = useSelector(state=> state.IntGroup.group)
    const dispatch = useDispatch()
    const [ passsedMembers,setPassedMembers ] = useState([])
    const [ canDownload,setCanDownload ] = useState(false)
    const [ gpType, setGpType ] = useState(null)

    const handleDownloadByMember = async (memberId,name,type)=>{
        const option = {
            export_type: "member",
            id: memberId,
            data_kind: type
        }
        const downloadFunc = await dispatch(generatePdf(option));
        const url = downloadFunc.payload?.data
        await dispatch(downAtBlink({url: url, filename: `${Date.now()}_${name}_${type}.zip`}));
        dispatch(resetLink());
    }

    useEffect(()=>{
        if(singleGroup){
            const data = singleGroup.data
            setGpType(data.type)
            data.type === '1' ? setCanDownload(Boolean(data.demand_letter_date && data.coe_datas && data.predeparture && data.departure_date && data.smart_card_date)) :
            setCanDownload(Boolean(data.demand_letter_date && data.predeparture && data.departure_date && data.smart_card_date));
            const filteredMembers = data.member_data.filter(member=> member.interview_status === 'pass')
            setPassedMembers(filteredMembers);
        }
    },[singleGroup])

  return (
    <TableContainer sx={{ maxHeight: '100%' }}>
        <Typography variant='h6' sx={{ mt: 3 }}>Passed Members List</Typography>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                    <TableCell align='center'>NO</TableCell>
                    <TableCell>NAME</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Download Options</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    passsedMembers && passsedMembers.length > 0 ?
                    passsedMembers.map((member,index)=>
                        <TableRow key={index}>
                            <TableCell align='center'>{index+1}</TableCell>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.phone}</TableCell>
                            <TableCell>
                                <Button disabled={!canDownload} onClick={()=> handleDownloadByMember(member.id, member.name ,'all')} size='small' variant='contained' sx={{ mr: 1, color: '#fff' }}>All</Button>
                                <Button disabled={!canDownload} onClick={()=> handleDownloadByMember(member.id, member.name ,'demand_letter')} size='small' variant='contained' sx={{ mr: 1, color: '#fff' }}>Demand</Button>
                                {singleGroup?.data.type === 1 && <Button disabled={!canDownload} onClick={()=> handleDownloadByMember(member.id, member.name ,'coe')} size='small' variant='contained' sx={{ mr: 1, color: '#fff' }}>coe</Button>}
                                <Button disabled={!canDownload} onClick={()=> handleDownloadByMember(member.id, member.name ,'pre_dep')} size='small' variant='contained' sx={{ mr: 1, color: '#fff' }}>predeparture</Button>
                                <Button disabled={!canDownload} onClick={()=> handleDownloadByMember(member.id, member.name ,'smartcard')} size='small' variant='contained' sx={{ color: '#fff' }}>smart card</Button>
                            </TableCell>
                        </TableRow>
                    )
                    :
                    <TableRow>
                        <TableCell sx={{ py: 1, px: 0 }} colSpan={5}>
                            <Alert severity="warning">There is no interview passed members!</Alert>
                        </TableCell>
                    </TableRow>
                }                            
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default MembersList