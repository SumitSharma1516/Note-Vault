import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setUsers(res.data.users))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Registered Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td className="p-2 border">{user.fullName}</td>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllUsers;
