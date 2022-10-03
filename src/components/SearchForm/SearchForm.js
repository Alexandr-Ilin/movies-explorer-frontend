import './SearchForm.css';
import { useState } from 'react';
import MovieCardList from '../MovieCardList/MovieCardList';

function SearchForm() {
  const [isChecked, setIsChecked] = useState(true);
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleMovie(evt) {
    console.log(evt);
  }

  function handleClick() {
    setIsChecked(!isChecked);
    console.log('qwe');
  }
  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__search-container">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
          />
          <button
            type="submit"
            className="search-form__submit"
            aria-label="Найти фильм"
          >
            Найти
          </button>
        </div>
        <div className="search-form__radio-wrapper">
          <button
            type="button"
            aria-label={isChecked ? 'Выбрать короткометражки' : 'Выбрать любые фильмы'}
            className={`search-form__radio ${isChecked ? 'search-form__radio_marked' : 'search-form__radio_not-marked'}`}
            onClick={handleClick}
          />
          <p className="search-form__button-subtitle">Короткометражки</p>
        </div>
      </form>
      <MovieCardList />
      <button type="button" aria-label="Кнопка ещё" onClick={handleMovie} className="search-form__more">Ещё</button>
    </section>
  );
}

export default SearchForm;
