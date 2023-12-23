const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
require("dotenv").config();
const dotenv = require("dotenv");
const mongoConnect = require('./util/database').mongoConnect;
const {MongoClient} = require('mongodb');

const mongoURL = process.env.MONGOURL;
dotenv.config();
//view ejngineの設定
app.set('view engine', 'ejs');
//リクエスト内容の解析(これがないとinputの入力内容が見れない)
app.use(bodyParser.urlencoded({extended: false}));

//CSSまでのパスを有効にする
app.use(express.static(path.join(__dirname, 'public')));        

const homeRoutes = require('./routes/home');

app.use('/',homeRoutes);

// MongoDBに接続してからサーバーを起動
const startServer = async () => {
    try {
      // MongoDBに接続
      const client = await MongoClient.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log('Connected to MongoDB!');
  
      // データベースとコレクションの作成や他の処理をここに追加
  
      // サーバーを起動
      app.listen(3000, () => {
        console.log('Server is running on port 3000');
      });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
// MongoDBに接続してからサーバーを起動する
mongoConnect(() => {
    startServer();
});