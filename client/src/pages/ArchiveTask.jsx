import { useEffect, useState } from "react";
import axios from "axios";

import Button from "../components/UI/Button";
import ItemList from "../components/UI/TaskCard";
import Message from "../components/UI/Message";
import SideMenu from "../components/SideMenu";

export default function Archive() {
  const [archiveTasks, setArchiveTasks] = useState([]);

  useEffect(() => {
    fetchArchiveTasks();
    console.log("危険確認、ArchiveTask");
  }, []);

  async function fetchArchiveTasks() {
    try {
      const response = await axios.get(
        "http://localhost:3001/dashboard/archiveTask"
      );
      setArchiveTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function returnTask(taskID, task) {
    try {
      await axios.post("http://localhost:3001/task/returnTask", {
        taskID: taskID,
        task: task,
      });
      await fetchArchiveTasks();
    } catch (err) {
      console.error("returnTaskでエラー発生", err);
    }
  }

  async function deleteTask(taskID) {
    try {
      await axios.post("http://localhost:3001/task/deleteArchiveTask", {
        taskID: taskID,
      });
      await fetchArchiveTasks();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex h-screen mt-10">
      <div className="flex flex-col w-80">
        <SideMenu currentMenu="Archive" />
      </div>
      <div className="flex flex-col items-center bg-slate-100 h-screen">
        <div className="flex flex-row flex-wrap mt-4">
          {archiveTasks.length === 0 && <Message message="There is no archive task!" />}
          {archiveTasks.map((tasks) => (
            <ItemList key={tasks._id} tasks={tasks}>
              <Button
                name="Return"
                handle={() => returnTask(tasks._id, tasks.task)}
              />
              <Button name="Delete" handle={() => deleteTask(tasks._id)} />
            </ItemList>
          ))}
        </div>
      </div>
    </div>
  );
}
