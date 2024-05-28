const dayjs = require('dayjs');
const connectDB = require('../util/database')
const List = require('../models/list');
const ArchiveList = require('../models/archiveList');

exports.getHome = async (req, res) => {
  try {
    await connectDB();
    const products = await List.find().exec();
    res.json(products);
  } catch(err) {
    console.log(err);
    res.status(500).json({err: 'データ取得時にエラーが発生しました。'});
  }
};

exports.postItem = async (req, res) => {
  const {inputData: item, registerDate, pomodoroCount} = req.body;
  const saveTodoItem = new List({item, registerDate, pomodoroCount});
  try {
    await saveTodoItem.save();
    res.json()
  } catch(err) {
    console.log(err)
  }
};

exports.deleteItem = async (req, res) => {
  const {itemId, item, registerDate, pomodoroCount} = req.body;
  const saveArchiveItem = new ArchiveList({item, registerDate, pomodoroCount});
  try {
    const savedArchiveItem = await saveArchiveItem.save();
    await List.deleteOne({_id:itemId});
    res.json(savedArchiveItem);
  } catch(err) {
    console.log(err);
  }
};

exports.countUpPomodoroCount = async(req,res) => {
  const _id = req.body.selectedId;
  try {
    await List.findOneAndUpdate(
      { _id: _id},
      { $inc: { pomodoroCount: 1}},
      {new: true}
    );
    res.json();
  } catch(err) {
    console.log(err);
  }
}