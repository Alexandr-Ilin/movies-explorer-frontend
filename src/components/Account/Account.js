import './Account.css';
import { NavLink, useLocation } from 'react-router-dom';

function Account({ isOpen }) {
  const currentPath = useLocation().pathname;
  return (
    <NavLink
      to="/profile"
      className={({ isActive }) => (`account-link ${isActive ? 'account-link_active' : ''}`)}
    >
      <p className="account-link__text">Аккаунт</p>
      <p className={`account-link__icon ${currentPath === '/' && !isOpen ? 'account-link__icon_landing' : ''}`} />
    </NavLink>
  );
}

export default Account;
