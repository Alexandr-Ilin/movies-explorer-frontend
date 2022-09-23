import './Header.css';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from './Navigation/Navigation';
import AuthNavigation from './AuthNavigation/AuthNavigation';
import Account from './Account/Account';

function Header() {
  const currentPath = useLocation().pathname;
  const isLogin = true;
  return (
    <header
      className={`header ${currentPath === '/' ? 'header_type_landing' : ''}`}
    >
      <Logo />
      {isLogin
        ? (
          <div className="header__link-container">
            <Navigation />
            <Account />
          </div>
        )
        : <AuthNavigation />}
    </header>
  );
}

export default Header;
