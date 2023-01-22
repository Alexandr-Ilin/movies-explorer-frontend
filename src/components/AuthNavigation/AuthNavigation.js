import { Link } from 'react-router-dom';
import './AuthNavigation.css';

function AuthNavigation() {
  return (
    <nav>
      <ul className="auth-links">
        <li className="auth-links__item">
          <Link to="/signup" className="auth-links__link">Регистрация</Link>
        </li>
        <li className="auth-links__item">
          <Link to="/signin" className="auth-links__link auth-links__link_login">Войти</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AuthNavigation;
