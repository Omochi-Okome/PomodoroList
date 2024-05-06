import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
/* MaterialUI */
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function SelectedListItem() {
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);

    switch(index){
        case 0:
          navigate('/');
          break;
        case 1:
          navigate('/archive');
          break;
        case 2:
          navigate('/data');
          break;
        case 3:
          navigate('/setting');
          break; 
    }

  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component='nav' aria-label='main mailbox folders'>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={() => handleListItemClick(0)}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={() => handleListItemClick(1)}
        >
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary='Archive' />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={() => handleListItemClick(2)}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary='Data' />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={() => handleListItemClick(3)}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary='Setting' />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );
}

