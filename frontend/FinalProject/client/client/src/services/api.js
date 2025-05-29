import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // or your backend URL
});

export default API;
