import { Box, Typography } from '@mui/material';

interface DocumentPreviewProps {
  fileURL: string;
  selectedFile: File;
}

function IRMDocumentViewer({ fileURL, selectedFile }: DocumentPreviewProps) {
  return (
    <Box
      sx={{
        flex: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        p: 2,
        height: '100%', // Ensure the container takes full height
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
          style={{
            height: '100%', // Ensure iframe takes full height
            border: 'none',
            flexGrow: 1, // Allow iframe to grow within the container
          }}
        />
      ) : (
        <Typography variant="body1">
          Preview not available for this file type.
        </Typography>
      )}
    </Box>
  );
}

export default IRMDocumentViewer;

// import { Box, Typography } from '@mui/material';
// import { useEffect, useRef } from 'react';
// import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';

// interface DocumentPreviewProps {
//   fileURL: string;
//   selectedFile: File;
// }

// function DocumentPreview({ fileURL, selectedFile }: DocumentPreviewProps) {
//   const viewerRef = useRef<HTMLDivElement>(null);
//   const hasInitialised = useRef(false);
//   const viewerInstance = useRef(null);
//   const docFile = "/search.pdf"
//   useEffect(() => {
//     if (!hasInitialised.current) {
//       hasInitialised.current = true;
//       if (viewerRef.current) {
//         // Initialize WebViewer
//         WebViewer(
//           {
//             path: '/lib', // Path to the WebViewer lib folder
//             initialDoc: "", // Use a default document for initial load
//             //initialDoc: fileURL,
//             extension: 'pdf',
//             licenseKey: "demo:1750152984254:61df0ca50300000000126169e60acdef2407ef069de56a09175feb65b5",
//             enableOfficeEditing: false

//           },
//           viewerRef.current
//         ).then((instance: WebViewerInstance) => {
//           viewerInstance.current = instance;
//           const { documentViewer } = instance.Core;

//           documentViewer.addEventListener('documentLoaded', () => {
//             // perform document operations
//           });
//         })
//           .catch((error) => {
//             console.error('Error initializing WebViewer:', error);
//           });
//       }
//     }
//   }, []);
//   useEffect(() => {
    
//     if (selectedFile.type === 'application/pdf' && viewerRef.current && viewerInstance.current) { 
//     viewerInstance.current.UI.loadDocument(docFile,'search.pdf')
//     }
//   }, [fileURL, selectedFile]);

//   return (
//     <Box sx={{ flex: 2, border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Document Preview
//       </Typography>
//       {selectedFile.type.startsWith('image/') ? (
//         <img
//           src={fileURL}
//           alt="Uploaded preview"
//           style={{ width: '100%', height: 'auto', borderRadius: 8 }}
//         />
//       ) : selectedFile.type === 'application/pdf' ? (
//         <Box
//           ref={viewerRef}
//           sx={{
//             width: '100%',
//             height: '500px',
//             border: '1px solid #ddd',
//             borderRadius: 2,
//           }}
//         />
//       ) : (
//         <Typography variant="body1">
//           Preview not available for this file type.
//         </Typography>
//       )}
//     </Box>
//   );
// }

// export default DocumentPreview;