import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PendingIcon from '@mui/icons-material/Pending';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TopicIcon from '@mui/icons-material/Topic';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import theme from '../../utils/theme';

const Header = () => {
    const { id } = useParams()
    const location = useLocation();
    const path = location.pathname;

    const parts = path.split('/');

    const pages = [
        { title: 'users',
            items: [
                { link: 'pending-list', title: 'Pending Accounts', icon: <PendingIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: 'users-list', title: 'Users List', icon: <PeopleAltIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: 'rejected-list', title: 'Rejected Accounts', icon: <DoDisturbAltIcon sx={{ color: 'white', fontSize: '28px'}} /> }
            ]
        },
        { title: 'organizations & companies',
            items: [
                { link: 'organizations-list', title: 'Organizations List', icon: <Diversity3Icon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: 'companies-list', title: 'Companies List', icon: <ApartmentIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: 'interview-groups', title: 'Groups List', icon: <GroupsIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: "create-company",title: 'Add New Company', icon: <AddBoxIcon sx={{ color: 'white', fontSize: '28px'}} />},
                { link: 'create-organization', title: 'Add New Organization', icon: <AddCircleIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `organization-detail/${id}`, title: 'Organization Detail', icon: <ContentPasteSearchIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `organization-edit/${id}`, title: 'Organization Edit', icon: <BorderColorIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `company-detail/${id}`, title: 'Company Detail', icon: <ContentPasteSearchIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `company-edit/${id}`, title: 'Company Edit', icon: <BorderColorIcon sx={{ color: 'white', fontSize: '28px'}} /> },
            ]
        },
        { title: 'Documentation Process',
            items: [
                { link: 'interview-groups-list', title: 'Interview Groups', icon: <GroupsIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: 'cvs-list', title: 'CVs List', icon: <ReceiptLongIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `cv-detail-titssw/${id}`, title: 'Cv Detail', icon: <FindInPageIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `cv-detail-sw/${id}`, title: 'Cv Detail', icon: <FindInPageIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `cv-edit-titssw/${id}`, title: 'Cv Edit', icon: <DriveFileRenameOutlineIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `cv-edit-sw/${id}`, title: 'Cv Edit', icon: <DriveFileRenameOutlineIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `group-docs-titssw/${id}`, title: 'Documents', icon: <TopicIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `group-docs-sw/${id}`, title: 'Documents', icon: <TopicIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `group-edit-titssw/${id}`, title: 'Group Edit', icon: <DriveFileRenameOutlineIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `group-edit-sw/${id}`, title: 'Group Edit', icon: <DriveFileRenameOutlineIcon sx={{ color: 'white', fontSize: '28px'}} /> },
                { link: `holidays`, title: 'Holidays List', icon: <DateRangeIcon sx={{ color: 'white', fontSize: '28px'}} /> },
            ]
        }
    ];

    let matchingItem = null;
    pages.forEach((page) => {
        page.items.forEach((item) => {
            if(parts.length === 4){
                const lastPart = parts[parts.length - 2];
                if (item.link.includes(lastPart)) {
                    matchingItem = item;
                }
            }else{
                const lastPart = parts[parts.length - 1];
                if (item.link === lastPart) {
                    matchingItem = item;
                }
            }
        });
    });

    return (
        <Box sx={{ height: 200, width: '100%', display: 'flex', alignItems: 'center', backgroundColor: theme.palette.primary.main, pt: 3, px: 5, position: 'fixed', zIndex: 0 }}>
            {matchingItem && matchingItem.icon}
            {matchingItem && <Typography sx={{ color: 'white', fontFamily: 'Lato', mx: 3 }} variant='h5'>{matchingItem.title}</Typography>}
        </Box>
    );
};

export default Header;
