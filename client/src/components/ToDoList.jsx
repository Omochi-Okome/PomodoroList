import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

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
        console.log(response.data);
        setTodoList(response.data.map((item) => item.item));
      })
      .catch((error) => {
        console.error("データ取得時のエラー:", error);
      });
  };

  return (
    <div>
      {todoList.length === 0 ? (
        <p>リストはありません</p>
      ) : (
        <Grid container>
            {todoList.map((todoItem, index) => (
            <Card key={index} variant="outlined" className={classes.card}>
              <CardContent>
                <Typography variant="body1">{todoItem}</Typography>
              </CardContent>
            </Card>
            ))}
          </Grid>
      )}
    </div>
  );
};

export default ToDoList;
