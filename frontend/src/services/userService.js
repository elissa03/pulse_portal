import axios from "axios";
import localStorageUtils from "../utils/localStorageUtils";

const API_URL = "http://localhost:3001/user/users";

const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${localStorageUtils.getToken()}`,
      },
    });
    return response;
}

const updateUser = async (userId, userRole) => {
    const response = await axios.put(
      `${API_URL}/${userId}`,
      {
        user_role: userRole,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorageUtils.getToken()}`,
        },
      }
    );
    return response;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorageUtils.getToken()}`,
    },
  });
  return response;
};

export default {
    getAllUsers,
    updateUser,
    deleteUser
}