import './SearchForm.css';
// import { useState } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import useForm from '../../utils/useForm';
// import SavedMoviePage from '../SavedMoviePage/SavedMoviePage';

function SearchForm({ searchMovies, changeDuration, isShort }) {
  // const isShort = true;
  const {
    values, handleChange, errors, isValid, setValues, setIsValid,
  } = useForm();
  console.log(values);
  console.log(isShort, 'isShort55555555');
  const currentPath = useLocation().pathname;
  const savedMoviePage = currentPath !== '/movies';
  console.log(savedMoviePage, 'saved, sear11111');

  React.useEffect(() => {
    if (!savedMoviePage) {
      const localSearch = localStorage.getItem('searchValue');
      if (localSearch) {
        console.log(localSearch, 'localmovied');
        setValues({ search: localSearch });
        setIsValid(!isValid);
        return;
      }
      setIsValid(isValid);
    }
    const localSearch = localStorage.getItem('searchSavedValue');
    if (localSearch) {
      console.log(localSearch, 'savedlocalmovied');
      setValues({ searchSavedMovies: localSearch });
      setIsValid(!isValid);
      return;
    }
    setIsValid(isValid);
  }, []);

  // React.useEffect(() => {
  //   setValues({ search: localStorage.getItem('searchValue') });
  //   console.log(values);
  //   console.log(isValid);

  //   setIsValid(values.search ? !isValid : isValid);
  // }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    searchMovies(currentPath === '/movies' ? values.search : values.searchSavedMovies, savedMoviePage);
  }

  function handleClick() {
    // setIsShort(!isShort);
    changeDuration(savedMoviePage);
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
            name={currentPath === '/movies' ? 'search' : 'searchSavedMovies'}
            value={currentPath === '/movies' ? values.search || '' : values.searchSavedMovies || ''}
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
        {/* <div className="search-form__radio-wrapper-new">
          <label htmlFor="short" className="search-form__label-new">
            <input type="radio" name="short" value="false" onChange={handleChange} />
            <input type="radio" name="short" value="true" checked="true" onChange={handleChange} />
          </label>
        </div> */}
      </form>
    </div>
  );
}

export default SearchForm;
