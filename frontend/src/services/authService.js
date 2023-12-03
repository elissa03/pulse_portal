import axios from "axios";

const API_URL = "http://localhost:3001/auth/";

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}login`, {
    email,
    password,
  });
  return response;
};

const signup = async (data) => {
  const response = await axios.post(`${API_URL}register`, data);
  return response;
};

export default {
  login,
  signup,
};
