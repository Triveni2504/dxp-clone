import React, { useState } from 'react';
import {
  Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Menu
} from '@mui/material';

interface FilterRowProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  handleMenuItemClick: (option: 'code' | 'document') => void;
  onSearchChange: (query: string) => void; // Add prop for search query change
}

const IRMHeader: React.FC<FilterRowProps> = ({
  anchorEl,
  open,
  handleMenuClick,
  handleClose,
  handleMenuItemClick,
  onSearchChange, // Receive the prop
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
      <Button
        variant="contained"
        sx={{ textTransform: 'none' }}
        onClick={handleMenuClick}
      >
        Add Asset
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuItemClick('code')}>Case</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('document')}>Document</MenuItem>
      </Menu>

      {/* Search Field */}
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search assets"
        sx={{ width: '30%' }}
        onChange={(e) => onSearchChange(e.target.value)} // Call onSearchChange on input change
      />

      {/* Dropdowns */}
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel shrink>Category</InputLabel> {/* Ensure label stays above */}
        <Select defaultValue="" inputProps={{ 'aria-label': 'Category' }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="doc">Document</MenuItem>
          <MenuItem value="img">Image</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel shrink>Type</InputLabel> {/* Ensure label stays above */}
        <Select defaultValue="" inputProps={{ 'aria-label': 'Type' }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pdf">PDF</MenuItem>
          <MenuItem value="docx">DOCX</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel shrink>Subtype</InputLabel> {/* Ensure label stays above */}
        <Select defaultValue="" inputProps={{ 'aria-label': 'Subtype' }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="conf">Confidential</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel shrink>Last Modified</InputLabel> {/* Ensure label stays above */}
        <Select defaultValue="" inputProps={{ 'aria-label': 'Last Modified' }}>
          <MenuItem value="desc">Newest</MenuItem>
          <MenuItem value="asc">Oldest</MenuItem>
        </Select>
      </FormControl>
      <Button variant="text">Reset</Button>
    </Box>
  );
};

export default IRMHeader;