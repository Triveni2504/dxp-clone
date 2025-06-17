import { useState } from 'react';
import { Box, Button, Typography, IconButton, MenuItem, Select, FormControlLabel, Switch, FormControl, InputLabel } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import Header from './templates/Header';
import Tags from './templates/Tags';
import Email from './templates/Email';

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
  const [templateDropdown, setTemplateDropdown] = useState('Header'); // State for template dropdown

  const addColumn = () => {
    // Reset dropdown values to their defaults
    setAssetDetails('Asset 1');
    setDataType('string');
    setAlignment('left');
    setSize(1);

    // Calculate the maximum display order dynamically
    const maxDisplayOrder = columnData.length > 0
      ? Math.max(...columnData.map((col) => col.displayOrder || 0)) + 1
      : 1;

    // Add a column configuration to columnData
    const newColumnData = [
      ...columnData,
      {
        assetType: 'Asset 1',
        dataType: 'string',
        alignment: 'left',
        size: 1, // Use size instead of flex
        displayOrder: maxDisplayOrder, // Automatically set to the max display order
        useTemplate: false, // Default value for "Use Template" switch
        templateDropdown: 'Header', // Default value for template dropdown
      },
    ];

    // Update columnData state
    setColumnData(newColumnData);

    // Log the updated columnData for debugging
    console.log('Updated Column Data:', newColumnData);

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
        displayOrder: maxDisplayOrder, // Automatically set to the max display order
        booleanValue: false, // Default boolean value for switches
      },
    ];
    setPreviewItems(newPreviewItems);

    // Automatically select the newly added column
    const newColumnIndex = newColumns.length - 1; // Index of the newly added column
    setSelectedColumn(newColumnIndex);

    // Pass the updated columnData directly to loadColumnDataToTemplateConfig
    loadColumnDataToTemplateConfig(newColumnIndex, newColumnData);

    // Explicitly set the displayOrder dropdown to the highest value
    setDisplayOrder(maxDisplayOrder.toString());
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

      if (key === 'displayOrder') {
        const maxDisplayOrder = columns.length; // Maximum allowed displayOrder is the number of columns

        // Ensure displayOrder is within valid range
        if (value > maxDisplayOrder) {
          console.warn(`Invalid displayOrder: ${value}. Setting to maximum allowed value: ${maxDisplayOrder}`);
          value = maxDisplayOrder; // Adjust displayOrder to the maximum allowed value
        }

        const currentDisplayOrder = updatedColumnData[selectedColumn].displayOrder;

        // Update the selected column's displayOrder
        updatedColumnData[selectedColumn] = {
          ...updatedColumnData[selectedColumn],
          [key]: value,
        };

        // Shift conflicting items' displayOrder
        updatedColumnData.forEach((col, index) => {
          if (index !== selectedColumn && col.displayOrder === value) {
            if (value > currentDisplayOrder) {
              // Shift backward for higher conflicting displayOrder
              let nextAvailableOrder = value - 1;

              // Find the next available displayOrder moving backward
              while (updatedColumnData.some((item) => item.displayOrder === nextAvailableOrder)) {
                nextAvailableOrder--;
              }

              col.displayOrder = nextAvailableOrder; // Assign the next available displayOrder
            } else {
              // Shift forward for lower conflicting displayOrder
              let nextAvailableOrder = value + 1;

              // Find the next available displayOrder moving forward
              while (updatedColumnData.some((item) => item.displayOrder === nextAvailableOrder)) {
                nextAvailableOrder++;
              }

              col.displayOrder = nextAvailableOrder; // Assign the next available displayOrder
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

      console.log('Updated Column Data:', updatedColumnData); // Debugging log
    }
  };

  const loadColumnDataToTemplateConfig = (index: number, updatedColumnData: any[] = columnData) => {
    const selectedData = updatedColumnData[index];
    if (!selectedData) {
      console.error(`No column data found for index ${index}`);
      return;
    }

    console.log('Selected Column Data:', selectedData); // Log the columnData for the selected column
    console.log('Selected Column Index:', index);
    console.log('Column Data:', updatedColumnData);
    setAssetDetails(selectedData.assetType);
    setDataType(selectedData.dataType);
    setAlignment(selectedData.alignment);
    setSize(selectedData.size);
    setDisplayOrder(selectedData.displayOrder.toString());
    setUseTemplate(selectedData.useTemplate); // Load the "Use Template" state for the selected column
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
                if (index >= 0 && index < columnData.length) {
                  setSelectedColumn(index); // Set selected column
                  loadColumnDataToTemplateConfig(index); // Load column data into templateConfig
                } else {
                  console.error(`Invalid column index: ${index}`);
                }
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
                  checked={selectedColumn !== null ? columnData[selectedColumn]?.useTemplate : false}
                  onChange={(e) => updateColumnData('useTemplate', e.target.checked)} // Save useTemplate state to columnData
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
            {selectedColumn !== null && columnData[selectedColumn]?.useTemplate && (
              <FormControl sx={{ width: '200px' }}>
                <InputLabel id="template-select-label">Template</InputLabel>
                <Select
                  labelId="template-select-label"
                  id="template-select"
                  value={columnData[selectedColumn]?.templateDropdown || 'Header'}
                  onChange={(e) => updateColumnData('templateDropdown', e.target.value)} // Update templateDropdown in columnData
                  label="Template" // Add label prop to fix overlapping issue
                  displayEmpty
                >
                  <MenuItem value="Header">Header</MenuItem>
                  <MenuItem value="Tags">Tags</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                </Select>
              </FormControl>
            )}

            {selectedColumn !== null && !columnData[selectedColumn]?.useTemplate && (
              <>
                {/* Asset Type Dropdown */}
                <FormControl sx={{ width: '200px' }}>
                  <InputLabel id="asset-type-select-label">Asset Type</InputLabel>
                  <Select
                    labelId="asset-type-select-label"
                    id="asset-type-select"
                    value={assetDetails}
                    onChange={(e) => {
                      setAssetDetails(e.target.value);
                      updateColumnData('assetType', e.target.value);
                    }}
                    label="Asset Type" // Add label prop to fix overlapping issue
                    displayEmpty
                  >
                    <MenuItem value="Asset 1">Asset 1</MenuItem>
                    <MenuItem value="Asset 2">Asset 2</MenuItem>
                    <MenuItem value="Asset 3 TESTEST TESTEST TESTESTTESTEST TESTEST TESTEST TESTESTTESTEST">Asset 3</MenuItem>
                  </Select>
                </FormControl>

                {/* Data Type Dropdown */}
                <FormControl sx={{ width: '200px' }}>
                  <InputLabel id="data-type-select-label">Data Type</InputLabel>
                  <Select
                    labelId="data-type-select-label"
                    id="data-type-select"
                    value={dataType}
                    onChange={(e) => {
                      setDataType(e.target.value);
                      updateColumnData('dataType', e.target.value);
                    }}
                    label="Data Type" // Add label prop to fix overlapping issue
                    displayEmpty
                  >
                    <MenuItem value="string">String</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="boolean">Boolean</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}

            {/* Alignment Dropdown */}
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id="alignment-select-label">Alignment</InputLabel>
              <Select
                labelId="alignment-select-label"
                id="alignment-select"
                value={alignment}
                onChange={(e) => {
                  setAlignment(e.target.value);
                  updateColumnData('alignment', e.target.value);
                }}
                label="Alignment" // Add label prop to fix overlapping issue
                displayEmpty
              >
                <MenuItem value="left">Left</MenuItem>
                <MenuItem value="center">Center</MenuItem>
                <MenuItem value="right">Right</MenuItem>
              </Select>
            </FormControl>

            {/* Size Dropdown */}
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id="size-select-label">Size</InputLabel>
              <Select
                labelId="size-select-label"
                id="size-select"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                  updateColumnData('size', e.target.value);
                }}
                label="Size" // Add label prop to fix overlapping issue
                displayEmpty
              >
                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Display Order Dropdown */}
            <FormControl sx={{ width: '200px' }}>
              <InputLabel id="display-order-select-label">Display Order</InputLabel>
              <Select
                labelId="display-order-select-label"
                id="display-order-select"
                value={displayOrder}
                onChange={(e) => {
                  setDisplayOrder(e.target.value);
                  updateColumnData('displayOrder', e.target.value);
                }}
                label="Display Order" // Add label prop to fix overlapping issue
                displayEmpty
              >
                {columns.map((_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Preview Section */}
        {previewEnabled && (
          <Box sx={{ marginTop: 4, padding: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Preview
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {columnData
                .slice() // Create a copy of the array to avoid mutating the original
                .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)) // Sort by displayOrder
                .map((item, index) => {
                  if (item.useTemplate) {
                    // Render components from the template folder based on the templateDropdown value
                    const commonStyles = {
                      flex: equalSpacing ? '1 0 auto' : item.size, // Dynamically apply size
                      textAlign: item.alignment, // Dynamically apply alignment
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: 2,
                      backgroundColor: '#fff',
                    };

                    switch (item.templateDropdown) {
                      case 'Header':
                        return (
                          <Box key={index} sx={commonStyles}>
                            <Header
                              headerText="Header Text"
                              secondaryText1="Secondary Text 1"
                              secondaryText2="Secondary Text 2"
                            />
                          </Box>
                        );
                      case 'Tags':
                        return (
                          <Box key={index} sx={commonStyles}>
                            <Tags
                              tags={['Tag1', 'Tag2', 'Tag3']}
                              onDelete={(tag) => console.log(`Deleted tag: ${tag}`)}
                            />
                          </Box>
                        );
                      case 'Email':
                        return (
                          <Box key={index} sx={commonStyles}>
                            <Email email="example@example.com" />
                          </Box>
                        );
                      default:
                        return null;
                    }
                  } else {
                    // Render regular preview items
                    return (
                      <Box
                        key={index}
                        sx={{
                          flex: equalSpacing ? '1 0 auto' : item.size,
                          textAlign: item.alignment,
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          padding: 2,
                          backgroundColor: '#fff',
                          whiteSpace: truncate ? 'nowrap' : 'normal',
                          overflow: truncate ? 'hidden' : 'visible',
                          textOverflow: truncate ? 'ellipsis' : 'clip',
                          maxWidth: equalSpacing ? `${100 / previewItems.length}%` : 'none',
                        }}
                      >
                        {item.dataType === 'string' || item.dataType === 'number' ? (
                          <Box
                            sx={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.assetType}
                          </Box>
                        ) : item.dataType === 'boolean' ? (
                          <Switch
                            checked={item.booleanValue || false}
                            onChange={() => handleSwitchToggle(index)}
                          />
                        ) : null}
                      </Box>
                    );
                  }
                })}
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default LongCardTemplateGen;