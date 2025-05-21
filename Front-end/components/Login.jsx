import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/slices/authSlice';

const Login = ({ setIsLoginOpen }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (username === 'Sumitshar2452@gmail.com') {
        // Admin login (manual axios)
        const response = await axios.post('https://note-vault-hiiy.onrender.com/admin/login', {
          email: username,
          password,
        });

        if (response.data.msg === 'Admin logged in successfully') {
          const { token, role, email } = response.data;
          const adminUser = { token, role, email };
          localStorage.setItem('adminUser', JSON.stringify(adminUser));
          // You can create a separate admin slice if needed and dispatch here
          console.log(response)
          setIsLoginOpen(false);
        } else {
          setError('Invalid admin credentials');
        }
      } else {
        // User login (via Redux thunk)
        const resultAction = await dispatch(login({ username, password }));
        if (login.fulfilled.match(resultAction)) {
          localStorage.setItem('token', resultAction.payload.token);
          setIsLoginOpen(false);
        } else {
          setError(resultAction.payload || 'Invalid user credentials');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center text-blue-600">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className='space-y-2'>
        <input
          type="text"
          placeholder="Username or Admin Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsLoginOpen(false)}
          className="w-full p-3 mt-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Login;
