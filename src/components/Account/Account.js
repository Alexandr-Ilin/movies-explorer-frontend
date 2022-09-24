import { NavLink } from 'react-router-dom';
import './Account.css';

function Account() {
  return (
    <NavLink
      to="/profile"
      className="account-link"
      activeClassName="account-link account-link_active"
    >
      Аккаунт
    </NavLink>
  );
}

export default Account;
