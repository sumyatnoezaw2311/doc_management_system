import React from 'react';
import ReactDOM from 'react-dom';
import img from '../../assets/images/waitingImg.png';
import pdfFile from '../../assets/files/CV instruction.pdf'; // Adjust the path to your PDF file
import { Box, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { useSelector } from 'react-redux';

const AfterRegister = () => {
    const rootContainer = document.getElementById('root');
    const profileData = useSelector(state=> state.User.profile?.data)

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfFile;
        link.download = 'instruction.pdf';
        link.click();
    };

    return ReactDOM.createPortal(
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    whiteSpace: 'pre-wrap'
                }}
            >
                <img
                    srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${img}?w=248&fit=crop&auto=format`}
                    alt={'something went wrong'}
                    loading="lazy"
                />
                <Typography sx={{ textAlign: 'center' }} variant='h4' mb={2}>Signup Successful...</Typography>
                <Typography sx={{ textAlign: 'center' }} variant='body2' mb={1}>Wait for the admin's approve to create your CV form.</Typography>
                {
                    profileData?.is_engineer === '0' &&
                    <>
                        <Typography sx={{ textAlign: 'center' }} variant='body2' mb={3}>You can download the instruction file to fill out the CV form here.</Typography>
                        <Button variant='text' startIcon={<DownloadIcon />} onClick={handleDownload}>Download here</Button>
                    </>
                }                
            </Box>
        </Box>,
        rootContainer
    );
}

export default AfterRegister;
