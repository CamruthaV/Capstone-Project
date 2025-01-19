// filepath: frontend/src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the base URL as needed
});

// Add a request interceptor to include the API key in the headers
instance.interceptors.request.use(
  (config) => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;