// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/" replace />;
}

function AdminRoute({ children }) {
  const adminUser = useSelector((state) => state.admin.adminUser);
  return adminUser ? children : <Navigate to="/" replace />;
}
export default {AdminRoute,PrivateRoute};
