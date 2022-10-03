import { useState } from 'react';
import './HeaderMenu.css';
import { NavLink, useLocation } from 'react-router-dom';
import Account from '../Account/Account';

function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = useLocation().pathname;
  function handleClick() {
    setIsOpen(!isOpen);
  }
  return (
    <div className={`header-menu ${isOpen ? 'header-menu_opened' : ''}`}>
      <button
        type="button"
        aria-label="Кнопка навигационного меню"
        onClick={handleClick}
        className={`header-menu__button ${isOpen ? 'header-menu__button_opened' : ''}`}
      />
      <button
        type="button"
        aria-label="Закрыть меню"
        onClick={handleClick}
        className={`header-menu__close-button ${isOpen ? 'header-menu__close-button_opened' : ''}`}
      />
      <nav className={`header-menu__container ${isOpen ? 'header-menu__container_opened' : ''}`}>
        <ul className="header-menu__links">
          <li className="header-menu__links-item">
            <NavLink
              to="/"
              className={`header-menu__link header-menu__link_main ${currentPath === '/' && 'header-menu__link_active'}`}
            >
              Главная
            </NavLink>
          </li>
          <li className="header-menu__links-item">
            <NavLink
              to="/movies"
              className={`header-menu__link ${currentPath === '/movies' && 'header-menu__link_active'}`}
            >
              Фильмы
            </NavLink>
          </li>
          <li className="header-menu__links-item">
            <NavLink
              to="/saved-movies"
              className={`header-menu__link ${currentPath === '/saved-movies' && 'header-menu__link_active'}`}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className="header-menu__links-item">
            <Account />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderMenu;
