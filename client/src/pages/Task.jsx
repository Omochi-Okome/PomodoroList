import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import TaskCard from "../components/UI/TaskCard";
import TodayFocusTime from "../components/TodayFocusTime";
import Message from "../components/Message";
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
    <div className="flex h-screen">
      <div className="flex flex-col w-80 pt-10">
        <SideMenu currentMenu="Task" />
      </div>
      <div className="flex flex-col bg-slate-100 items-center w-full pt-10 ">
        <div>
          <TodayFocusTime />
        </div>
        <div className="mt-3">
          <Input
            inputValue={inputValue}
            handleInputChange={handleInputChange}
          />
          <Button handle={handleSubmit} name="追加" />
        </div>
        {tasks.length === 0 && <Message message="There is no task!" />}
        <div className="flex flex-row flex-wrap mt-4">
          {tasks.map((tasks) => (
            <TaskCard key={tasks._id} tasks={tasks} deleteTask={deleteTask}>
              <Button name="Start" handle={() => console.log("Start!!")} />
              <Button
                name="Done"
                handle={() => deleteTask(tasks._id, tasks.task)}
              />
            </TaskCard>
          ))}
        </div>
      </div>
    </div>
  );
}
