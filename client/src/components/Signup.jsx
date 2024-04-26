import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <TextField id="standard-basic" label="Email" variant="standard"/>
    <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
      <InputLabel htmlFor="standard-adornment-password">
        Password
      </InputLabel>
      <Input
        id="standard-adornment-password"
        
        endAdornment={
          <InputAdornment position="end">
            
            <IconButton
              aria-label="toggle password visibility"
            >
            </IconButton>
          </InputAdornment>
        }
      />
      <Button type="submit" color="primary" variant="contained" fullWidth>
        サインイン
      </Button>
    </FormControl>
  </Box>
    )
}

export default Signup