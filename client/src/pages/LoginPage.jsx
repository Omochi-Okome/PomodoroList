import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import LoginForm from '../components/LoginForm'


const LoginPage = () => {
    const [isSignup, setIsSignup] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navigate = useNavigate();
    const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    switch(index) {
        case 0:
        navigate('/signup');
        break;
    }
    };
          
    return(
        <>
            <LoginForm
                isSignup={isSignup}
            />
            <Button onClick={(event) => handleListItemClick(event, 0)}>サインアップ</Button>
        </>
    )
}

export default LoginPage;