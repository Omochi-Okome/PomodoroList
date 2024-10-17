import axios from "axios";
import dotenv from "dotenv";

import { Task } from "../models/taskModel.js";
import { ArchiveTask } from "../models/archiveTaskModel.js";

dotenv.config();

export async function postNewTask(req, res) {
  const task = req.body.inputValue;
  // const saveNewTask = new Task({ task });
  const newEnglishTask = {
    englishTask: task
  }
  try {
    await axios.post(process.env.REALTIME_DATABASE +"/task/englishTask.json", newEnglishTask)
    await saveNewTask.save();
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}

export async function deleteTask(req, res) {
  const { taskID, task } = req.body;
  const saveArchiveItem = new ArchiveTask({ task });
  try {
    await Task.deleteOne({ _id: taskID });
    saveArchiveItem.save();
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}

export async function deleteArchiveTask(req, res) {
  const { taskID } = req.body;
  try {
    await ArchiveTask.deleteOne({ _id: taskID });
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}

export async function returnTask(req, res) {
  const { taskID, task } = req.body;
  const returnProduct = new Task({ taskID, task });
  try {
    await returnProduct.save();
    await ArchiveTask.deleteOne({ _id: taskID });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

export const taskController = {
  postNewTask,
  deleteTask,
  deleteArchiveTask,
  returnTask,
};
