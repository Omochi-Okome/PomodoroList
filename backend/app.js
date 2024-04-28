const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const mongoConnect = require("./util/database").mongoConnect;
require("dotenv").config();

const app = express();


const store = new MongoDBStore({
  uri:process.env.MONGO_URI,
  collection: "session"
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(session({
  secret:"my secret", 
  resave: false, 
  saveUninitialized: false,
  store: store,
  cookie: {
    httpOnly: false,
    
    secure: process.env.NODE_ENV === "production",  // 本番環境でのみsecureをtrueに
    maxAge: 24 * 60 * 60 * 1000  // 24時間
  }
}))

const homeRoutes = require("./routes/home");
const archiveRoutes = require("./routes/archive");
const authRoutes = require("./routes/auth");

app.use("/", homeRoutes);
app.use("/archive", archiveRoutes);
app.use("/auth",authRoutes);

mongoConnect(() => {
  app.listen(3001);
});