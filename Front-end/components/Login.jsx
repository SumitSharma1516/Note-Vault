import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ handleLogin, setIsLoginOpen }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (username === 'Sumitshar2452@gmail.com') {
        // Admin login
        console.log("admin")
        response = await axios.post('https://note-vault-hiiy.onrender.com//admin/login', {
          email: username,
          password,
        });
  console.log(response)
        if (response.data.msg === 'Admin logged in successfully') {
          handleLogin({ ...response.data.admin, email: username });
        } else {
          setError('Invalid admin credentials');
        }
      } else {
        // Regular user login
        console.log("user")
        response = await axios.post('https://note-vault-hiiy.onrender.com//auth/login', {
          username,
          password,
        });

        if (response.data.msg === 'User Login') {
          handleLogin({
            token: response.data.token,
            ...response.data.user,  // Include user details for front-end rendering
          });
          setIsLoginOpen(false);
        } else {
          setError('Invalid user credentials');
        }
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or Admin Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsLoginOpen(false)}
          className="w-full mt-2 text-gray-500 hover:text-gray-800 text-sm"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Login;
