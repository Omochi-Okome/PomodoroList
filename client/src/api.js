import axios from 'axios';
import { auth } from './firebase';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  withCredentials: true
});

API.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    console.log('Sending token:', token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (err) => {
  return Promise.reject(err);
})

export default API;