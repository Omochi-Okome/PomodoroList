import express from 'express';
import bodyParser from 'body-parser';
import admin from "firebase-admin";
import cors from 'cors';
import {connectDB} from './util/database.js';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import homeRoutes from './routes/home.js';
import archiveRoutes from './routes/archive.js';

dotenv.config();

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

const PORT = process.env.PORT;
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/home', homeRoutes);
app.use('/archive',  archiveRoutes);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.log('Failed to connect to MongoDB:', err));
