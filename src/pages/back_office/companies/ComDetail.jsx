import React, { useEffect, useState } from 'react'
import { Paper, List, Typography, Box, TableContainer, TableBody, Table, TableHead, TableRow, TableCell } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CvListItem from '../../../components/main/CvListItem'
import { useParams } from 'react-router-dom'
import { getCompanyById } from '../../../slices/backOffice/companySlice'
import Loading from '../../../components/utils/Loading'

const ComDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [ com,setCom ] = useState(null)
  const company = useSelector(state=> state.Company.com)
  const comLoading = useSelector(state=> state.Company.loading)

  useEffect(()=>{
    if(company) setCom(company.data)
  },[company])

  useEffect(()=>{
    dispatch(getCompanyById(id))
  },[])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3, minHeight: '100vh', borderRadius: 0 }}>
      {
        comLoading && <Loading/>
      }
      <Typography variant='h6' sx={{ m: 2, fontWeight: 'bold' }}>Detail about "{com?.name_eng}" company</Typography>
      <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
        <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
          <CvListItem primary="Name(English)" value={com?.name_eng}></CvListItem>
          <CvListItem primary="Name(Japanese)" value={com?.name_jp}></CvListItem>
          <CvListItem primary="Address(English)" value={com?.address_eng}></CvListItem>
          <CvListItem primary="Address(Japanese)" value={com?.address_jp}></CvListItem>
          <CvListItem primary="Address(Burmese)" value={com?.address_mm}></CvListItem>
          <CvListItem primary="State or Region where the company is located" value={com?.region_mm}></CvListItem>
          <CvListItem primary="CEO Name(English)" value={com?.ceo_eng}></CvListItem>
          <CvListItem primary="CEO Name(Japanese)" value={com?.ceo_jp}></CvListItem>
          <CvListItem primary="Phone" value={com?.phone}></CvListItem>
          <CvListItem primary="Email" value={com?.email}></CvListItem>
          <CvListItem primary="Fax" value={com?.fax}></CvListItem>
        </List>
        <Box  sx={{ px: 5 }}>
          <Typography variant='h6' sx={{ m: 2 }}>Incharges List</Typography>
          <TableContainer sx={{ minHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {
                      com?.incharge &&
                      com.incharge.map((inch,index)=> 
                        <TableRow key={index}>
                          <TableCell>{index+1}</TableCell>
                          <TableCell>{inch.name}</TableCell>
                          <TableCell>{inch.position}</TableCell>
                          <TableCell>{inch.email}</TableCell>
                        </TableRow>
                    )
                  }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Paper>
  )
}

export default ComDetail
