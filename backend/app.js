const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./pomodorolist-22381-firebase-adminsdk-kwp57-6ab6814b23.json');
const cors = require('cors');
const connectDB = require('./util/database');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000','https://todolist-aemc.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorizatikon']
  })
);

const homeRoutes = require('./routes/home');
const archiveRoutes = require('./routes/archive');
const authRoutes = require('./routes/auth');

app.use('/', homeRoutes);
app.use('/archive', archiveRoutes);
app.use('/auth',authRoutes);

connectDB().then(() => {
  app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
  });
}).catch(err => console.log('Failed to connect to MongoDB:',err))