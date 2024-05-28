const countUpPomodoro = require('../models/home');
const dayjs = require('dayjs');
const connectDB = require('../util/database')
var ObjectId = require('mongodb').ObjectId;
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

exports.countUpPomodoroCount = (req,res) => {
  const _id = new ObjectId(req.body.selectedId);
  const product = new countUpPomodoro(_id)
  console.log('countUpPomodoroCount received:', new Date());
  product.countUpPomodoroCount()
    .then(() => {
      res.json({ message: 'カウントアップ成功' });
      console.log('Response sent:', new Date());
      return
    })
    .catch((err) => console.log(err))
}