const fs = require("fs");
let active = false;

var data = [];

exports.getHome = (req,res) => {
    res.render('../views/home.ejs',{
        data:data,
        active:active,
    })
}
exports.postItem = (req,res) => {
    //ToDoItemは入力された値
    const ToDoItem = req.body.ToDoItem;
    //空欄での入力を防ぐ
    if (ToDoItem !==""){
      data.push(ToDoItem);
    }
    console.log(data);
    res.redirect('/');
    return data;
}
exports.deleteItem = (req, res) => {
  const itemToDelete = req.body.itemToDelete;

  // data から特定の要素を削除
  const index = data.indexOf(itemToDelete);
  if (index !== -1) {
      data.splice(index, 1);
  }
  res.redirect('/');
};

exports.editButton = (req,res) => {
  active =true;
  console.log(active);
  res.redirect('/');
}

exports.editItem = (req,res) => {
  const editText = req.body.Text;
  console.log(editText);
  const index = data.indexOf(editText);
  if (index === -1 ) {
      data.push(editText);
  } else {
    console.error('指定された要素が見つかりませんでした。');
  }

  console.log(data);
  res.redirect('/');
}