import { Task } from "../models/taskModel.js";
import { ArchiveTask } from "../models/archiveTaskModel.js";

export async function postNewTask(req, res) {
  const task = req.body.inputValue;
  const saveNewTask = new Task({ task });
  try {
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
  const {taskID} = req.body;
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
