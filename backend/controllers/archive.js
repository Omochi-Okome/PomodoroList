const { ObjectId } = require('mongodb');
const { archive } = require('../models/archive');
const getDB = require("../util/database").getDB;

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
        console.log('アーカイブリストの取得失敗', err);
      });
}

exports.deleteArchiveTodoItem = (req,res) => {
    const _id = new ObjectId(req.body._id);
    const product = new archive(_id)
    product.deleteById()
      .then(() => res.redirect('/archive'))
      .catch(err => console.log(err));
}