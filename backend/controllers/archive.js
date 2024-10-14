import { List } from "../models/list.js";
import { ArchiveList } from "../models/archiveList.js";
import { connectDB } from "../util/database.js";

export async function viewArchive(req, res) {
  try {
    await connectDB();
    const products = await ArchiveList.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "アーカイブデータを取得できませんでした。" });
  }
}

export async function deleteArchiveTodoItem(req, res) {
  const _id = req.body;
  try {
    await ArchiveList.deleteOne({ _id: _id });
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}

export async function returnHome(req, res) {
  const { _id, item } = req.body;
  const returnProduct = new List({ _id, item });
  try {
    await returnProduct.save();
    await ArchiveList.deleteOne({ _id: _id });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

export const archiveController = {
  viewArchive,
  deleteArchiveTodoItem,
  returnHome,
};
