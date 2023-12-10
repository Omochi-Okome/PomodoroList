const fs = require("fs");

var data = [];

exports.getHome = (req,res) => {
    res.render('../views/home.ejs',{
        data:data,
    })
}
exports.postItem = (req,res) => {
    //ToDoItemは入力された値
    const ToDoItem = req.body.ToDoItem;
    data.push(ToDoItem);
    console.log(data);
    res.redirect('/');
    return data;
}