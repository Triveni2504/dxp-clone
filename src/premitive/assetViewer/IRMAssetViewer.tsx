import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IRMDocumentViewer from '../common/IRMDocumentViewer';

interface DocumentViewerWithAccordionProps {
  fileURL?: string;
  selectedFile?: File | null;
}

function IRMAssetViewer({ fileURL = "", selectedFile = null }: DocumentViewerWithAccordionProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, height: '100%', p: 2 }}>
      {/* Left Side: Document Viewer */}
      <IRMDocumentViewer fileURL={fileURL} selectedFile={selectedFile || new File([], "")} />

      {/* Right Side: Accordion */}
      <Box sx={{ flex: 1, border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Details
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Section 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Sample data for Section 1. You can replace this with dynamic content later.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Section 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Sample data for Section 2. You can replace this with dynamic content later.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Section 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Sample data for Section 3. You can replace this with dynamic content later.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default IRMAssetViewer;