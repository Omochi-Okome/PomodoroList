const {homeItem,removeItem,archive,returnHome,editText,} = require("../models/home");
const dayjs = require('dayjs');
const getDb = require("../util/database").getDb;
var ObjectId = require("mongodb").ObjectId;

exports.getHome = (req, res) => {
  const db = getDb();
  return db
    .collection("list")
    .find()
    .toArray()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "データ取得時にエラーが発生しました" });
    });
};

exports.postItem = (req, res) => {
  const postItem = req.body.inputData;
  const deadline = req.body.deadline
  const product = new homeItem({ item: postItem, deadline:dayjs(deadline).format("YYYY-MM-DD") });
  product
    .saveProducts()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
};

exports.deleteItem = (req, res) => {
  const _id = new ObjectId(req.body.itemToDelete);
  const itemDelete = req.body.ArchiveItem;
  const deadline = req.body.deadline;
  const product = new removeItem(_id, itemDelete, deadline);
  product.saveArchive();
  removeItem
    .deleteById(_id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
};

exports.editButton = (req, res) => {
  active = true;
  editButton = false;
  completeButton = false;
  res.redirect("/");
};

exports.posteditedItem = (req, res) => {
  const editedText = req.body.editedText;
  const originalText = req.body.originalText;
  const _id = req.body._id;
  const product = new editText(editedText, originalText, _id);
  product
    .updateItem()
    .then(() => {
      active = false;
      editButton = true;
      completeButton = true;
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
