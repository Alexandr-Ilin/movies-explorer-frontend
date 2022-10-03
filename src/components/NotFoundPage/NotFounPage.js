// import React from "react";
import { NavLink } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1 className="not-found-page__title">404</h1>
      <p className="not-found-page__text">Страница не найдена</p>
      <NavLink to={-1} className="not-found-page__link">Назад</NavLink>
    </section>
  );
}

export default NotFoundPage;
