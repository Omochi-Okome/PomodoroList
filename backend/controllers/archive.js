const List = require('../models/list')
const ArchiveList = require('../models/archiveList');
const connectDB = require('../util/database');

exports.viewArchive = async(req,res) => {
  try {
    await connectDB();
    const product = await ArchiveList.find().exec();
    res.json(product);
  } catch(err) {
    res.status(500).json({err: 'アーカイブデータを取得できませんでした。'});
  }
}

exports.deleteArchiveTodoItem = async(req,res) => {
  const _id = req.body._id;
  try {
    await ArchiveList.deleteOne({_id:_id});
    res.json();
  } catch(err) {
    console.log(err);
  } 
}

exports.returnHome = async(req,res) => {
  const {_id, returnItem:item, registerDate, pomodoroCount} = req.body;
  const returnProduct = new List({item, registerDate, pomodoroCount});
  try {
    await returnProduct.save();
    await ArchiveList.deleteOne({_id: _id});
    res.json();
  } catch(err) {
    console.log(err);
  }
}