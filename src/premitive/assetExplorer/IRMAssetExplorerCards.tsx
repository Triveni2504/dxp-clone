import { useState } from 'react';
import IRMCardsList from './IRMCardsList';
import IRMAddAsset from '../addAsset/IRMAddAsset';
import IRMAssetViewer from '../assetViewer/IRMAssetViewer';
import { Box, Button } from '@mui/material';

const IRMAssetExplorerCards = () => {
  const [activeCard, setActiveCard] = useState('IRMCardsList'); // Default card is IRMCardsList

  const renderCard = () => {
    switch (activeCard) {
      case 'IRMAddAsset':
        return <IRMAddAsset />;
      case 'IRMAssetViewer':
        return <IRMAssetViewer />;
      default:
        return <IRMCardsList />;
    }
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f4f6f8' }}>
      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        {activeCard !== 'IRMCardsList' && (
          <Button variant="contained" onClick={() => setActiveCard('IRMCardsList')}>
            Back
          </Button>
        )}
      </Box>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {renderCard()}
      </Box>
      <Box sx={{ position: 'absolute', bottom: 16, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={() => setActiveCard('IRMCardsList')}>
          Show IRMCardsList
        </Button>
        <Button variant="contained" onClick={() => setActiveCard('IRMAddAsset')}>
          Show IRMAddAsset
        </Button>
        <Button variant="contained" onClick={() => setActiveCard('IRMAssetViewer')}>
          Show IRMAssetViewer
        </Button>
      </Box>
    </Box>
  );
};

export default IRMAssetExplorerCards;