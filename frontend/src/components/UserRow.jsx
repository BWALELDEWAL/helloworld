import React, { useState } from "react";
import axios from "axios";

const UserRow = ({ user, setUsers }) => {
  const [role, setRole] = useState(user.role);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/v1/users/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(prev => prev.filter(u => u._id !== user._id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/users/${user._id}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(prev =>
        prev.map(u => (u._id === res.data.user._id ? res.data.user : u))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update role");
    }
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Organizer">Organizer</option>
          <option value="Admin">Admin</option>
        </select>
      </td>
      <td>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete} style={{ color: "red" }}>Delete</button>
      </td>
    </tr>
  );
};

export default UserRow;
