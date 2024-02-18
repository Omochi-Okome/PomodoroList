
const {homeItem,removeItem, archive,returnHome,editText} = require("../models/home");
let active = false;
let editActive = true;

exports.getHome = (req,res) => {
  homeItem.fetchAll()
    .then(products => {
      res.render('../views/home.ejs',{
        data:products,
        active:active,
        editActive:editActive,
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
  editActive = false;
  res.redirect('/');
}

exports.posteditedItem = (req, res) => {
  const editedText = req.body.editedText;
  const originalText = req.body.originalText;
  const _id = req.body._id;
  const product = new editText(editedText,originalText,_id);
  product.updateItem();
  editText.deleteById(originalText)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
  }

  //以下アーカイブ関連

exports.returnMain = (req,res) => {
  const returnObject = req.body.returnArchive;
  // console.log(returnObject);
  const product = new returnHome(returnObject);
  product.saveProducts();
  archive.deleteById(returnObject)
      .then(result => {
        // console.log('Destoyed product');
      })
      .catch(err => console.log(err));
  res.redirect('/archive');
}