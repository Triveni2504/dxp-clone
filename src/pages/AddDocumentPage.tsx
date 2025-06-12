import { useState } from 'react';
import {
  Box, Button, Typography, TextField
} from '@mui/material';

function AddDocumentPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [fileURL, setFileURL] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSubmitted(false); // Reset preview if a new file is chosen
    }
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
      {/* Upload Section */}
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
          onClick={handleSubmit}
          disabled={!selectedFile}
        >
          Submit
        </Button>
      </Box>

      {/* Preview Section */}
      {submitted && fileURL && (
        <Box sx={{ flex: 2, border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Document Preview
          </Typography>
          {selectedFile?.type.startsWith('image/') ? (
            <img
              src={fileURL}
              alt="Uploaded preview"
              style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            />
          ) : selectedFile?.type === 'application/pdf' ? (
            <iframe
              src={fileURL}
              title="PDF Preview"
              width="100%"
              height="500px"
              style={{ border: 'none' }}
            />
          ) : (
            <Typography variant="body1">
              Preview not available for this file type.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default AddDocumentPage;
