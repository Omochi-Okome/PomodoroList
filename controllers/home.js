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
      let existingData = JSON.parse(data);
      existingData.push(ToDoItem);
      const newData = JSON.stringify(existingData);
      fs.writeFileSync("data.json",newData);
      res.redirect("/");
    } catch(err) {
      console.log(err);
    }
}
exports.deleteItem = (req, res) => {
  const itemToDelete = req.body.itemToDelete;
  const readingDataJSON = JSON.parse(fs.readFileSync("data.json","utf8"));
  const readingArchiveJSON = JSON.parse(fs.readFileSync("archive.json","utf8"));

  // data から特定の要素を削除
  const index = readingDataJSON.indexOf(itemToDelete);
  const addArchive = readingDataJSON[index];
  if (index !== -1) {
    readingDataJSON.splice(index, 1);
    readingArchiveJSON.push(addArchive);
    fs.writeFileSync("data.json",JSON.stringify(readingDataJSON));
    fs.writeFileSync("archive.json",JSON.stringify(readingArchiveJSON));
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

  //以下アーカイブ関連
  exports.viewArchive = (req,res) => {
    res.render("../views/archive.ejs",{
      data:JSON.parse(fs.readFileSync("archive.json","utf8")),
      active:active,
      editActive:editActive,
  })
}

  exports.deleteArchive = (req,res) => {
    const archiveToDelete = req.body.archiveToDelete;
    const readingArchiveJSON = JSON.parse(fs.readFileSync("archive.json","utf8"));

    const index = readingArchiveJSON.indexOf(archiveToDelete);
    if(index !== -1) {
      readingArchiveJSON.splice(index,1);
      fs.writeFileSync("archive.json",JSON.stringify(readingArchiveJSON));
    }
    res.redirect('/archive');
  }