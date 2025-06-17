import React from 'react';
import { Box, Chip } from '@mui/material';

const Tags = ({ tags, onDelete }: { tags: string[]; onDelete: (tag: string) => void }) => {
  // Function to generate a very light color
  const getRandomLightColor = () => {
    const r = Math.floor(Math.random() * 56) + 200; // Random value between 200-255
    const g = Math.floor(Math.random() * 56) + 200;
    const b = Math.floor(Math.random() * 56) + 200;
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}> {/* Reduced gap for linear layout */}
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          onDelete={() => onDelete(tag)} // Call the onDelete function with the tag
          sx={{
            fontSize: '0.7rem', // Smaller font size for compact design
            padding: '2px 0px', // Reduced padding for minimum width
            height: '24px', // Reduced height for compact design
            borderRadius: '10px', // Rounded corners for linear appearance
            backgroundColor: getRandomLightColor(), // Apply very light color
            color: '#000', // Ensure text is readable
            minWidth: 'auto', // Dynamically adjust width based on content
          }}
        />
      ))}
    </Box>
  );
};

export default Tags;