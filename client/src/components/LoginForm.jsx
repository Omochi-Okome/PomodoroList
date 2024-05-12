import * as React from 'react';
import { useState } from 'react';
import {useNavigate}from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
/* MaterialUI */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
/* MaterialUI icon */
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm = ({isSignup}) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChangeEmail = (event) => setInputEmail(event.target.value);

  const handleChangePassword = (event) => setInputPassword(event.target.value);
  
  const handleSignupClick = () => {
        navigate('/signup');
    }
  
  const submitUserInformation = (event) => {
    event.preventDefault();
    
    if(isSignup) {
      createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
        .then((userCredential) => {
          const user = userCredential.inputEmail;
          console.log('ユーザー登録に成功しました');
        })
        .catch((err) => console.log('firebaseでエラー発生',err));
    }
  }
  return(
    <Box
      onSubmit={submitUserInformation}
      component='form'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField id='standard-basic' label='Email' variant='standard' onChange={handleChangeEmail} required/>
        <FormControl sx={{ m: 1, width: '25ch' }} variant='standard'>
          <InputLabel htmlFor='standard-adornment-password' required>
            Password
          </InputLabel>
          <Input
            id='standard-adornment-password'
            type={showPassword ? 'text' : 'password'}
            endAdornment={
            <InputAdornment position='end'>
                <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
            }
            onChange={handleChangePassword}
            required
          />
          <Button type='submit' color='primary' variant='contained' fullWidth>
          {isSignup ? 'サインアップ' : 'サインイン'}
          </Button>
          {isSignup ? '' : <Button onClick={() => handleSignupClick()}>サインアップ</Button>}
        </FormControl>
    </Box>
  )
}

export default LoginForm;