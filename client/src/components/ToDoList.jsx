import React, { useState, useEffect } from "react";
import axios from "axios";

const ToDoList = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    console.log("useEffectが実行されました");
    axios.get("http://localhost:3001/")
      .then(response => {
        console.log(response.data);
        setTodoList(response.data.map(item => item.item));
      })
      .catch(error => {
        console.error("データ取得時のエラー:", error);
      });
  }, []);

  console.log("ToDoListコンポーネントがレンダリングされました");

  return (
    <div>
      {todoList.length === 0 ? (
        <p>リストはありません</p>
      ) : (
        <ul>
          {todoList.map((todoItem, index) => (
            <li key={index}>{todoItem}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoList;
