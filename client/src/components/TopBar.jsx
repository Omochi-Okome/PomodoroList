import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/* MaterialUI */
import { AppBar, Toolbar } from '@material-ui/core'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
/* MaterialUI icon */
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

function TopBar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    switch(index) {
      case 0:
        navigate('/auth/login');
        break;
      case 1:
        navigate('/auth/logout');
        break;
      case 2:
        navigate('/mypage');
        break;
    }
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <List style={{marginLeft: 'auto',display:'flex', flexDirection: 'row'}}>
          <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary='Login' />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(1)}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(2)}>
            <ListItemIcon>
              <AccountCircleIcon fontSize='large'/>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
