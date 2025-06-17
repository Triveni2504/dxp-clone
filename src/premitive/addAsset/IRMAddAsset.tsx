import { useState } from 'react';
import { Box, Button } from '@mui/material'; // Added Button import
import { useNavigate } from 'react-router-dom'; // Added useNavigate import
import UploadSection from './UploadSection';
import IRMDocumentViewer from '../common/IRMDocumentViewer'; // Import the document viewer component

function IRMAddAsset() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [fileURL, setFileURL] = useState<string | null>(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    setSubmitted(false); // Reset preview if a new file is chosen
  };

  const handleSubmit = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setFileURL(url);
      setSubmitted(true);
    }
  };

  const handleBackClick = () => {
    navigate('/'); // Navigate back to the root
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 4, gap: 4 }}>
      {/* Back Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleBackClick} 
        sx={{ alignSelf: 'flex-start', mb: 2 }}
      >
        Back
      </Button>

      {/* Upload Section and Document Preview */}
      <Box sx={{ display: 'flex', flexGrow: 1, gap: 4 }}>
        <UploadSection
          selectedFile={selectedFile}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
        />
        {submitted && fileURL && selectedFile && (
          <IRMDocumentViewer fileURL={fileURL} selectedFile={selectedFile} />
        )}
      </Box>
    </Box>
  );
}

export default IRMAddAsset;