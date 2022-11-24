import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute({ isLogin }) {
  if (!isLogin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
