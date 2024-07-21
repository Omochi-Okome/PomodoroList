import React from "react";
//MaterialUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
//MaterialUI icon
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
//External CSSfile
import '../ArchiveList/ArchiveList.css';

const ArchiveItem = ({archiveList, returnHome, deleteCard}) => {
  return(
    <Grid container spacing={2}>
    {archiveList.length === 0 ? (
      <Grid item>
        <h2>There is no archive list</h2>
      </Grid>
    ) : (
      archiveList.map((archive) => (
        <Grid item key={archive._id}>
          <Card variant='outlined' className='card'>
            <CardContent>
              <Typography variant='body1'>{archive.item}</Typography>
              <Button variant='outlined' color='primary' onClick={() => returnHome(archive._id, archive.item, archive.registerDate, archive.pomodoroCount)} startIcon={<KeyboardReturnIcon/>}>Return</Button>
              <Button variant='contained' color='error' onClick={()=> deleteCard(archive._id)} startIcon={<DeleteIcon />}>Delete</Button>
            </CardContent>
          </Card>
        </Grid>
      ))
    )}
    </Grid>
  )
}

export default ArchiveItem;