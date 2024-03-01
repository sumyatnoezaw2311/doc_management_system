import React from 'react'
import { Grid, Box, Typography} from '@mui/material'
import cloverLogo from '../../assets/images/clover.png'

const CreateLayout = (props) => {
    return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                <img
                    width={250}
                    alt='clover mandalay'
                    src={cloverLogo}
                    loading="lazy"
                />
                <Typography variant='p'
                    width={"100%"}
                    sx={{ textAlign: 'left', textTransform: "capitalize" }}
                    marginTop={4}
                >{props.title}</Typography>
                <Typography variant='p'
                    width={'100%'}
                    sx={{ textAlign: 'left', textTransform: 'uppercase' }}
                    marginY={2}
                >{props.submTitle}</Typography>
                { props.children }
            </Box>
        </Grid>
    </Grid>
  )
}

export default CreateLayout
