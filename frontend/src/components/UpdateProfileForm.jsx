import React, { useState } from "react";
import axios from "axios";

const UpdateProfileForm = ({ user, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const payload = { name, email };
      if (currentPassword && newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      // If you use token-based auth, add Authorization header here
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/v1/users/profile",
        payload,
        {
          headers: token ? { Authorization: Bearer ${token} } : {},
        }
      );
      setMessage("Profile updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error updating profile."
      );
    }
  };

  return (
    <form onSubmit={handleUpdate} className="form-container" style={{ maxWidth: 480 }}>
      <h2 className="form-title">Edit Profile</h2>
      {message && <div className="form-success">{message}</div>}
      {error && <div className="form-error">{error}</div>}

      <div className="form-group">
        <label>Name:</label>
        <input
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <hr style={{ margin: "24px 0" }} />

      <h3 style={{ marginBottom: 12, color: "#1976d2" }}>Change Password</h3>
      <div className="form-group">
        <label>Current Password:</label>
        <input
          type="password"
          className="form-input"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
        />
      </div>
      <div className="form-group">
        <label>New Password:</label>
        <input
          type="password"
          className="form-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
        <button type="submit" className="button" style={{ flex: 1 }}>
          Save
        </button>
        <button
          type="button"
          className="button"
          style={{ background: "#b0b8c1", color: "#333", flex: 1 }}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;