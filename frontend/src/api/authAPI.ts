import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const register = (username: string, password: string) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

export const login = (username: string, password: string) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const getProtectedData = (token: string) => {
  return axios.get(`${API_URL}/protected`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
