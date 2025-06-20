import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IRMDocumentViewer from '../common/IRMDocumentViewer';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { useEffect, useState } from 'react';

function IRMAssetViewer() {
  const location = useLocation(); // Get state from navigation
  const { fileUUID } = location.state || {}; // Extract fileUUID from navigation state
  const [fileDetails, setFileDetails] = useState(null); // State for file details

  useEffect(() => {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    const file = uploadedFiles.find((f) => f.uuid === fileUUID);

    if (!file) {
      console.error('File not found in localStorage for fileUUID:', fileUUID); // Debug log
    } else {
      console.log('Loaded file details:', file); // Debug log
    }

    setFileDetails(file);
  }, [fileUUID]);

  return (
    <Box sx={{ display: 'flex', gap: 2, height: '100%', p: 2 }}>
      {/* Left Side: Document Viewer */}
      <Box sx={{ flex: '0 0 70%', border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
        {fileDetails?.fileURL ? (
          <IRMDocumentViewer fileURL={fileDetails.fileURL} selectedFile={new File([], fileDetails.name)} />
        ) : (
          <Typography variant="body1" color="textSecondary">
            No document preview available.
          </Typography>
        )}
      </Box>

      {/* Right Side: Accordion */}
      <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Details
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>File Name</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{fileDetails?.name || "No file selected"}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>File Size</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{fileDetails?.size ? `${fileDetails.size} bytes` : "No file selected"}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Creation Date</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{fileDetails?.creationDate || "No file selected"}</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default IRMAssetViewer;