import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <h2>Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <button>Edit Profile</button>
    </div>
  );
};

export default UserProfile;
