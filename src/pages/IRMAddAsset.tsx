import { useState } from 'react';
import { Box } from '@mui/material';
import UploadSection from './UploadSection';
import DocumentPreview from './IRMdocumentviewer';

function IRMAddAsset() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [fileURL, setFileURL] = useState<string | null>(null);

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

  return (
    <Box sx={{ display: 'flex', height: '100vh', padding: 4, gap: 4 }}>
      <UploadSection
        selectedFile={selectedFile}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
      />
      {submitted && fileURL && selectedFile && (
        <DocumentPreview fileURL={fileURL} selectedFile={selectedFile} />
      )}
    </Box>
  );
}

export default IRMAddAsset;