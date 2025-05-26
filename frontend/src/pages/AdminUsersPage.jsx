import React, { useEffect, useState } from "react";
import axios from "axios";
import UserRow from "../components/UserRow";
import { useAuth } from "../context/AuthContext";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(res.data.users);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-container">
      <h2>All Users</h2>
      {error && <p className="error">{error}</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <UserRow key={u._id} user={u} setUsers={setUsers} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
