// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};


// components/AdminRoute.jsx
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children, isAuthenticated, isAdmin }) => {
  return isAuthenticated && isAdmin ? children : <Navigate to="/" replace />;
};

export default {AdminRoute,PrivateRoute};
