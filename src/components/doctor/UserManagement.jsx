import React from "react";

const UserManagement = ({ users }) => {
  return (
    <div className="user-management">
      <h2>Enrolled Users</h2>
      {users && users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.course}</td>
                <td>{user.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users enrolled yet.</p>
      )}
    </div>
  );
};

export default UserManagement;
