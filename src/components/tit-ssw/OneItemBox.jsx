// PersonalInfo.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const OneItemBox = ({ label, value }) => (
  <Box>
    <Typography variant="body1" mb={1} mt={2}>
      {label}
    </Typography>
    <Typography color="text.secondary" variant="body2">
      {value}
    </Typography>
  </Box>
);

export default OneItemBox;
