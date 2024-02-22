
const {homeItem,removeItem, archive,returnHome,editText} = require("../models/home");
let active = false;
let editButton = true;
let completeButton = true;

exports.getHome = (req,res) => {
  homeItem.fetchAll()
    .then(products => {
      res.render('../views/home.ejs',{
        data:products,
        completeButton:completeButton,
        active:active,
        editButton:editButton,
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postItem = (req,res) => {
    const postItem = req.body.ToDoItem;
    console.log(postItem);
    const product = new homeItem({item:postItem});
    product
      .saveProducts()
      .then(() => res.redirect('/'))
      .catch(err => console.log(err));
}

exports.deleteItem = (req, res) => {
  const itemDelete = req.body.itemToDelete;
  const _id = req.body._id;
  const product = new removeItem(_id,itemDelete);
  product.saveArchive();
  removeItem.deleteById(itemDelete)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
};

exports.editButton = (req,res) => {
  active =true;
  editButton = false;
  completeButton = false;
  res.redirect('/');
}

exports.posteditedItem = (req, res) => {
  const editedText = req.body.editedText;
  const originalText = req.body.originalText;
  const _id = req.body._id;
  const product = new editText(editedText,originalText,_id);
  product.updateItem()
  .then(()=> {
    active = false;
    editButton = true;
    completeButton = true;
  })
  .catch(err => console.log(err))
  editText.deleteById(originalText)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
  }