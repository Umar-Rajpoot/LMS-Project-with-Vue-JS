import axios from 'axios';

// Create an Axios instance with the base URL from .env
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // Get the base URL from .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
