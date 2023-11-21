// UserTable.js
import React from "react";

function UserTable({
  usersData,
  handleEditClick,
  handleSaveClick,
  handleDeleteClick,
  editingId,
  roleEdit,
  handleRoleChange,
}) {
  return (
    <table className="table table-hover table-custom">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {usersData.map((user) => (
          <tr key={user.id}>
            <th scope="row">
              {user.id}
            </th>
            <td data-label="First Name">{user.first_name}</td>
            <td data-label="Last Name">{user.last_name}</td>
            <td data-label="Email">{user.email}</td>
            <td data-label="Role">
              {editingId === user.id ? (
                <select
                  className="form-select"
                  value={roleEdit}
                  onChange={handleRoleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              ) : (
                user.user_role
              )}
            </td>
            <td>
              {editingId === user.id ? (
                <button
                  className="btn btn-success btn-sm me-1"
                  onClick={() => handleSaveClick(user.id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm me-1"
                  onClick={() => handleEditClick(user)}
                >
                  Edit
                </button>
              )}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteClick(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
