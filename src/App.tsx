// import { useState } from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
// import apiInstance from './api/apiInstance';
// import IRMAssetExplorerCards from './premitive/assetExplorer/IRMAssetExplorerCards';
import LongCardTemplateGen from './premitive/templateGenerator/longCardTemplateGen';


function App() {
  return (
    // <IRMAssetExplorerCards />
    <Box sx={{width: "100%", border: "1px solid red"}}>
<LongCardTemplateGen />
    </Box>
    // 
  );
}

export default App;