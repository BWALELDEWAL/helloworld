import React, { useState } from 'react';
import UpdateProfileForm from '../components/UpdateProfileForm';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  return (
    <div className="form-container" style={{ maxWidth: 480 }}>
      {!isEditing ? (
        <div>
          <h2 className="form-title">Your Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="button"
            style={{ marginTop: 24, width: "100%" }}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <UpdateProfileForm user={user} onCancel={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default Profile;
