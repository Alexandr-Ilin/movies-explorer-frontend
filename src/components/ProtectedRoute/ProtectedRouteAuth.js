import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRouteAuth({ isLogin }) {
  console.log(isLogin, 'protectedtRoute2');
  // (<Outlet />);
  if (!isLogin) {
    return <Outlet />;
  }
  console.log('перенаправление2');
  return <Navigate to="/" />;
}
export default ProtectedRouteAuth;
