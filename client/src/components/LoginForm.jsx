import * as React from 'react';
import { useState, useEffect } from 'react';
import {useNavigate}from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
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

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const LoginForm = ({isSignup}) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChangeEmail = (event) => setInputEmail(event.target.value);
  const handleChangePassword = (event) => setInputPassword(event.target.value);
  
  const handleSignupClick = () => {
    navigate('/auth/signup');
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [])
  
  const submitUserInformation = (event) => {
    event.preventDefault();
    
    if(isSignup) {
      createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
        .then(() => {
          console.log('ユーザー登録に成功しました');
          navigate('/');
        })
        .catch((err) => console.log('firebaseでユーザー登録時にエラー発生',err));
    } else {
      signInWithEmailAndPassword(auth, inputEmail, inputPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('ログインに成功しました');
          console.log(user)
          navigate('/')
        })
        .catch(err => console.log('firebaseでサインイン時にエラー発生',err));
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