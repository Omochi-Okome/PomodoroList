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
    
  const fetchArchiveList = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Archive`)
      if (!response.ok) {
        throw new Error('データ取得に失敗');
      }
      const data = await response.json();
      setArchiveList(data)
    } catch(err) {
      console.log(err)
    }
  };

  const returnHome = (id, item, registerDate, pomodoroCount) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/Archive/returnHome`,{
        _id: id,
        returnItem: item,
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
      .post(`${process.env.REACT_APP_API_URL}/Archive/delete`, {
        _id: itemId,
      })
      .then(() => {
        fetchArchiveList();
      })
      .catch((err) => console.log('deleteCardでエラー発生',err))
  }

  return(
    <div>
      {archiveList.length === 0 ? (
          <h2>There is no archive list</h2>
      ) : (
        <Grid container>
            {archiveList.map((archive) => (
          <Grid item key={archive._id}>
            <Card variant='outlined' className={classes.card}>
              <CardContent>
                <Typography variant='body1'>{archive.item}</Typography>
                <Button variant='outlined' color='primary' onClick={() => returnHome(archive._id, archive.item, archive.registerDate, archive.pomodoroCount)} startIcon={<KeyboardReturnIcon/>}>Return</Button>
                <Button variant='contained' color='error' onClick={()=> deleteCard(archive._id)} startIcon={<DeleteIcon />}>Delete</Button>
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