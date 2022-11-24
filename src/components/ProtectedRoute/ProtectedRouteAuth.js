import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRouteAuth({ isLogin }) {
  if (isLogin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
export default ProtectedRouteAuth;
