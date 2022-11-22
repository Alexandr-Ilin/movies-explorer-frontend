import './SearchForm.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import useForm from '../../utils/useForm';

function SearchForm({ searchMovies, changeDuration, isShort }) {
  const {
    values, handleChange, errors, isValid, setValues, setIsValid,
  } = useForm();

  const currentPath = useLocation().pathname;
  const savedMoviePage = currentPath !== '/movies';

  React.useEffect(() => {
    if (!savedMoviePage) {
      const localSearch = localStorage.getItem('valueSearch');
      if (localSearch) {
        setValues({ search: localSearch });
        setIsValid(!isValid);
        return;
      }
      setIsValid(isValid);
    }

    // const localSearch = localStorage.getItem('valueSearchSaved');
    // if (localSearch) {
    //   setValues({ searchSavedMovies: localSearch });
    //   setIsValid(!isValid);
    //   return;
    // }
    // setIsValid(isValid);
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();

    searchMovies(currentPath === '/movies' ? values.search : values.searchSavedMovies, savedMoviePage);
  }

  function handleClick(evt) {
    changeDuration(savedMoviePage, () => {
      handleSubmit(evt);
    });
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
          <span className="search-form__error">{!savedMoviePage ? errors.search : errors.searchSavedMovies}</span>
          <button
            type="submit"
            className="search-form__submit"
            aria-label="Найти фильм"
            // disabled={!isValid}
          >
            Найти
          </button>
        </div>
        <div className="search-form__radio-wrapper">
          <button
            type="submit"
            aria-label={isShort.value ? 'Выбрать короткометражки' : 'Выбрать любые фильмы'}
            className={`search-form__radio ${isShort.value ? 'search-form__radio_marked' : 'search-form__radio_not-marked'}`}
            onClick={handleClick}
            // disabled={!isValid}
          />
          <p className="search-form__button-subtitle">Короткометражки</p>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
