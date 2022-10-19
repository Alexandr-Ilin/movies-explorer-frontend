import './Logo.css';
import { Link } from 'react-router-dom';
import logoPath from '../../images/logo-project.svg';

function Logo() {
  return (
    <Link to="/" className="logo-link">
      <img src={logoPath} alt="логотип проекта" className="logo-link__img" />
    </Link>
  );
}

export default Logo;
