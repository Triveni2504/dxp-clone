import { useState } from 'react';
import { Box, Typography, Snackbar, Alert, IconButton } from '@mui/material'; // Import IconButton
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import ArrowBackIcon
import { useNavigate } from 'react-router-dom';
import UploadSection from './UploadSection';
import IRMDocumentViewer from '../common/IRMDocumentViewer';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

function IRMAddAsset() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

  const navigate = useNavigate();

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    setSubmitted(false); // Reset preview if a new file is chosen
  };

  const handleSubmit = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setFileURL(url);
      setSubmitted(true);

      // Save metadata to localStorage
      const metadata = {
        uuid: uuidv4(),
        name: selectedFile.name,
        extension: selectedFile.name.split('.').pop(),
        creationDate: new Date().toISOString(),
        size: selectedFile.size,
        type: selectedFile.type,
        fileURL: url, // Include file URL in metadata
      };

      const existingMetadata = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      localStorage.setItem('uploadedFiles', JSON.stringify([...existingMetadata, metadata]));

      // Show snackbar
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close the snackbar
  };

  const handleBackClick = () => {
    navigate('/'); // Navigate back to the root
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: 4,
        gap: 4,
        overflow: 'hidden', // Prevent vertical overflow
      }}
    >
      {/* Back Button */}
      <IconButton onClick={handleBackClick} sx={{ alignSelf: 'flex-start' }}>
        <ArrowBackIcon />
      </IconButton>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexGrow: 1, gap: 4, height: '100%' }}>
        {/* Left Panel */}
        <Box
          sx={{
            flex: '0 0 30%',
            border: '1px solid #ccc',
            borderRadius: 2,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%', // Ensure left panel takes full height
            overflow: 'auto', // Allow scrolling if content overflows
          }}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'application/pdf') {
              handleFileChange(file);
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <UploadSection
            selectedFile={selectedFile}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
          />
        </Box>

        {/* Right Panel */}
        <Box
          sx={{
            flex: 1,
            border: '1px solid #ccc',
            borderRadius: 2,
            padding: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%', // Ensure the right panel takes full height
            overflow: 'hidden', // Prevent overflow in the right panel
          }}
        >
          {submitted && fileURL && selectedFile ? (
            <IRMDocumentViewer
              fileURL={fileURL}
              selectedFile={selectedFile}
              sx={{ height: '100%' }} // Ensure IRMDocumentViewer takes full height
            />
          ) : (
            <Typography variant="body1" color="textSecondary">
              No document preview available. Please upload a file.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Automatically hide after 3 seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at top center
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Document uploaded successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default IRMAddAsset;