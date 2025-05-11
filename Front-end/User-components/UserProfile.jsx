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
      await axios.put('https://note-vault-hiiy.onrender.com/user/update', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile Updated!");
    } catch (err) {
      alert("Update Failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="block w-full p-2 border mb-2" placeholder="Username" />
      <input type="password" onChange={e => setPassword(e.target.value)} className="block w-full p-2 border mb-2" placeholder="New Password" />
      <input type="file" onChange={e => setProfilePic(e.target.files[0])} className="mb-4" />
      <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
    </div>
  );
};

export default UserProfile;
