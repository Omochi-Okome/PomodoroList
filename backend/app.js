const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const mongoConnect = require('./util/database').mongoConnect;
require('dotenv').config();

const PORT = 3001;
const app = express();

const store = new MongoDBStore({
  uri:process.env.MONGO_URI,
  collection: 'session'
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000','https://todolist-aemc.onrender.com/'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorizatikon']
  })
);

app.use(session({
  secret:'my secret', 
  resave: false, 
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge:30000
  }
}))

const homeRoutes = require('./routes/home');
const archiveRoutes = require('./routes/archive');
const authRoutes = require('./routes/auth');

app.use('/', homeRoutes);
app.use('/archive', archiveRoutes);
app.use('/auth',authRoutes);

mongoConnect(() => {
  app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
  });
});