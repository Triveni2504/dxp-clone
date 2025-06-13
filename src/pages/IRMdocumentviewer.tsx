import { Box, Typography } from '@mui/material';

interface DocumentPreviewProps {
  fileURL: string;
  selectedFile: File;
}

function DocumentPreview({ fileURL, selectedFile }: DocumentPreviewProps) {
  return (
    <Box sx={{ flex: 2, border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Document Preview
      </Typography>
      {selectedFile.type.startsWith('image/') ? (
        <img
          src={fileURL}
          alt="Uploaded preview"
          style={{ width: '100%', height: 'auto', borderRadius: 8 }}
        />
      ) : selectedFile.type === 'application/pdf' ? (
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
  );
}

export default DocumentPreview;