import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, updateProfile } from '../Redux/slices/authSlice';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServiceSection from '../components/ServiceSection';
import BlogSection from '../components/BlogSection';
import SearchNotes from '../components/SearchNotes';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Registration from '../components/Registration';

// User Components
import UserProfile from '../User-components/UserProfile';
import UploadNotes from '../User-components/UploadNotes';
import UserStats from '../User-components/UserStats';

// Admin Components
import AdminDashboard from '../Admin-components/AdminManage';
import AllUsers from '../Admin-components/AdminAllUsers';
import AllNotes from '../Admin-components/AdminAllNotes';

// Route guards
function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/" replace />;
}

function AdminRoute({ children }) {
  const { user, isAdmin } = useSelector((state) => state.auth);
  return user && isAdmin ? children : <Navigate to="/" replace />;
}

function App() {
  const dispatch = useDispatch();
  const { user, isAdmin } = useSelector((state) => state.auth);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
console.log(isAdmin)
  const handleLogin = (userData) => {
    dispatch(login(userData));
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleProfileUpdate = (updatedUser) => {
    dispatch(updateProfile(updatedUser));
  };

  // global data 
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
  return (
    <div className="font-sans bg-gray-100 pt-16">
      <Navbar
        setIsLoginOpen={setIsLoginOpen}
        setIsRegisterOpen={setIsRegisterOpen}
        user={user}
        handleLogout={handleLogout}
        isAdmin={isAdmin}
      />

      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Login handleLogin={handleLogin} setIsLoginOpen={setIsLoginOpen} />
        </div>
      )}

      {isRegisterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Registration setIsRegisterOpen={setIsRegisterOpen} />
        </div>
      )}

      <Routes>
        {!user ? (
          <Route path="/" element={<HeroSection />} />
        ) : isAdmin ? (
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        ) : (
          <Route path="/" element={<Navigate to="/dashboard" />} />
        )}

        <Route path="/about" element={<AboutSection />} />
        <Route path="/services" element={<ServiceSection />} />
        <Route path="/blog" element={<BlogSection />} />
        <Route path="/search" element={<SearchNotes />} />
        <Route path="/footer" element={<Footer />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={<AdminRoute><AdminDashboard /></AdminRoute>}
        />
        <Route
          path="/admin/users"
          element={<AdminRoute><AllUsers /></AdminRoute>}
        />
        <Route
          path="/admin/notes"
          element={<AdminRoute><AllNotes /></AdminRoute>}
        />

        {/* User Routes */}
        <Route
          path="/profile/update"
          element={<PrivateRoute><UserProfile user={user} onUpdate={handleProfileUpdate} /></PrivateRoute>}
        />
        <Route
          path="/profile/upload-notes"
          element={<PrivateRoute><UploadNotes /></PrivateRoute>}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute><UserStats user={user} /></PrivateRoute>}
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<HeroSection />} />
      </Routes>
    </div>
  );
}

export default App;
