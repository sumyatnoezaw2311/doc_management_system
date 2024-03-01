// TwoItemsBox.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const TwoItemsBox = ({ label1, value1, label2, value2 }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box mr={5} sx={{ width: '50%' }}>
      <Typography variant="body1" mb={1} mt={2}>
        {label1}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {value1}
      </Typography>
    </Box>
    <Box sx={{ width: '50%' }}>
      <Typography variant="body1" mb={1} mt={2}>
        {label2}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {value2}
      </Typography>
    </Box>
  </Box>
);

export default TwoItemsBox;
