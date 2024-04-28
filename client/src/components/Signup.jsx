import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signup = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const handleChangeEmail = (event) => {
    setInputEmail(event.target.value)
  }

  const handleChangePassword = (event) => {
    setInputPassword(event.target.value)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitUserInformation = () => {
    axios
      .post("http://localhost:3001/auth/signup",{
        email: inputEmail,
        password: inputPassword,
        credentials: 'include'
      })
      .then(() => {
        console.log("送信に成功しました")
      })
      .catch((err) => console.log("submitUserInformationのエラー:",err))
  }

    return(
        <Box
    component="form"
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& > :not(style)": { m: 1, width: "25ch" },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField id="standard-basic" label="Email" variant="standard" onChange={handleChangeEmail}/>
    <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
      <InputLabel htmlFor="standard-adornment-password">
        Password
      </InputLabel>
      <Input
        id="standard-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
            {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        onChange={handleChangePassword}
      />
      <Button onClick={() => submitUserInformation(inputEmail,inputPassword)} type="submit" color="primary" variant="contained" fullWidth>
        サインアップ
      </Button>
    </FormControl>
  </Box>
    )
}

export default Signup