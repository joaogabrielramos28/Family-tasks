import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.125:3333/',
});

export {api};
