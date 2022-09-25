import { NavLink, useLocation } from 'react-router-dom';
import './Account.css';

function Account() {
  const currentPath = useLocation().pathname;
  return (
    <NavLink
      to="/profile"
      className={`account-link ${currentPath === '/profile' && 'account-link_active'}`}
    >
      Аккаунт
    </NavLink>
  );
}

export default Account;
