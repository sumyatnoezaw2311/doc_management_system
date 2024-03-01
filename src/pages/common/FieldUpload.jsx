import React from "react";
import { Box, Button, FormHelperText, Typography } from "@mui/material";
import CollectionsIcon from '@mui/icons-material/Collections';


const FieldUpload = ({ label, accept, onChange, error, helperText }) => {
    return (<Box
                sx={{
                    width: '100%',
                    height: '200px',
                    border: '1px dotted #666666',
                    borderRadius: 1,
                    marginY: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                <CollectionsIcon sx={{ color: '#666666' }} />
                <Button component="label" variant="text" sx={{ marginY: 1 }}>
                    {label ? label : `Upload ${helperText}`}
                    <input type="file" accept={accept} onChange={onChange} style={{ display: 'none' }} />
                </Button>
                <Typography sx={{ marginBottom: 1, fontSize: '14px' }} color={'#666666'} variant="small">
                    {helperText}
                </Typography>
                <FormHelperText error={!!error}>{error?.message}</FormHelperText>
            </Box>
)}

export default FieldUpload