import { Task } from "../models/taskModel.js";
import { ArchiveTask } from "../models/archiveTaskModel.js";

export async function getTask(req, res) {
  try {
    const products = await Task.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}

export async function getArchiveTask(req, res) {
  try {
    const products = await ArchiveTask.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "アーカイブデータを取得できませんでした。" });
  }
}

export const dashboardController = {
  getTask,
  getArchiveTask,
};
