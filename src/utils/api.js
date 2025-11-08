import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
    ? `${process.env.REACT_APP_BACKEND_URL}/api`
    : "http://localhost:3000/api",
});

export default api;
