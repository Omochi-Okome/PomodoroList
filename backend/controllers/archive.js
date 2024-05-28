const { ObjectId } = require('mongodb');
const archiveList = require('../models/archiveList')
const connectDB = require('../util/database')

exports.viewArchive = async(req,res) => {
  try {
    await connectDB();
    const product = await archiveList.find().exec();
    res.json(product);
  } catch(err) {
    res.status(500).json({err: 'アーカイブデータを取得できませんでした。'});
  }
}

exports.deleteArchiveTodoItem = async(req,res) => {
  const _id = req.body._id;
  try {
    await archiveList.deleteOne({_id:_id})
    res.json()
  } catch(err) {
    console.log(err);
  } 
}

exports.returnHome = (req,res) => {
  const _id = new ObjectId(req.body.id)
  const returnItem = req.body.returnItem;
  const registerDate = req.body.registerDate;
  const pomodoroCount = req.body.pomodoroCount;
  const productReturnItem = new returnArchiveItem(returnItem, registerDate, pomodoroCount);
  const productArchive = new archive(_id);
  try {
    productArchive.deleteById()
    productReturnItem.returnArchiveItem()
  } catch(err) {
    console.log(err);
  }
  res.redirect('/')
}