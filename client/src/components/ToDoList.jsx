import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@mui/icons-material/Send";
import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  card: {
    width: 300,
    margin: "20px auto",
    textAlign: "center",
  },
});

const ToDoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const classes = useStyles();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = { inputData: inputValue };
      const response = await axios.post(
        "http://localhost:3001/item",
        dataToSend
      );
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
          }))
        );
      })
      .catch((error) => {
        console.error("データ取得時のエラー:", error);
      });
  };

  const deleteItem = (itemId, item) => {
    axios
      .post("http://localhost:3001/delete", {
        itemToDelete: itemId,
        ArchiveItem: item,
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
    <div>
      <div>
        <Stack spacing={2} direction="row">
          <TextField
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            type="submit"
            color="blue"
            onClick={handleSubmit}
            endIcon={<SendIcon />}
          >
            追加する
          </Button>
        </Stack>
      </div>
      <div>
        {todoList.length === 0 ? (
          <p>リストはありません</p>
        ) : (
          <Grid container>
            {todoList.map((todoItem) => (
              <Card
                key={todoItem._id}
                variant="outlined"
                className={classes.card}
              >
                <CardContent>
                  <Typography variant="body1">{todoItem.text}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => deleteItem(todoItem.id, todoItem.text)}
                  >
                    削除する
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
