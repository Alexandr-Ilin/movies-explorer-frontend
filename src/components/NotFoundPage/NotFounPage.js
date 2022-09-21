// import React from "react";
import './NotFoundPage.css';

function NotFoundPage() {
  function buttonClick(e) {
    e.preventDefault();
    console.log('назад');
  }
  return (
    <section className="not-found-page">
      <div>
        <h1 className="not-found-page__title">404</h1>
        <p className="not-found-page__text">Страница не найдена</p>
      </div>
      <button className="not-found-page__button" type="button" onClick={buttonClick}>Назад</button>
    </section>
  );
}

export default NotFoundPage;
