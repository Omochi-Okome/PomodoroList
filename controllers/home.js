const fs = require("fs");

exports.getHome = (req,res) => {
    res.render('../views/home.ejs',{
        ToDoItem:fs.readFileSync('./data.json', 'utf8'),
    })
}
exports.postItem = (req,res) => {
    //ToDoItemは入力された値
    const ToDoItem = req.body.ToDoItem;
    fs.writeFileSync("data.json",JSON.stringify(ToDoItem));
    res.redirect('/');
}