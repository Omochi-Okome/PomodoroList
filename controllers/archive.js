const {removeItem,archive} = require("../models/home");

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
    const archiveDelete = req.body.archiveToDelete;
    console.log(_id)
    archive.deleteById(_id)
      .then(() => res.redirect('/archive'))
      .catch(err => console.log(err));
}