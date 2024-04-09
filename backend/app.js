const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoConnect = require("./util/database").mongoConnect;

require("dotenv").config();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const homeRoutes = require("./routes/home");
const archiveRoutes = require("./routes/archive");

app.use("/", homeRoutes);
app.use("/archive", archiveRoutes);

mongoConnect(() => {
  app.listen(3001);
});