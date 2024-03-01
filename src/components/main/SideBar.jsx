import React from 'react'
import { Box,Drawer,Toolbar,List } from '@mui/material';
import SideBarItem from './SideBarItem';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PendingIcon from '@mui/icons-material/Pending';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const drawerWidth = 290;

const SideBar = () => {

    const menuSections = [
        {title: "users", items: [
            {link: "pending-list",title: 'Pending Accounts', icon: <PendingIcon/>},
            {link: "rejected-list",title: 'Rejected Accounts', icon: <PendingIcon/>},
            {link: "users-list",title:'Users List', icon: <PeopleAltIcon/>}
        ] },
        {title: "organizations & companies", items: [
            {link: "create-organization",title: 'Add New Organization', icon: <Diversity3Icon/>},
            {link: "organizations-list",title: 'Organizations', icon: <Diversity3Icon/>},
            {link: "create-company",title: 'Add New Company', icon: <Diversity3Icon/>},
            {link: "companies-list",title:'Companies', icon: <ApartmentIcon/>}
        ]},
        {title: "Documentation Process", items: [
            {link: "interview-groups",title: 'Interview Groups', icon: <GroupsIcon/>},
            {link: "cvs-list",title: 'CVs List', icon: <ReceiptLongIcon/>},
            {link: "holidays",title: 'Holidays', icon: <DateRangeIcon/>}
        ]}
    ]

  return (
    <Drawer
        variant="permanent"
        sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        >
        <Toolbar />
        <Box sx={{ overflow: 'auto', paddingLeft: 3}}>
            <List>
                {
                    menuSections.map((section,index)=> <SideBarItem key={index} section={section}></SideBarItem>)
                }
            </List>
        </Box>
    </Drawer>
  )
}

export default SideBar
