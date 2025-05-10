import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServiceSection from '../components/ServiceSection';
import BlogSection from '../components/BlogSection';
import SearchNotes from '../components/SearchNotes';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Registration from '../components/Registration';

//✅ User Component
import ProfileUpdate from '../User-components/UserProfile';
import UploadNotes from '../User-components/UploadNotes';
import UserStats from '../User-components/UserStats';

// ✅ Admin Components
import AdminDashboard from '../Admin-components/AdminManage';
import AllUsers from '../Admin-components/AdminAllUsers';
import AllNotes from '../Admin-components/AdminAllNotes';
import UserProfile from '../User-components/UserProfile';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAdmin(parsedUser.role === 'admin');  // Check role
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('user'); // clean up corrupt data
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAdmin(userData.role === 'admin');
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    setIsAdmin(updatedUser.role === 'admin');
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <Router>
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
          {/* Public routes */}
          {!user && (
            <>
              <Route path="/" element={<HeroSection />} />
              <Route path="/about" element={<AboutSection />} />
              <Route path="/services" element={<ServiceSection />} />
              <Route path="/blog" element={<BlogSection />} />
              <Route path="/search" element={<SearchNotes />} />
              <Route path="/footer" element={<Footer />} />
            </>
          )}

          {/* Admin Routes */}
          {isAdmin && (
            <>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AllUsers />} />
              <Route path="/admin/notes" element={<AllNotes />} />
            </>
          )}

          {/* User Routes */}
          {user && !isAdmin && (
            <>
              <Route path="/profile/stats" element={<UserStats user={user} />} />
              <Route path="/profile/update" element={<UserProfile user={user} />} />
              <Route path="/profile/upload-notes" element={<UploadNotes />} />
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AllUsers />} />
              <Route path="/admin/notes" element={<AllNotes />} />
              <Route
                path=""
                element={
                  <ProfileUpdate
                    user={user}
                    onProfileUpdate={handleProfileUpdate}
                    handleLogout={handleLogout}
                  />
                }
              />
            </>
          )}

          {/* Fallback */}
          <Route path="*" element={<HeroSection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
