import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Modal from './Modal';
import { createPortal } from 'react-dom';
import {useNavigate}from 'react-router-dom';
import API from '../api';
/* MaterialUI */
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
/* MaterialUI icon */
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const useStyles = makeStyles({
  card: {
    width: 300,
    height:150,
    margin: '20px auto',
    textAlign: 'center',
  },
});

const ModalPortal = ({ children }) => {
  const target = document.querySelector('.container.start')
  return createPortal(children, target)
}

const ToDoList = () => {
  const initialDate = dayjs();
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const classes = useStyles();
  const navigate = useNavigate();
  const firstPomodoroCount = 0;
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('ログイン中です')
        setUser(user);
        fetchTodoList();
      } else {
        console.log('ログインしていません')
        navigate('/auth/login');
      }
      setloading(false);
    });
    return () => unsubscribe();
  }, [navigate, auth]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      return;
    }
    try {
      const dataToSend = {
        userId: user.uid,
        inputData: inputValue,
        registerDate:initialDate,
        pomodoroCount:firstPomodoroCount
      };
      const response = await API.post(`${process.env.REACT_APP_API_URL}/home/item`,dataToSend,{
        credentials: 'include'
      });
      setInputValue('');
      updateList(response.data);
    } catch (error) {
      console.log('handleSubmitでエラー発生', error);
    }
  };

  const handleStartCountdown = (todoId) => {
    setSelectedTodoId(todoId);
    setModalOpen(true);
  };
    
  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = async() => {
    try{
      const response = await API.get(`${process.env.REACT_APP_API_URL}/home`, {
        withCredentials: true,
      })
      console.log('API URL:', process.env.REACT_APP_API_URL);
      console.log('Fetched data:', response.data);
      setTodoList(response.data)
    } catch(err) {
      console.log(err);
    }
  };

  const deleteItem = async(itemId, item, registerDate, pomodoroCount) => {
    try {
      await API.post(`${process.env.REACT_APP_API_URL}/home/delete`, {
        userId: user.uid,
        itemId: itemId,
        item: item,
        registerDate:registerDate,
        pomodoroCount:pomodoroCount,
        credentials: 'include'
      })
      fetchTodoList();
    } catch(err) {
      console.log(err);
    }
  };

  const updateList = (newList) => {
    setTodoList(
      newList.map((item) => ({
        id: item._id.toString(),
        item: item.item,
      }))
    );
  };
  
  const handleOnComplete = () => {
    setModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container start' onSubmit={handleSubmit}>
      <form action=''>
        <Grid container justifyContent='center'>
          <Grid item xs={3}>
            <TextField type='text' value={inputValue} onChange={handleInputChange} placeholder='Enter your to-do list!' fullWidth required/>
          </Grid>
        </Grid>
      </form>

      <Grid container spacing={2}>
        {todoList.length === 0 ? (
          <Grid item>
            <h2>There is no to-do list</h2>
          </Grid>
        ) : (
          todoList.map((todoItem) => (
          <Grid item key={todoItem._id}>
            <Card variant='outlined' className={classes.card}>
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
      {modalOpen &&
      <>
        <ModalPortal>
            <Modal
              handleCloseClick={() => setModalOpen(false)}
              duration={3}
              colors={['#ff9248', '#a20000']}
              colorValues={[20, 10]}
              onComplete={handleOnComplete}
              selectedId={selectedTodoId}
            />
        </ModalPortal>
      </>
      }
    </div>
  );
};

export default ToDoList;
