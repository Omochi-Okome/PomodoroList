import * as React from 'react';
import { useState, useMemo } from 'react';
import {useNavigate}from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
/* MaterialUI */
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm = ({isSignup}) => {
  const [input, setInput] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChangeEmail = (event) => {
    setInput(event.target.value)
  }

  const handleChangeUsername = (event) => {
    setInputUsername(event.target.value);
  }

  const handleChangePassword = (event) => {
    setInputPassword(event.target.value)
  }
  
  const submitUserInformation = () => {
    isSignup ? 
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`,{
        email: input,
        username: inputUsername,
        password: inputPassword,
      })
    : axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`,{
        emailUsername: input,
        password: inputPassword
      })
      .then(() => {
        console.log('送信に成功しました')
        navigate(`${process.env.REACT_APP_API_URL}/`)
      })
      .catch((err) => console.log('submitUserInformationのエラー:',err))
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
          <TextField id='standard-basic' label={isSignup ? 'Email' : 'Email or Username'} variant='standard' onChange={handleChangeEmail} required/>
          {isSignup ?
            <TextField label='Username' variant='standard' onChange={handleChangeUsername} required></TextField>
          :
          ''
          }
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
              />
                <Button onClick={() => submitUserInformation(input,inputPassword)} type='submit' color='primary' variant='contained' fullWidth>
                {isSignup ? 'サインアップ' : 'サインイン'}
                </Button>
          </FormControl>
      </Box>
  )
}

export default LoginForm;