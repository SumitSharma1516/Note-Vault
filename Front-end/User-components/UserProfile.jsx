import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUserDetails, resetSuccess } from '../Redux/slices/userSlice';
import { logout } from '../Redux/slices/authSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error, success } = useSelector((state) => state.user);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState('');
  const [showDetails, setShowDetails] = useState(false); // 👈 Add this

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || '');
      setPreview(profile.photo ? `http://localhost:5000/uploads/profile_photos/${profile.photo}` : '');
    }
  }, [profile]);

  useEffect(() => {
    if (success) {
      alert('Profile updated successfully!');
      dispatch(resetSuccess());
    }
    if (error) {
      alert(error);
    }
  }, [success, error, dispatch]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(profile?.photo ? `http://localhost:5000/uploads/profile_photos/${profile.photo}` : '');
    }
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('username', username);
    if (password) formData.append('password', password);
    if (profilePic) formData.append('photo', profilePic);

    dispatch(updateUser(formData));
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  if (loading && !profile) {
    return <div className="text-center mt-10 text-gray-700 font-semibold">Loading profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-12">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6 text-center">Update Profile</h2>

      <div className="flex flex-col items-center mb-8">
        {preview ? (
          <img
            src={preview}
            alt={profile?.fullName || profile?.username || 'Profile Picture'}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-600 shadow-md"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl font-semibold border-4 border-blue-600">
            N/A
          </div>
        )}

       <div className="mt-4 text-center space-y-1">
  <p className="text-lg font-semibold text-gray-800">{profile?.fullName || 'Full Name'}</p>

  {showDetails && <p className="text-gray-600">{profile?.email}</p>}
  {showDetails && <p className="text-gray-600">{profile?.mobile}</p>}
  {showDetails && (
    <p className="text-gray-600">
      {profile?.dob
        ? new Date(profile.dob).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : ''}
    </p>
  )}

  <button
    onClick={() => setShowDetails(!showDetails)}
    className="mt-2 text-blue-600 hover:underline text-sm"
  >
    {showDetails ? 'Hide Details' : 'Show Details'}
  </button>
</div>
      </div>

      <div className="space-y-4">
        <label className="block text-gray-700 font-medium" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter new username"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-gray-700 font-medium" htmlFor="password">
          New Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave blank to keep unchanged"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <label className="block text-gray-700 font-medium" htmlFor="photo">
          Upload New Profile Photo
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full text-gray-600"
        />
      </div>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-md hover:opacity-90 disabled:opacity-50 transition"
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>

      <button
        onClick={handleLogout}
        className="mt-4 w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-md hover:opacity-90 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
