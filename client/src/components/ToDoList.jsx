import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
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
  const classes = useStyles();

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

  const deleteItem = (itemId) => {
    console.log(itemId);
    axios
      .post("http://localhost:3001/delete", { itemToDelete: itemId })
      .then(() => {
        console.log("削除成功");
      })
      .catch((error) => {
        console.error("削除時のエラー:", error);
      });
  };

  return (
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
                  variant="contained"
                  onClick={() => deleteItem(todoItem.id)}
                >
                  削除する
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ToDoList;
