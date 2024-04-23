import { AppBar, Toolbar } from '@material-ui/core'
import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';


function TopBar() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navigate = useNavigate();
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);

        switch(index) {
            case 0:
                navigate("/login");
                break;
            case 1:
                navigate("/mypage");
                break;
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <List style={{marginLeft: 'auto',display:'flex', flexDirection: 'row'}}>
                    <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItemButton>
                    <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 1)}>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="large"/>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
