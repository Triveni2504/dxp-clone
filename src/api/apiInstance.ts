import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers like Authorization if needed
  },
  timeout: 1000, // optional
});

export default apiInstance;
