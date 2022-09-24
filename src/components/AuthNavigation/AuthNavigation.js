import { NavLink } from 'react-router-dom';
import './AuthNavigation.css';

function AuthNavigation() {
  return (
    <nav>
      <ul className="auth-links">
        <li className="auth-links__item">
          <NavLink to="/signup" className="auth-links__link">Регистрация</NavLink>
        </li>
        <li className="auth-links__item">
          <NavLink to="/signin" className="auth-links__link auth-links__link_registration">Войти</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AuthNavigation;
