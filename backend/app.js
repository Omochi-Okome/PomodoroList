const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoConnect = require("./util/database").mongoConnect;

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

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