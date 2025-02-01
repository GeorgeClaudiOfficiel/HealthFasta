import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Box sx={{ width: 240, bgcolor: '#fff', height: '100vh', boxShadow: 1 }}>
            <List>
                {/* <ListItem button component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard" />
                </ListItem> */}
                <ListItem button component={Link} to="/patients">
                    <ListItemText primary="Patients" />
                </ListItem>
                <ListItem button component={Link} to="/reports">
                    <ListItemText primary="Reports" />
                </ListItem>
                <ListItem button component={Link} to="/settings">
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
