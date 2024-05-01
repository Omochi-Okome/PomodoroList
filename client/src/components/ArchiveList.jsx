import React, { useState, useEffect } from 'react';
import axios from 'axios';
/* MaterialUI */
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const useStyles = makeStyles({
  card: {
    width: 300,
    margin: '20px auto',
    textAlign: 'center',
  },
});

const ArchiveList = () => {
  const [archiveList, setArchiveList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchArchiveList();
  }, []);
    
  const fetchArchiveList = () => {
    axios
      .get('http://localhost:3001/Archive',{
        credentials: 'include'
      })
      .then((response) => {
        setArchiveList(
          response.data.map((item) => ({
            id: item._id.toString(),
            ArchiveItem: item.ArchiveItem,
            registerDate: item.registerDate,
            pomodoroCount: item.pomodoroCount
          }))
        );
      })
      .catch((err) => {
        console.error('fetchArchiveListでエラー発生:', err);
      });
  };

  const returnHome = (id, archiveItem, registerDate, pomodoroCount) => {
    axios
      .post('http://localhost:3001/Archive/returnHome',{
        id: id,
        returnItem: archiveItem,
        registerDate: registerDate,
        pomodoroCount: pomodoroCount,
        credentials: 'include'
      })
      .then(() => {
        fetchArchiveList();
      })
      .catch((err) => console.log('returnHomeでエラー発生',err))
  }

  const deleteCard = (itemId) => {
    axios
      .post('http://localhost:3001/Archive/delete', {
        _id: itemId,
        credentials: 'include'
      })
      .then(() => {
        fetchArchiveList();
      })
      .catch((err) => {
        console.log('deleteCardでエラー発生',err)
      })
  }

  return(
    <div>
      {archiveList.length === 0 ? (
          <h2>There is no archive list</h2>
      ) : (
        <Grid container direction=''>
            {archiveList.map((archiveList) => (
          <Grid item>
            <Card key={archiveList.id} variant='outlined' className={classes.card}>
              <CardContent>
                <Typography variant='body1'>{archiveList.ArchiveItem}</Typography>
                <Button variant='outlined' color='primary' onClick={() => returnHome(archiveList.id, archiveList.ArchiveItem, archiveList.registerDate, archiveList.pomodoroCount)} startIcon={<KeyboardReturnIcon/>}>Return</Button>
                <Button variant='contained' color='error' onClick={()=> deleteCard(archiveList.id)} startIcon={<DeleteIcon />}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default ArchiveList