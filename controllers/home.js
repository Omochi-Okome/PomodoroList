const fs = require("fs");
let active = false;

exports.getHome = (req,res) => {
    res.render('../views/home.ejs',{
        data:data,
        active:active,
    })
}
exports.postItem = (req,res) => {
    //ToDoItemは入力された値
    const ToDoItem = req.body.ToDoItem;
    //ファイルの読み込み
    try {
      const data = fs.readFileSync("data.json","utf8");
      //JSONパース
      let existingData = JSON.parse(data);
      //データ追加
      existingData.push(ToDoItem);
      //ファイル書き込み
      const newData = JSON.stringify(existingData);
      fs.writeFileSync("data.json",newData);
      res.redirect("/");
    } catch(err) {
      console.log(err);
    }
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