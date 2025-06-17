import React from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';

interface UploadSectionProps {
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
}

function UploadSection({ selectedFile, onFileChange, onSubmit }: UploadSectionProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant="h5" gutterBottom>
        Upload Document
      </Typography>
      <TextField
        type="file"
        fullWidth
        onChange={handleFileChange}
        inputProps={{ accept: '.pdf,.doc,.docx,image/*' }}
      />
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={onSubmit}
        disabled={!selectedFile}
      >
        Submit
      </Button>
    </Box>
  );
}

export default UploadSection;