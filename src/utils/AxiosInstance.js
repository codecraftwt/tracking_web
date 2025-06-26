import axios from "axios";
import { baseURL } from "./constants";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Axios request being made to:', config.url);
    console.log('Full URL:', config.baseURL + config.url);
    console.log('Request method:', config.method);
    console.log('Request data:', config.data);
    
    const token = localStorage.getItem("token"); // Use localStorage for web
    console.log('Token from localStorage:', token);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set');
    } else {
      console.log('No token found in localStorage');
    }
    
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Axios response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Axios response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosInstance;
