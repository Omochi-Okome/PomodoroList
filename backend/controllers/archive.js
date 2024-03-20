const {removeItem} = require("../models/home");
const {archive, returnHome} = require('../models/archive');

let active = false;
let editActive = true;

exports.viewArchive = (req,res) => {
    const _id = req.body._id;
    const itemDelete = req.body.itemDelete;
    const product = new removeItem(_id,itemDelete);
    product.fetchAll()
    .then(archive => {
      res.render("../views/archive.ejs",{
      data:archive,
      active:active,
      editActive:editActive,
    })  
  })
  .catch(err => {
      console.log(err);
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