import axios from 'axios';
import { getAuthToken, isAuthenticated } from '../utils/authUtils';
// 10.172.249.231
//10.137.166.231
const baseURL = 'http://localhost:8080/api';
console.log('Using base URL:', baseURL);

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define exact public routes
const publicRoutes = [
  '/api/auth/login',
  '/api/auth/users/register/consumer'
];

api.interceptors.request.use((config) => {
  try {
    let urlPath = '';

    // If URL is absolute, use it directly
    if (config.url?.startsWith('http')) {
      urlPath = new URL(config.url).pathname;
    } else {
      // Ensure baseURL is used for relative URLs
      urlPath = new URL(config.url ?? '', baseURL).pathname;
    }

    console.log('Request URL Path:', urlPath); // Log to check what URL path is constructed

    const isPublic = publicRoutes.includes(urlPath);

    // If the route is not public, add the authorization token
    if (!isPublic) {
      const token = getAuthToken();
      if (token && isAuthenticated()) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Authorization header added'); // Log if token is added
      }
    }
  } catch (err) {
    console.error('Request Interceptor Error:', err);
  }

  return config;
}, (error) => {
  console.error('Request failed', error);
  return Promise.reject(error);
});

export default api;
