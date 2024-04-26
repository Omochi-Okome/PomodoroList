import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import InputUser from '../components/LoginUser';
import { Button } from '@mui/material';


const LoginPage = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navigate = useNavigate();
    const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    switch(index) {
        case 0:
        navigate("/signup");
        break;
    }
    };
          
    return(
        <>
            <InputUser />
            <Button onClick={(event) => handleListItemClick(event, 0)}>サインアップ</Button>
        </>
    )
}

export default LoginPage;