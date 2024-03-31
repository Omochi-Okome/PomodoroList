const {archive, returnHome} = require('../models/archive');
const getDb = require("../util/database").getDb;

let active = false;
let editActive = true;

exports.viewArchive = (req,res) => {
    const db = getDb();
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

exports.deleteArchive = (req,res) => {
    const _id = req.body._id;
    archive.deleteById(_id)
      .then(() => res.redirect('/archive'))
      .catch(err => console.log(err));
}

exports.returnMain = (req,res) => {
    const returnObject = req.body.returnArchive;
    const _id = req.body._id;
    const product = new returnHome(_id,returnObject);
    product.saveProducts();
    archive.deleteById(_id)
        .then(() => res.redirect('/archive'))
        .catch(err => console.log(err));
  }