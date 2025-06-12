import { useEffect, useState } from 'react'
import apiInstance from './api/apiInstance';
import IRMAssetExplorerCards from './premitive/assetExplorer/IRMAssetExplorerCards';

function App() {

  useEffect(() => {
    apiInstance.get('/posts')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <IRMAssetExplorerCards />
    </>
  )
}

export default App;