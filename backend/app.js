const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require("cors");
const mongoConnect = require("./util/database").mongoConnect;
require("dotenv").config();

const app = express();


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
  cookie:{
    secure: false,
    httpOnly: true,
    maxAge:1000 * 60 * 60 * 24
  }
}))


const homeRoutes = require("./routes/home");
const archiveRoutes = require("./routes/archive");
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");

app.use("/", homeRoutes);
app.use("/archive", archiveRoutes);
app.use("/login",loginRoutes);
app.use("/signup",signupRoutes);

mongoConnect(() => {
  app.listen(3001);
});