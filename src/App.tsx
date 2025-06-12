import { useState, useEffect, MouseEvent } from 'react';
import {
  Box, Typography, Drawer, List, ListItem, ListItemIcon,
  TextField, Button, Select, MenuItem, InputLabel, FormControl, Menu
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import apiInstance from './api/apiInstance';
import IRMAssetExplorerCards from './premitive/assetExplorer/IRMAssetExplorerCards';

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

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
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

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f4f6f8' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 60,
            boxSizing: 'border-box',
            backgroundColor: '#0d47a1',
            color: '#fff',
            alignItems: 'center',
          },
        }}
      >
        <List>
          <ListItem button><ListItemIcon sx={{ color: '#fff' }}><MenuIcon /></ListItemIcon></ListItem>
          <ListItem button><ListItemIcon sx={{ color: '#fff' }}><SearchIcon /></ListItemIcon></ListItem>
          <ListItem button><ListItemIcon sx={{ color: '#fff' }}><SettingsIcon /></ListItemIcon></ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom>Asset Explorer</Typography>

        {/* Add Asset + Filter Row */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <Button
            variant="contained"
            sx={{ textTransform: 'none' }}
            onClick={handleMenuClick}
          >
            Add Asset
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={() => handleMenuItemClick('code')}>Code</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('document')}>Document</MenuItem>
          </Menu>

          <TextField variant="outlined" size="small" placeholder="Search assets" sx={{ width: '30%' }} />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select defaultValue="">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="doc">Document</MenuItem>
              <MenuItem value="img">Image</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select defaultValue="">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="docx">DOCX</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Subtype</InputLabel>
            <Select defaultValue="">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="conf">Confidential</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Last Modified</InputLabel>
            <Select defaultValue="">
              <MenuItem value="desc">Newest</MenuItem>
              <MenuItem value="asc">Oldest</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select defaultValue="">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="extracted">Extracted</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" sx={{ textTransform: 'none' }}>Filter</Button>
          <Button variant="text">Reset</Button>
        </Box>

        {/* Asset Cards */}
        <IRMAssetExplorerCards />
      </Box>
    </Box>
  );
}

export default App;
