import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT || "",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  return config;
});

// if the current token is expired or invalid, logout the user
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export default API;
