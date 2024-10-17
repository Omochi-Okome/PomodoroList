import { useEffect, useState } from "react";
import axios from "axios";

import TaskBoard from "../components/TaskBoard";
import SideMenu from "../components/SideMenu";

export default function Archive() {
  const [archiveTasks, setArchiveTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchArchiveTasks();
    console.log("危険確認、ArchiveTask");
  }, []);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

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

  function exploreTask() {}

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
    <div className="flex h-screen w-full">
      <div className="flex flex-col w-40 pt-10">
        <SideMenu currentMenu="Archive" />
      </div>
      <div>

      </div>
    </div>
  );
}
