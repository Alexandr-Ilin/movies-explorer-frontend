import './Header.css';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import HeaderMenu from '../HeaderMenu/HeaderMenu';

function Header({ isLogin }) {
  const currentPath = useLocation().pathname;
  return (
    <header
      className={`header ${currentPath === '/' ? 'header_type_landing' : ''}`}
    >
      <Logo />
      {isLogin
        ? (
          <HeaderMenu />
        )
        : <AuthNavigation />}
    </header>
  );
}

export default Header;
