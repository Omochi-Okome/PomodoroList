import React from 'react';
import {Grid, TextField } from '@material-ui/core';

const ToDoForm = ({inputValue, handleInputChange, }) => {
  return(
      <form action=''>
        <Grid container justifyContent='center'>
          <Grid item xs={3}>
            <TextField type='text' value={inputValue} onChange={handleInputChange} placeholder='Enter your to-do list!' fullWidth required/>
          </Grid>
        </Grid>
      </form>
  )
}

export default ToDoForm;
