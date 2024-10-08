// MaterialUI
import { Grid, TextField } from '@material-ui/core';

export default function ToDoForm ({ inputValue, handleInputChange }) {
  return (
    <form>
      <Grid container justifyContent='center'>
        <Grid item xs={3}>
          <TextField
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            placeholder='What do you need to accomplish today?'
            fullWidth
            required
          />
        </Grid>
      </Grid>
    </form>
  );
};