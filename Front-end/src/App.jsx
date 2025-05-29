import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, updateProfile, setCredentials as setAuthCredentials } from '../Redux/slices/authSlice';
import { setAdminCredentials, adminLogout } from '../Redux/slices/adminSlice';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

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
  const admin = useSelector((state) => state.admin.adminUser);
  return admin ? children : <Navigate to="/" replace />;
}

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const admin = useSelector((state) => state.admin);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    // Load auth data from localStorage
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const authToken = localStorage.getItem('authToken');

    // Load admin data from localStorage
    const adminUser = JSON.parse(localStorage.getItem('adminUser'));
    const adminToken = localStorage.getItem('adminToken');

    if (authUser && authToken) {
      dispatch(setAuthCredentials({ user: authUser, token: authToken, role: authUser.role }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }

    if (adminUser && adminToken) {
      dispatch(setAdminCredentials({ adminUser, token: adminToken }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    }
  }, [dispatch]);

  const handleLogin = (userData, token, isAdminLogin = false) => {
    if (isAdminLogin) {
      dispatch(setAdminCredentials({ adminUser: userData, token }));
      localStorage.setItem('adminUser', JSON.stringify(userData));
      localStorage.setItem('adminToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoginOpen(false);
      return;
    }
    // Normal user login
    dispatch(login({ user: userData, token }));
    localStorage.setItem('authUser', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    // dispatch(adminLogout());
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    // localStorage.removeItem('adminUser');
    // localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
  };

  const handleProfileUpdate = (updatedUser) => {
    dispatch(updateProfile(updatedUser));
    localStorage.setItem('authUser', JSON.stringify(updatedUser));
  };

  return (
    <div className="font-sans bg-gray-100 pt-16">
      <Navbar
        setIsLoginOpen={setIsLoginOpen}
        setIsRegisterOpen={setIsRegisterOpen}
        user={auth.user || admin.adminUser}
        handleLogout={handleLogout}
        isAdmin={!!admin.adminUser}
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
        {/* Redirect logic */}
        {!auth.user && !admin.adminUser ? (
          <Route path="/" element={<HeroSection setIsLoginOpen={setIsLoginOpen}/>} />
        ) : admin.adminUser ? (
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
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/notes"
          element={
            <AdminRoute>
              <AllNotes />
            </AdminRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/profile/update"
          element={
            <PrivateRoute>
              <UserProfile user={auth.user} onUpdate={handleProfileUpdate} />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/upload-notes"
          element={
            <PrivateRoute>
              <UploadNotes />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserStats user={auth.user} />
            </PrivateRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<HeroSection />} />
      </Routes>
    </div>
  );
}

export default App;
