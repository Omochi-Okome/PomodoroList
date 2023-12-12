const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

//view ejngineの設定
app.set('view engine', 'ejs');
//リクエスト内容の解析(これがないとinputの入力内容が見れない)
app.use(bodyParser.urlencoded({extended: false}));

//CSSまでのパスを有効にする
app.use(express.static(path.join(__dirname, 'public')));        

const homeRoutes = require('./routes/home');

app.use('/',homeRoutes)

app.listen(3000);