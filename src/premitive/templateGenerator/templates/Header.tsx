import React from 'react';
import { Box, Typography } from '@mui/material';

const Header = ({ headerText, secondaryText1, secondaryText2 }: { headerText: string; secondaryText1: string; secondaryText2: string }) => {
  return (
    <Box sx={{ textAlign: 'left', padding: 1 }}> {/* Reduced padding */}
      {/* Header Text */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}> {/* Reduced marginBottom */}
        {headerText}
      </Typography>
      {/* Secondary Texts */}
      <Typography variant="caption" sx={{ color: 'gray', fontSize: '0.75rem' }}>
        {secondaryText1} | {secondaryText2}
      </Typography>
    </Box>
  );
};

export default Header;