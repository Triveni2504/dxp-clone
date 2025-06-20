import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiInstance from './api/apiInstance';
import IRMAssetExplorerCards from './premitive/assetExplorer/IRMAssetExplorerCards';
import IRMHeader from './premitive/header/IRMHeader';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    apiInstance.get('/posts')
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }, []);

  // Menu anchor and state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: 'code' | 'document') => {
    handleClose();
    if (option === 'document') {
      navigate('/add-document');
    }
    // You can handle 'code' navigation here later
  };

  // Search query state
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f4f6f8' }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>Asset Explorer</Typography>

        {/* Filter Row */}
        <IRMHeader
          anchorEl={anchorEl}
          open={open}
          handleMenuClick={handleMenuClick}
          handleClose={handleClose}
          handleMenuItemClick={handleMenuItemClick}
          onSearchChange={setSearchQuery} // Pass search query handler
        />

        {/* Asset Cards */}
        <IRMAssetExplorerCards searchQuery={searchQuery} /> {/* Pass search query */}
      </Box>
    </Box>
  );
}

export default App;