import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../Redux/slices/adminSlice';
import axios from 'axios';
const Navbar = ({ setIsLoginOpen, setIsRegisterOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const imageBaseURL = 'http://localhost:5000/uploads/profile_photos/';
const dispatch = useDispatch();
 useEffect(() => {
    const adminUser = JSON.parse(localStorage.getItem('adminUser'));
    if (adminUser) {
      dispatch(adminLogin(adminUser));
    }
  }, []);
 const { isAuthenticated, role, email } = useSelector(state => state.admin);
// or combined state if you store admin/user in same slice

console.log('Navbar auth state:', { isAuthenticated, role });
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 fixed w-full top-0 left-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Brand */}
        <div className="text-white text-3xl font-bold">
          <Link to="/" onClick={() => setMenuOpen(false)}>Note Vault</Link>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 text-white items-center">
          {!user ? (
            <>
              <Link to="/" className="p-2 hover:text-yellow-300">Home</Link>
              <Link to="/about" className="p-2 hover:text-yellow-300">About</Link>
              <Link to="/services" className="p-2 hover:text-yellow-300">Services</Link>
              <Link to="/blog" className="p-2 hover:text-yellow-300">Blog</Link>
              <Link to="/search" className="p-2 hover:text-yellow-300">Search Notes</Link>
              <button className="p-2 hover:text-yellow-300" onClick={() => setIsLoginOpen(true)}>Login</button>
              <button className="p-2 hover:text-yellow-300" onClick={() => setIsRegisterOpen(true)}>Register</button>
            </>
          ) : user.role === 'admin' ? (
            <>
              <Link to="/admin/dashboard" className="p-2 hover:text-yellow-300">Admin Dashboard</Link>
              <Link to="/admin/users" className="p-2 hover:text-yellow-300">All Users</Link>
              <Link to="/admin/notes" className="p-2 hover:text-yellow-300">All Notes</Link>
              {/* No logout button here */}
              {/* <div className="flex items-center space-x-3 ml-4">
                <img
                  src={user.profilePic ? imageBaseURL + user.profilePic : '/default-user.png'}
                  alt="Admin"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                />
                <span className="text-white font-semibold text-lg">{user.name || user.username || 'Admin'}</span>
              </div> */}
            </>
          ) : (
            <>
              <Link to="/dashboard" className="p-2 hover:text-yellow-300">Dashboard</Link>
              <Link to="/profile/upload-notes" className="p-2 hover:text-yellow-300">Upload Notes</Link>
              <Link to="/profile/update" className="p-2 hover:text-yellow-300">Update Profile</Link>
             <div className="flex items-center space-x-3 ml-4">
  <img
    src={
      user?.profilePic
        ? `http://localhost:5000/uploads/profile_photos/${user.profilePic}`
        : '/default-user.png'
    }
    alt="User"
    onError={(e) => (e.target.src = '/default-user.png')}
    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
  />
  <span className="text-white font-semibold text-lg">
    {user?.name || user?.username || 'User'}
  </span>
</div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 text-white bg-blue-700 p-4 rounded-md">
          {!user ? (
            <>
              <Link to="/" className="block hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" className="block hover:text-yellow-300" onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/services" className="block hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Services</Link>
              <Link to="/blog" className="block hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Blog</Link>
              <Link to="/search" className="block hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Search Notes</Link>
              <button
                className="block w-full text-left hover:text-yellow-300"
                onClick={() => {
                  setIsLoginOpen(true);
                  setMenuOpen(false);
                }}
              >
                Login
              </button>
              <button
                className="block w-full text-left hover:text-yellow-300"
                onClick={() => {
                  setIsRegisterOpen(true);
                  setMenuOpen(false);
                }}
              >
                Register
              </button>
            </>
          ) : user.role === 'admin' ? (
            <>
              <Link to="/admin/dashboard" className="block hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
              <Link to="/admin/users" className="block hover:text-yellow-300" onClick={() => setMenuOpen(false)}>All Users</Link>
              <Link to="/admin/notes" className="block hover:text-yellow-300" onClick={() => setMenuOpen(false)}>All Notes</Link>
              {/* <div className="flex items-center space-x-3 mt-2">
                <img
                  src={user.profilePic ? imageBaseURL + user.profilePic : '/default-user.png'}
                  alt="Admin"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                />
                <span className="text-white font-semibold text-lg">{user.name || user.username || 'Admin'}</span>
              </div> */}
            </>
          ) : (
            <>
              <Link to="/dashboard" className="block hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/profile/upload-notes" className="block hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Upload Notes</Link>
              <Link to="/profile/update" className="block hover:text-yellow-300" onClick={() => setMenuOpen(false)}>Update Profile</Link>
              <div className="flex items-center space-x-3 mt-2">
                <img
                  src={user.profilePic ? imageBaseURL + user.profilePic : '/default-user.png'}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                />
                <span className="text-white font-semibold text-lg">{user.name || user.username || 'User'}</span>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
