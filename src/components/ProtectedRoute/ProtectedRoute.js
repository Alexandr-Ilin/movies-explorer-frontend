import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ isLogin }) {
  console.log(isLogin, 'protectedtRoute');
  // (<Outlet />);
  if (isLogin) {
    return <Outlet />;
  }
  console.log('перенаправление');
  return <Navigate to="/" />;
}

export default ProtectedRoute;
