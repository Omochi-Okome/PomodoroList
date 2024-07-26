const List = require('../models/list')
const ArchiveList = require('../models/archiveList');
const connectDB = require('../util/database');

exports.viewArchive = async(req,res) => {
  const userId = req.user.user_id;
  try {
    await connectDB();
    const product = await ArchiveList.find({userId});
    res.json(product);
  } catch(err) {
    res.status(500).json({err: 'アーカイブデータを取得できませんでした。'});
  }
}

exports.deleteArchiveTodoItem = async(req,res) => {
  const _id = req.body._id;
  try {
    await ArchiveList.deleteOne({_id:_id});
    res.status(200).send();
  } catch(err) {
    console.error(err);
  } 
}
exports.deleteArchiveTodoItem = async(req,res) => {
  const _id = req.body._id;
  try {
    await ArchiveList.deleteOne({_id:_id});
    res.status(200).send();
  } catch(err) {
    console.error(err);
  } 
}

exports.returnHome = async(req,res) => {
  const {userId, _id, returnItem: item, registerDate, pomodoroCount} = req.body;
  const returnProduct = new List({userId, item, registerDate, pomodoroCount});
  try {
    await returnProduct.save();
    await ArchiveList.deleteOne({_id: _id});
    res.json();
  } catch(err) {
    console.log(err);
  }
}