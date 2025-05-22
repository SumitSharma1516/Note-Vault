import { useDispatch } from 'react-redux';
import { login } from '../Redux/slices/authSlice';
import { adminLogin,setAdminCredentials } from '../Redux/slices/adminSlice';
import { useState } from 'react';
const Login = ({ setIsLoginOpen, handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    if (username === 'Sumitshar2452@gmail.com') {
      // Admin login
      const resultAction = await dispatch(adminLogin({ email: username, password }));
      if (adminLogin.fulfilled.match(resultAction)) {
        const { email, token, role } = resultAction.payload;

        // Redux state update:
        dispatch(setAdminCredentials({ email, token, role }));

        // Local UI state update if needed:
        handleLogin({ email, token, role }, null, true);
      } else {
        setError(resultAction.payload || 'Invalid admin credentials');
      }
    } else {
      // User login remains same
      const resultAction = await dispatch(login({ username, password }));
      if (login.fulfilled.match(resultAction)) {
        const { email, token, role } = resultAction.payload;
        handleLogin({ email, token, role: role || 'user' });
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
      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
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
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
