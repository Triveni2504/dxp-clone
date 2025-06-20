import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import InfiniteScrollList from '../common/InfiniteScrollList';
import { Box, Checkbox, Typography, IconButton } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // Import PDF icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon
import { Sparklines, SparklinesLine } from 'react-sparklines'; // Import Sparklines for sparkline charts

// Define the type for uploaded file metadata
interface UploadedFile {
  uuid: string;
  name: string;
  extension: string;
  creationDate: string;
  size: number; // Size in bytes
  type: string;
  fileURL: string; // Add file URL for navigation
}

interface IRMAssetExplorerCardsProps {
  searchQuery: string; // Add prop for search query
}

const IRMAssetExplorerCards: React.FC<IRMAssetExplorerCardsProps> = ({ searchQuery }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [hasMore, setHasMore] = useState(false); // No pagination for localStorage data
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Load uploaded files from localStorage on component mount
    const existingMetadata = JSON.parse(localStorage.getItem('uploadedFiles') || '[]') as UploadedFile[];
    setUploadedFiles(existingMetadata);
  }, []);

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Helper function to format size in MB
  const formatSize = (sizeInBytes: number): string => {
    const sizeInMB = sizeInBytes / (1024 * 1024); // Convert bytes to MB
    return `${sizeInMB.toFixed(2)} MB`; // Format to 2 decimal places
  };

  // Helper function to generate random data for sparkline charts
  const generateRandomData = (): number[] => {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  };

  // Function to handle item deletion
  const handleDelete = (uuid: string) => {
    const updatedFiles = uploadedFiles.filter((file) => file.uuid !== uuid);
    setUploadedFiles(updatedFiles);
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles)); // Update localStorage
  };

  // Handle row double-click to navigate to asset viewer
  const handleRowDoubleClick = (file: UploadedFile) => {
    console.log('Navigating with fileUUID:', file.uuid); // Debug log
    navigate('/asset-viewer', { state: { fileUUID: file.uuid } }); // Pass fileUUID
  };

  const filteredFiles = uploadedFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <InfiniteScrollList
      items={filteredFiles}
      next={() => {}} // No pagination, so no fetch logic
      hasMore={hasMore}
      renderItem={(file) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: 1,
            border: '1px solid #ccc',
            borderRadius: 2,
            cursor: 'pointer', // Add pointer cursor for rows
          }}
          onDoubleClick={() => handleRowDoubleClick(file)} // Handle double-click
        >
          {/* Checkbox */}
          <Checkbox />

          {/* File Name and Details */}
          <Box sx={{ flex: 1, marginLeft: 1, display: 'flex', alignItems: 'center' }}>
            <PictureAsPdfIcon sx={{ marginRight: 1, color: 'red' }} /> {/* PDF Icon */}
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {file.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Size: {formatSize(file.size)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created: {formatDate(file.creationDate)}
              </Typography>
            </Box>
          </Box>

          {/* Sparkline Chart */}
          <Box sx={{ marginLeft: 2 }}>
            <Sparklines data={generateRandomData()} width={100} height={20}>
              <SparklinesLine color="blue" />
            </Sparklines>
          </Box>

          {/* Version */}
          <Typography variant="body2" sx={{ marginLeft: 2, fontWeight: 'bold' }}>
            Version 1.0
          </Typography>

          {/* Delete Button */}
          <IconButton onClick={() => handleDelete(file.uuid)} sx={{ marginLeft: 2 }}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
    />
  );
};

export default IRMAssetExplorerCards;
