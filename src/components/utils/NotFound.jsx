import React from 'react';
import ReactDOM from 'react-dom';
import img from '../../assets/images/notFound.png'
import { Box, Typography } from '@mui/material';

const NotFound = () => {
    const rootContainer = document.getElementById('root');

    return ReactDOM.createPortal(
        <Box
            sx={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                    srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${img}?w=248&fit=crop&auto=format`}
                    alt={'something went wrong'}
                    loading="lazy"  
                />
                <Typography variant='h4' mb={3}>မှားယွင်းနေပါသည်</Typography>
                <Typography>ဤစာမျက်နှာကိုမတွေ့ရှိပါ....</Typography>
            </Box>
        </Box>,
        rootContainer
    );
}

export default NotFound