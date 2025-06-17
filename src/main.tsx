import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import AddDocumentPage from './premitive/addAsset/IRMAddAsset.tsx'; // Ensure this path matches your folder structure
import IRMAssetViewer from './premitive/assetViewer/IRMAssetViewer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-document" element={<AddDocumentPage />} />
        <Route path="/asset-viewer" element={<IRMAssetViewer />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
