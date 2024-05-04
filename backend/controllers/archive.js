const { ObjectId } = require('mongodb');
const { archive, returnArchiveItem } = require('../models/archive');
const getDB = require('../util/database').getDB;

exports.viewArchive = (req,res) => {
  const db = getDB();
  return db
    .collection('archive')
    .find()
    .toArray()
    .then(ArchiveList => {
      res.json(ArchiveList)
    })
    .catch(err => {
      console.log('viewArchiveでエラー', err);
    });
}

exports.deleteArchiveTodoItem = (req,res) => {
  const _id = new ObjectId(req.body._id);
  const product = new archive(_id)
  product.deleteById()
    .then(() => res.redirect('/archive'))
    .catch(err => console.log('deleteArchiveTodoItemでエラー',err));
}

exports.returnHome = (req,res) => {
  const _id = new ObjectId(req.body.id)
  const returnItem = req.body.returnItem;
  const registerDate = req.body.registerDate;
  const pomodoroCount = req.body.pomodoroCount;
  const productReturnItem = new returnArchiveItem(returnItem, registerDate, pomodoroCount);
  const productArchive = new archive(_id);
  try{
    productArchive.deleteById()
    productReturnItem.returnArchiveItem()
  } catch(err) {
    console.log('returnHomeでエラー',err);
  }
  res.redirect('/')
}