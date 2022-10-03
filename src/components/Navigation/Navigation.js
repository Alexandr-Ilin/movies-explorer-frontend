import './Navigation.css';
import { NavLink, useLocation } from 'react-router-dom';

function Navigation() {
  const currentPath = useLocation().pathname;
  return (
    <nav>
      <ul className="links">
        <li className="links__item">
          <NavLink
            to="/movies"
            className={`links__link ${currentPath === '/movies' && 'links__link_active'}`}
            activeClassName="menu__film-link_active"
          >
            Фильмы
          </NavLink>
        </li>
        <li className="links__item">
          <NavLink
            to="/saved-movies"
            className={`links__link ${currentPath === '/saved-movies' && 'links__link_active'}`}
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
