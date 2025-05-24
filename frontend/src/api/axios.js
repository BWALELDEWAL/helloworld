// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Change if your backend URL is different
  withCredentials: true,
});

export default instance;
