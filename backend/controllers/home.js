const {HomeArchiveMover,countUpPomodoro} = require('../models/home');
const dayjs = require('dayjs');
const connectDB = require('../util/database')
var ObjectId = require('mongodb').ObjectId;
const List = require('../models/list');

exports.getHome = async (req, res) => {
  try{
    await connectDB();
    const products = await List.find().exec();
    res.json(products)
  } catch(err) {
    console.log(err)
    res.status(500).json({err: 'データ取得時にエラーが発生しました。'})
  }
};

exports.postItem = async (req, res) => {
  const {inputData: item, registerDate, pomodoroCount} = req.body;
  const saveTodoItem = new List({item, registerDate, pomodoroCount});
  try {
    const savedItem = await saveTodoItem.save();
    return savedItem;
  } catch(err) {
    console.log(err)
  }
};

exports.deleteItem = (req, res) => {
  const {itemId: _id, ArchiveItem, registerDate, pomodoroCount} = req.body;
  const product = new HomeArchiveMover(_id, ArchiveItem, registerDate, pomodoroCount);
  product.saveArchive();
  product
    .deleteById()
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
};

exports.countUpPomodoroCount = (req,res) => {
  const _id = new ObjectId(req.body.selectedId);
  const product = new countUpPomodoro(_id)
  console.log('countUpPomodoroCount received:', new Date());
  product.countUpPomodoroCount()
    .then(() => {
      res.json({ message: 'カウントアップ成功' });  // 応答の送信
      console.log('Response sent:', new Date());  // 応答送信時のログ
      return
    })
    .catch((err) => console.log(err))
}