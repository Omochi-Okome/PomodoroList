import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import Modal from "./Modal";
import { createPortal } from 'react-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@mui/icons-material/Send";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const useStyles = makeStyles({
  card: {
    width: 300,
    height:150,
    margin: "20px auto",
    textAlign: "center",
  },
});

const ModalPortal = ({ children }) => {
  const target = document.querySelector('.container.start')
  return createPortal(children, target)
}

const ToDoList = () => {
  const initialDate = dayjs();
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const classes = useStyles();
  const pomodoroCount = 0;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      return;
    }
    try {
      const dataToSend = { inputData: inputValue, registerDate:initialDate, pomodoroCount:pomodoroCount};
      const response = await axios.post("http://localhost:3001/item",dataToSend);
      setInputValue("");
      updateList(response.data);
    } catch (error) {
      console.error("データの送信時にエラーが発生しました:", error);
    }
  };

  const handleStartCountdown = (todoId) => {
    setSelectedTodoId(todoId);
    setModalOpen(true);
  };
    

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = () => {
    axios
      .get("http://localhost:3001/")
      .then((response) => {
        setTodoList(
          response.data.map((item) => ({
            id: item._id.toString(),
            text: item.item,
            deadline:item.deadline
          }))
        );
      })
      .catch((error) => {
        console.error("データ取得時のエラー:", error);
      });
  };

  const deleteItem = (itemId, item, deadline) => {
    axios
      .post("http://localhost:3001/delete", {
        itemToDelete: itemId,
        ArchiveItem: item,
        deadline:deadline
      })
      .then(() => {
        fetchTodoList();
      })
      .catch((error) => {
        console.error("削除時のエラー:", error);
      });
  };

  const updateList = (newList) => {
    setTodoList(
      newList.map((item) => ({
        id: item._id.toString(),
        text: item.item,
      }))
    );
  };
  const  handleOnComplete = () => {
    setModalOpen(false)
  };

  return (
    <div className="container start">
      <form action="">
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={3}>
            <TextField type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter your to-do list!" fullWidth required/>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" type="submit" color="blue" onClick={handleSubmit} endIcon={<SendIcon />} >Add</Button>
          </Grid>
        </Grid>
      </form>

      <Grid container spacing={2} direction="row" >
        {todoList.length === 0 ? (
          <Grid item>
            <h2>There is no to-do list</h2>
          </Grid>
        ) : (
          todoList.map((todoItem) => (
          <Grid item>
            <Card key={todoItem._id} variant="outlined" className={classes.card}>
              <CardContent>
                <Typography variant="body1">{todoItem.text}</Typography>
                <Button variant="outlined" onClick={() => handleStartCountdown(todoItem.id)}><PlayCircleOutlineIcon/>Start</Button>
                <Button variant="outlined" onClick={() => deleteItem(todoItem.id, todoItem.text, todoItem.deadline)}>
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
              colors={["#ff9248", "#a20000"]}
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
