import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const Email = ({ email }: { email: string }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex', // Ensures the box takes only necessary width
        alignItems: 'center',
        gap: 1, // Reduced gap for compact design
        paddingX: 1, // Horizontal padding
        paddingY: 0.5, // Vertical padding
        border: '1px solid #ddd',
        borderRadius: '50px', // Very rounded borders
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Smaller Avatar showing the first letter of the email */}
      <Avatar sx={{ width: 20, height: 20, fontSize: '0.6rem' }}> {/* Reduced size */}
        {email.charAt(0).toUpperCase()}
      </Avatar>
      {/* Email */}
      <Typography variant="body1" sx={{ fontSize: '0.75rem', color: '#333' }}> {/* Reduced font size */}
        {email}
      </Typography>
    </Box>
  );
};

export default Email;