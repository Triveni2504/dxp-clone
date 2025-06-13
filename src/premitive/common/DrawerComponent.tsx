import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material'; // Example using Material-UI

interface DrawerComponentProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ isOpen, toggleDrawer }) => {
    return (
        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
            <List>
                <ListItem component="button" onClick={toggleDrawer}>
                    <ListItemText primary="Item 1" />
                </ListItem>
                <ListItem component="button" onClick={toggleDrawer}>
                    <ListItemText primary="Item 2" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default DrawerComponent;