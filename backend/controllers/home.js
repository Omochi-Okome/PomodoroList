const {savingTodoList,HomeArchiveMover,countUpPomodoro} = require('../models/home');
const dayjs = require('dayjs');
const getDB = require('../util/database').getDB;
var ObjectId = require('mongodb').ObjectId;

exports.getHome = (req, res) => {
  const db = getDB();
  return db
    .collection('list')
    .find()
    .toArray()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log('getHomeでエラー',err);
      res.status(500).json({ err: 'データ取得時にエラーが発生しました' });
    });
};

exports.postItem = (req, res) => {
  const postItem = req.body.inputData;
  const registerDate = req.body.registerDate;
  const pomodoroCount = req.body.pomodoroCount
  const product = new savingTodoList({ item: postItem, registerDate:dayjs(registerDate).format('YYYY-MM-DD'), pomodoroCount: pomodoroCount});
  product
    .saveTodoItem()
    .then(() => {
      res.setHeader('Set-Cookie', 'loggedIn=true')
      res.redirect('/')
    })
    .catch((err) => console.log('postItemでエラー',err));
};

exports.deleteItem = (req, res) => {
  const _id = req.body.itemId
  const ArchiveItem = req.body.ArchiveItem;
  const registerDate = req.body.registerDate;
  const pomodoroCount = req.body.pomodoroCount
  const product = new HomeArchiveMover(_id, ArchiveItem, registerDate, pomodoroCount);
  product.saveArchive();
  product
    .deleteById()
    .then(() => res.redirect('/'))
    .catch((err) => console.log('deleteItemでエラー',err));
};

exports.countUpPomodoroCount = (req,res) => {
  const _id = new ObjectId(req.body.selectedId);
  const product = new countUpPomodoro(_id)
  product.countUpPomodoroCount()
    .then(() => {
      res.json({ message: 'カウントアップ成功' });
      return
    })
    .catch((err) => console.log('countUpPomodoroCountでエラー',err))
}