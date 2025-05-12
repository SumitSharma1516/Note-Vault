import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
console.log(username)
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('username', username);
    if (password) formData.append('password', password);
    if (profilePic) formData.append('photo', profilePic);
     const userData=JSON.parse(localStorage.getItem('user'));
     const token=userData?.token;

     console.log(formData)
    try {
      await axios.put('http://localhost:5000/user/update', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile Updated!");
    } catch (err) {
      alert("Update Failed");
    }
  };

  return (
  <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Update Profile</h2>
  <input type="text" value={username} onChange={e => setUsername(e.target.value)}
    className="block w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Username" />
  <input type="password" onChange={e => setPassword(e.target.value)}
    className="block w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
    placeholder="New Password" />
  <input type="file" onChange={e => setProfilePic(e.target.files[0])}
    className="mb-4 w-full" />
  <button onClick={handleUpdate}
    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded hover:opacity-90 w-full">
    Update
  </button>
</div>
  );
};

export default UserProfile;
