import { useState } from 'react';
import { Box, Button, Typography, IconButton, MenuItem, Select, FormControlLabel, Switch } from '@mui/material';
import { FaTrash } from 'react-icons/fa';

const LongCardTemplateGen = () => {
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null); // State to track selected column
  const [columnData, setColumnData] = useState<any[]>([]); // Array to store column configurations
  const [useTemplate, setUseTemplate] = useState(false);
  const [equalSpacing, setEqualSpacing] = useState(false);
  const [truncate, setTruncate] = useState(false);
  const [previewEnabled, setPreviewEnabled] = useState(true); // Default value set to true
  const [assetDetails, setAssetDetails] = useState('Asset 1'); // Default value set to first item
  const [dataType, setDataType] = useState('string'); // Default value set to first item
  const [alignment, setAlignment] = useState('left'); // Default value set to first item
  const [size, setSize] = useState(1); // Default value set to first item
  const [displayOrder, setDisplayOrder] = useState('');
  const [previewItems, setPreviewItems] = useState<any[]>([]); // State for preview items

  const addColumn = () => {
    // Reset dropdown values to their defaults
    setAssetDetails('Asset 1');
    setDataType('string');
    setAlignment('left');
    setSize(1);

    // Add a column configuration to columnData
    const newColumnData = [
      ...columnData,
      {
        assetType: 'Asset 1',
        dataType: 'string',
        alignment: 'left',
        size: 1, // Use size instead of flex
        displayOrder: columnData.length + 1, // Default display order
      },
    ];
    setColumnData(newColumnData);

    // Add a column to the list
    const newColumns = [...columns, `Column ${columns.length + 1}`];
    setColumns(newColumns);

    // Add a preview item corresponding to the new column
    const newPreviewItems = [
      ...previewItems,
      {
        assetType: 'Asset 1',
        alignment: 'left',
        dataType: 'string',
        size: 1, // Use size instead of flex
        displayOrder: previewItems.length + 1, // Default display order
        booleanValue: false, // Default boolean value for switches
      },
    ];
    setPreviewItems(newPreviewItems);

    // Automatically select the newly added column
    const newColumnIndex = newColumns.length - 1; // Index of the newly added column
    setSelectedColumn(newColumnIndex);

    // Load the new column's data into the templateConfig section
    loadColumnDataToTemplateConfig(newColumnIndex);
  };

  const deleteColumn = (index: number) => {
    setColumns(columns.filter((_, colIndex) => colIndex !== index));
    setColumnData(columnData.filter((_, colIndex) => colIndex !== index));
    setPreviewItems(previewItems.filter((_, itemIndex) => itemIndex !== index));
    if (selectedColumn === index) {
      setSelectedColumn(null); // Reset selected column if deleted
    }
  };

  const updateColumnData = (key: string, value: any) => {
    if (selectedColumn !== null) {
      const updatedColumnData = [...columnData];
      const updatedPreviewItems = [...previewItems];

      if (key === 'displayOrder') {
        // Adjust the displayOrder of other items
        const currentOrder = updatedPreviewItems[selectedColumn].displayOrder;
        updatedPreviewItems.forEach((item, index) => {
          if (index !== selectedColumn) {
            if (item.displayOrder === value) {
              item.displayOrder = currentOrder; // Swap the order
            }
          }
        });
      }

      // Update the selected column's data
      updatedColumnData[selectedColumn] = {
        ...updatedColumnData[selectedColumn],
        [key]: value,
      };
      setColumnData(updatedColumnData);

      // Update the corresponding preview item
      updatedPreviewItems[selectedColumn] = {
        ...updatedPreviewItems[selectedColumn],
        [key]: value,
      };
      setPreviewItems(updatedPreviewItems);

      console.log('Updated Preview Items:', updatedPreviewItems); // Debugging log
    }
  };

  const loadColumnDataToTemplateConfig = (index: number) => {
    const selectedData = columnData[index];
    console.log('Selected Column Data:', selectedData); // Log the columnData for the selected column
    setAssetDetails(selectedData.assetType);
    setDataType(selectedData.dataType);
    setAlignment(selectedData.alignment);
    setSize(selectedData.size);
    setDisplayOrder(index + 1); // Assuming display order corresponds to column index + 1
  };

  const handleSwitchToggle = (index: number) => {
    const updatedPreviewItems = [...previewItems];
    updatedPreviewItems[index] = {
      ...updatedPreviewItems[index],
      booleanValue: !updatedPreviewItems[index].booleanValue, // Toggle the boolean value
    };
    setPreviewItems(updatedPreviewItems);
  };

  return (
    <div>
      <h1>Long-card Generator</h1>

      <Box sx={{ width: '100%', padding: 2 }}>
        {/* Toolbar */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, marginBottom: 2 }}>
          <Button variant="contained" onClick={addColumn}>
            Add Columns
          </Button>
          <FormControlLabel
            control={
              <Switch
                checked={previewEnabled}
                onChange={(e) => setPreviewEnabled(e.target.checked)}
                color="primary"
              />
            }
            label="Preview"
          />
        </Box>

        {/* Row Template */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 2,
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
          }}
        >
          {columns.map((col, index) => (
            <Box
              key={index}
              onClick={() => {
                setSelectedColumn(index); // Set selected column
                loadColumnDataToTemplateConfig(index); // Load column data into templateConfig
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                padding: 1,
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: selectedColumn === index ? '#e0f7fa' : '#fff', // Highlight selected column
                width: '150px',
                cursor: 'pointer', // Add pointer cursor for better UX
              }}
            >
              <Typography>{col}</Typography>
              <IconButton onClick={() => deleteColumn(index)} size="small" color="error">
                <FaTrash />
              </IconButton>
            </Box>
          ))}
        </Box>

        {/* Template Config */}
        <Box sx={{ marginTop: 4, padding: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Template Config
          </Typography>

          {/* First Row: Switches */}
          <Box sx={{ marginBottom: 2, display: 'flex', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={useTemplate}
                  onChange={(e) => setUseTemplate(e.target.checked)}
                  color="primary"
                />
              }
              label="Use Template"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={equalSpacing}
                  onChange={(e) => setEqualSpacing(e.target.checked)}
                  color="primary"
                />
              }
              label="Equal Spacing"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={truncate}
                  onChange={(e) => setTruncate(e.target.checked)}
                  color="primary"
                />
              }
              label="Truncate"
            />
          </Box>

          {/* Second Row: Form Fields */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Select
              value={assetDetails}
              onChange={(e) => {
                setAssetDetails(e.target.value);
                updateColumnData('assetType', e.target.value);
              }}
              displayEmpty
              sx={{ width: '200px' }}
            >
              <MenuItem value="Asset 1">Asset 1</MenuItem>
              <MenuItem value="Asset 2">Asset 2</MenuItem>
              <MenuItem value="Asset 3">Asset 3</MenuItem>
            </Select>

            <Select
              value={dataType}
              onChange={(e) => {
                setDataType(e.target.value);
                updateColumnData('dataType', e.target.value);
              }}
              displayEmpty
              sx={{ width: '200px' }}
            >
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="boolean">Boolean</MenuItem>
            </Select>

            <Select
              value={alignment}
              onChange={(e) => {
                setAlignment(e.target.value);
                updateColumnData('alignment', e.target.value);
              }}
              displayEmpty
              sx={{ width: '200px' }}
            >
              <MenuItem value="left">Left</MenuItem>
              <MenuItem value="center">Center</MenuItem>
              <MenuItem value="right">Right</MenuItem>
            </Select>

            <Select
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                updateColumnData('size', e.target.value);
              }}
              displayEmpty
              sx={{ width: '200px' }}
            >
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={displayOrder}
              onChange={(e) => {
                setDisplayOrder(e.target.value);
                updateColumnData('displayOrder', e.target.value);
              }}
              displayEmpty
              sx={{ width: '200px' }}
            >
              <MenuItem value="" disabled>
                Select Display Order
              </MenuItem>
              {columns.map((_, i) => (
                <MenuItem key={i} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Preview Section */}
        {previewEnabled && (
          <Box sx={{ marginTop: 4, padding: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Preview
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {previewItems
                .slice() // Create a copy of the array to avoid mutating the original
                .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) // Sort by displayOrder
                .map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: item.size, // Use size to determine flex value
                      textAlign: item.alignment, // Align items based on the alignment value
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: 2,
                      backgroundColor: '#fff',
                    }}
                  >
                    {item.dataType === 'string' || item.dataType === 'number' ? (
                      <Typography>{item.assetType}</Typography>
                    ) : item.dataType === 'boolean' ? (
                      <Switch
                        checked={item.booleanValue || false} // Use the booleanValue property
                        onChange={() => handleSwitchToggle(index)} // Handle switch toggle
                      />
                    ) : null}
                  </Box>
                ))}
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default LongCardTemplateGen;