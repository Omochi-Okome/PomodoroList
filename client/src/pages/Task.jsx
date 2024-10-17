import React, { useState, useEffect } from "react";
import axios from "axios";

import TaskBoard from "../components/TaskBoard";
import TodayFocusTime from "../components/TodayFocusTime";
import SideMenu from "../components/SideMenu";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    fetchTasks();
    console.log("危険確認、Task");
  }, []);

  async function fetchTasks() {
    try {
      const response = await axios.get("http://localhost:3001/dashboard/task");
      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit() {
    if (!inputValue.trim()) return;
    try {
      await axios.post("http://localhost:3001/task/postNewTask", {
        inputValue,
      });
      setInputValue("");
      await fetchTasks();
    } catch (error) {
      console.error("handleSubmitでエラー発生", error);
    }
  }

  async function deleteTask(taskID, task) {
    try {
      await axios.post("http://localhost:3001/task/delete", { taskID, task });
      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col w-40 pt-10">
        <SideMenu currentMenu="Task" />
      </div>
      <div className="flex flex-col items-center h-auto w-full pt-10 bg-slate-100">
        <div className="flex justify-center w-full">
          <TodayFocusTime />
        </div>
        <div className="flex flex-row w-auto justify-between">
          <TaskBoard
            deleteTask={deleteTask}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            inputValue={inputValue}
            tasks={tasks}
            title="English"
          />
          <TaskBoard
            deleteTask={deleteTask}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            inputValue={inputValue}
            tasks={tasks}
            title="Programming"
          />
        </div>
      </div>
    </div>
  );
}
