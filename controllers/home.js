const fs = require("fs");
const { json } = require("stream/consumers");
let active = false;
let editActive = true;

exports.getHome = (req,res) => {
    res.render('../views/home.ejs',{
        data:JSON.parse(fs.readFileSync("data.json","utf8")),
        active:active,
        editActive:editActive,
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
  const readingJSON = JSON.parse(fs.readFileSync("data.json","utf8"));

  // data から特定の要素を削除
  const index = readingJSON.indexOf(itemToDelete);
  if (index !== -1) {
    readingJSON.splice(index, 1);
    fs.writeFileSync("data.json",JSON.stringify(readingJSON));
  }
  res.redirect('/');
};

exports.editButton = (req,res) => {
  active =true;
  editActive = false;
  console.log(active);
  res.redirect('/');
}

exports.editItem = (req, res) => {
  const editedText = req.body.editedText;
  const originalText = req.body.originalText;
  const readingJSON = JSON.parse(fs.readFileSync("data.json", "utf8"));

  console.log(editedText);
  console.log(readingJSON);
  console.log(originalText);

  const index = readingJSON.indexOf(originalText);
  if (index !== -1) {
    readingJSON.splice(index, 1, editedText);
    fs.writeFileSync("data.json", JSON.stringify(readingJSON));
    } else {
    console.error('指定された要素が見つかりませんでした。');
    }
    editActive = true;
    active = false;
    res.redirect('/');
  }