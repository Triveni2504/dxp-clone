import React from 'react';
import {
  Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Menu
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FilterRowProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  handleMenuItemClick: (option: 'code' | 'document') => void;
}

const FilterRow: React.FC<FilterRowProps> = ({
  anchorEl,
  open,
  handleMenuClick,
  handleClose,
  handleMenuItemClick,
}) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('../IRMAssetViewer/IRMMultiViewer'); // Navigate to the IRMMultiViewer page
  };

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
      <Button
        variant="contained"
        sx={{ textTransform: 'none' }}
        onClick={handleViewClick} // Navigate on click
      >
        View
      </Button>
      <Button variant="contained" sx={{ textTransform: 'none' }}>Filter</Button>
      <Button variant="text">Reset</Button>
    </Box>
  );
};

export default FilterRow;
// import React from 'react';
// import {
//   Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, Menu
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// interface FilterRowProps {
//   anchorEl: HTMLElement | null;
//   open: boolean;
//   handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
//   handleClose: () => void;
//   handleMenuItemClick: (option: 'code' | 'document') => void;
// }

// const FilterRow: React.FC<FilterRowProps> = ({
//   anchorEl,
//   open,
//   handleMenuClick,
//   handleClose,
//   handleMenuItemClick,
// }) => {
//   const navigate = useNavigate();

//   const handleViewClick = () => {
//     navigate('/irm-multi-viewer'); // Navigate to the IRMMultiViewer page
//   };

//   return (
//     <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
//       <Button
//         variant="contained"
//         sx={{ textTransform: 'none' }}
//         onClick={handleMenuClick}
//       >
//         Add Asset
//       </Button>
//       <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
//         <MenuItem onClick={() => handleMenuItemClick('code')}>Code</MenuItem>
//         <MenuItem onClick={() => handleMenuItemClick('document')}>Document</MenuItem>
//       </Menu>

//       <TextField variant="outlined" size="small" placeholder="Search assets" sx={{ width: '30%' }} />
//       <FormControl size="small" sx={{ minWidth: 120 }}>
//         <InputLabel>Category</InputLabel>
//         <Select defaultValue="">
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="doc">Document</MenuItem>
//           <MenuItem value="img">Image</MenuItem>
//         </Select>
//       </FormControl>
//       <FormControl size="small" sx={{ minWidth: 120 }}>
//         <InputLabel>Type</InputLabel>
//         <Select defaultValue="">
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="pdf">PDF</MenuItem>
//           <MenuItem value="docx">DOCX</MenuItem>
//         </Select>
//       </FormControl>
//       <FormControl size="small" sx={{ minWidth: 120 }}>
//         <InputLabel>Subtype</InputLabel>
//         <Select defaultValue="">
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="conf">Confidential</MenuItem>
//         </Select>
//       </FormControl>
//       <FormControl size="small" sx={{ minWidth: 140 }}>
//         <InputLabel>Last Modified</InputLabel>
//         <Select defaultValue="">
//           <MenuItem value="desc">Newest</MenuItem>
//           <MenuItem value="asc">Oldest</MenuItem>
//         </Select>
//       </FormControl>
//       <Button
//         variant="contained"
//         sx={{ textTransform: 'none' }}
//         onClick={handleViewClick} // Navigate on click
//       >
//         View
//       </Button>
//       <Button variant="contained" sx={{ textTransform: 'none' }}>Filter</Button>
//       <Button variant="text">Reset</Button>
//     </Box>
//   );
// };

// export default FilterRow;