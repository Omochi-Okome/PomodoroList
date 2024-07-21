import React from "react";
//MaterialUI
import { Grid } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//MaterialUI icon
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//External CSSfile
import '../ToDoItem/ToDoList.css';

const ToDoItem = ({todoList, handleStartCountdown, deleteItem}) => {
  return(
    <Grid container spacing={2}>
        {todoList.length === 0 ? (
          <Grid item>
            <h2>There is no to-do list</h2>
          </Grid>
        ) : (
          todoList.map((todoItem) => (
          <Grid item key={todoItem._id}>
            <Card variant='outlined' className='card'>
              <CardContent>
                <Typography variant='body1'>{todoItem.item}</Typography>
                <Button variant='outlined' onClick={() => handleStartCountdown(todoItem._id)}><PlayCircleOutlineIcon/>Start</Button>
                <Button variant='outlined' onClick={() => deleteItem(todoItem._id, todoItem.item, todoItem.registerDate, todoItem.pomodoroCount)}>
                  <CheckCircleIcon/>
                  Done
                </Button>
              </CardContent>
            </Card>
          </Grid>
          ))
        )}
      </Grid>
  )
}

export default ToDoItem;