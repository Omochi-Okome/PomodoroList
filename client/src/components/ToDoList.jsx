import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@mui/icons-material/Send";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const useStyles = makeStyles({
  card: {
    width: 300,
    height:150,
    margin: "20px auto",
    textAlign: "center",
  },
});

const ToDoList = () => {
  const initialDate = dayjs();
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [time,setTime] = useState(initialDate);
  const classes = useStyles();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = { inputData: inputValue, deadline:time };
      const response = await axios.post("http://localhost:3001/item",dataToSend);
      setInputValue("");
      updateList(response.data);
    } catch (error) {
      console.error("データの送信時にエラーが発生しました:", error);
    }
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
        console.log("削除成功");
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

  return (
    <>
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DateTimePicker value={time} onChange={(newTime) => setTime(newTime)} />
            </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <TextField type="text" value={inputValue} onChange={handleInputChange} placeholder="やることを入力しよう！" fullWidth/>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" type="submit" color="blue" onClick={handleSubmit} endIcon={<SendIcon />} >追加</Button>
        </Grid>
      </Grid>

        <Grid container spacing={2} direction="row" >
          {todoList.length === 0 ? (
            <Grid item >
              <p>リストはありません</p>
            </Grid>
          ) : (
            todoList.map((todoItem) => (
            <Grid item>
              <Card key={todoItem._id} variant="outlined" className={classes.card}>
                <CardContent>
                  <Typography variant="body1">{todoItem.text}</Typography>
                  <Typography>締切：{todoItem.deadline}</Typography>
                  <Button variant="outlined" onClick={() => deleteItem(todoItem.id, todoItem.text, todoItem.deadline)}>
                    完了
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            ))
          )}
        </Grid>
    </>

  );
};

export default ToDoList;
