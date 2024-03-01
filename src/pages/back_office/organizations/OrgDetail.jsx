import React, { useEffect, useState } from 'react'
import { Paper, List,Typography, Box, TableContainer, TableBody, Table, TableHead, TableRow, TableCell } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getOrganizationById } from '../../../slices/backOffice/organizationSlice'
import { useParams } from 'react-router-dom'
import CvListItem from '../../../components/main/CvListItem'
import Loading from '../../../components/utils/Loading'

const OrgDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [ org,setOrg ] = useState(null)
  const organization = useSelector(state=> state.Organization.org)
  const orgLoading = useSelector(state=> state.Organization.loading)

  useEffect(()=>{
    if(organization) setOrg(organization.data)
  },[organization])

  useEffect(()=>{
    dispatch(getOrganizationById(id))
  },[])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3, minHeight: '100vh', borderRadius: 0 }}>
      {
        orgLoading && <Loading/>
      }
      <Typography variant='h6' sx={{ m: 2, fontWeight: 'bold' }}>Detail about "{org?.name_eng}" organization</Typography>
      <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
        <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
          <CvListItem primary="Name(English)" value={org?.name_eng}></CvListItem>
          <CvListItem primary="Name(Japanese)" value={org?.name_jp}></CvListItem>
          <CvListItem primary="Address(English)" value={org?.address_eng}></CvListItem>
          <CvListItem primary="Address(Japanese)" value={org?.address_jp}></CvListItem>
          <CvListItem primary="Chairman Name(English)" value={org?.chairman_eng}></CvListItem>
          <CvListItem primary="Chairman Name(Japanese)" value={org?.chairman_jp}></CvListItem>
          <CvListItem primary="Phone" value={org?.phone}></CvListItem>
          <CvListItem primary="Email" value={org?.email}></CvListItem>
          <CvListItem primary="Fax" value={org?.fax}></CvListItem>
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
                      org?.incharge &&
                      org.incharge.map((inch,index)=> 
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

export default OrgDetail
