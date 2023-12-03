import { React, useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import "./styles.css";
import "reactjs-popup/dist/index.css";
import UserTable from "./UsersTable";
import userService from "../../services/userService";

function Users({ Toggle }) {
  const [usersData, setUsersData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [roleEdit, setRoleEdit] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        // console.log(response);
        setUsersData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setRoleEdit(user.user_role);
  };

  const handleRoleChange = (e) => {
    setRoleEdit(e.target.value);
  };

  const handleSaveClick = async (userId) => {
    try {
     const response = await userService.updateUser(userId, roleEdit);
      if (response.status === 200) {
        setUsersData(
          usersData.map((user) => {
            if (user.id === userId) {
              return { ...user, user_role: roleEdit };
            }
            return user;
          })
        );
      } else {
        console.error("User not found or other error", response.data);
      }
    } catch (error) {
      console.error("Error updating user", error.response || error);
    }
    setEditingId(null);
  };

  const handleDeleteClick = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      try {
        const response = await userService.deleteUser(userId);
        if (response.status === 200) {
          // Remove the user from the local state to update the UI
          setUsersData(usersData.filter((user) => user.id !== userId));
        } else {
          console.error("User not found or other error", response.data);
        }
      } catch (error) {
        console.error("Error deleting user", error.response || error);
      }
    }
  };

  return (
    <>
      <div className="px-3">
        <Nav Toggle={Toggle} />
      </div>
      <div className="container mt-4">
        <h2 className="text-white mb-3 text-center">User Management</h2>
        <div className="table-responsive">
          <UserTable
            usersData={usersData}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
            handleDeleteClick={handleDeleteClick}
            editingId={editingId}
            roleEdit={roleEdit}
            handleRoleChange={handleRoleChange}
          />
        </div>
      </div>
    </>
  );
}

export default Users;
