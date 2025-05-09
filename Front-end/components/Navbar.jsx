import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setIsLoginOpen, setIsRegisterOpen, user, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Secure admin check using role
  const isAdmin = user?.role === 'admin';

  const logoutAndRedirect = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 fixed w-full top-0 left-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Brand */}
        <div className="text-white text-3xl font-bold">
          <Link to="/">Note Vault</Link>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
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
              <button className="p-2 hover:text-yellow-300" onClick={logoutAndRedirect}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/profile/stats" className="p-2 hover:text-yellow-300">Dashboard</Link>
              <Link to="/profile/upload-notes" className="p-2 hover:text-yellow-300">Upload Notes</Link>
              <Link to="/profile/update" className="p-2 hover:text-yellow-300">Update Profile</Link>
              <div className="flex items-center space-x-3">
                <img src={user.profilePic || '/default-user.png'} alt="User" className="w-8 h-8 rounded-full" />
                <div className="text-white text-sm">{user.name}</div>
              </div>
              <button className="p-2 hover:text-yellow-300" onClick={logoutAndRedirect}>Logout</button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 text-white bg-blue-700 p-4 rounded-md">
          {!user ? (
            <>
              <Link to="/" className="block hover:text-yellow-300">Home</Link>
              <Link to="/about" className="block hover:text-yellow-300">About</Link>
              <Link to="/services" className="block hover:text-yellow-300">Services</Link>
              <Link to="/blog" className="block hover:text-yellow-300">Blog</Link>
              <Link to="/search" className="block hover:text-yellow-300">Search</Link>
              <button className="block w-full text-left hover:text-yellow-300" onClick={() => setIsLoginOpen(true)}>Login</button>
              <button className="block w-full text-left hover:text-yellow-300" onClick={() => setIsRegisterOpen(true)}>Register</button>
            </>
          ) : isAdmin ? (
            <>
              <Link to="/admin/dashboard" className="block hover:text-yellow-300">Admin Dashboard</Link>
              <Link to="/admin/users" className="block hover:text-yellow-300">All Users</Link>
              <Link to="/admin/notes" className="block hover:text-yellow-300">All Notes</Link>
              <button className="block w-full text-left hover:text-yellow-300" onClick={logoutAndRedirect}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/profile/stats" className="block hover:text-yellow-300">Dashboard</Link>
              <Link to="/profile/upload-notes" className="block hover:text-yellow-300">Upload Notes</Link>
              <Link to="/profile/update" className="block hover:text-yellow-300">Update Profile</Link>
              <div className="flex items-center space-x-3 mt-2">
                <img src={user.profilePic || '/default-user.png'} alt="User" className="w-8 h-8 rounded-full" />
                <div className="text-white text-sm">{user.name}</div>
              </div>
              <button className="block w-full text-left hover:text-yellow-300" onClick={logoutAndRedirect}>Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
