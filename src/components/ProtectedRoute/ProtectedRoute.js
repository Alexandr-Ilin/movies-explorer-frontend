import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isLogin }) {
  console.log(isLogin, 'jkdsfjkdsfj');
  if (!isLogin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
