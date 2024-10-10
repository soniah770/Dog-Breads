import React from 'react';
import { Box, Typography } from '@mui/material';

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <Box sx={{ marginBottom: '4px' }}>
    <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 400, fontSize: '14px' }}>
      <strong>{label}:</strong> {value}
    </Typography>
  </Box>
);

export default DetailRow;

