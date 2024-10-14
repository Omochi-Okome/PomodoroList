import { connectDB } from "../util/database.js";
import { List } from "../models/list.js";
import { ArchiveList } from "../models/archiveList.js";

export async function getHome(req, res) {
  try {
    await connectDB();
    const products = await List.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}

export async function postItem(req, res) {
  const item = req.body.inputValue;
  const saveTodoItem = new List({ item });
  try {
    await saveTodoItem.save();
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}

export async function deleteItem(req, res) {
  const { itemId, item } = req.body;
  const saveArchiveItem = new ArchiveList({ item });
  try {
    await List.deleteOne({ _id: itemId });
    saveArchiveItem.save();
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}

export const homeController = {
  getHome,
  postItem,
  deleteItem,
};
