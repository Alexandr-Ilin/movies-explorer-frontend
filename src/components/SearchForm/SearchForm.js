import './SearchForm.css';
// import { useState } from 'react';
import React from 'react';
import useForm from '../../utils/useForm';

function SearchForm({ searchMovies, changeDuration, isShort }) {
  // const isShort = true;
  const {
    values, handleChange, errors, isValid, setValues, setIsValid,
  } = useForm();

  React.useEffect(() => {
    setValues({ search: localStorage.getItem('searchValue') });
    setIsValid(!isValid);
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    searchMovies(values.search);
  }

  function handleClick() {
    // setIsShort(!isShort);
    changeDuration();
    console.log('cheked');
  }
  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__search-container">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            name="search"
            value={values.search || ''}
            onChange={handleChange}
            required
          />
          <span className="search-form__error">{errors.search}</span>
          <button
            type="submit"
            className="search-form__submit"
            aria-label="Найти фильм"
            disabled={!isValid}
          >
            Найти
          </button>
        </div>
        <div className="search-form__radio-wrapper">
          <button
            type="button"
            aria-label={isShort ? 'Выбрать короткометражки' : 'Выбрать любые фильмы'}
            className={`search-form__radio ${isShort ? 'search-form__radio_marked' : 'search-form__radio_not-marked'}`}
            onClick={handleClick}
          />
          <p className="search-form__button-subtitle">Короткометражки</p>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
