import './Logo.css';
import { NavLink } from 'react-router-dom';
import logoPath from '../../images/logo-project.svg';

function Logo() {
  return (
    <NavLink to="/" className="logo-link">
      <img src={logoPath} alt="логотип проекта" className="logo-link__img" />
    </NavLink>
  );
}

export default Logo;
