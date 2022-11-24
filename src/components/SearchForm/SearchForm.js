import './SearchForm.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useForm from '../../utils/useForm';
// import SavedMoviePage from '../SavedMoviePage/SavedMoviePage';
// import alertErrorMessage from '../../utils/utils';

function SearchForm({
  searchMovies, changeDuration, isShort, renderInfoMessage,
}) {
  const {
    values, handleChange, errors, setValues,
  } = useForm();

  const currentPath = useLocation().pathname;
  const savedMoviePage = currentPath !== '/movies';

  const [shortSearch, setShortSearch] = useState(false);

  React.useEffect(() => {
    if (!savedMoviePage) {
      const localSearch = localStorage.getItem('valueSearch');
      if (localSearch) {
        setValues({ search: localSearch });
      }
    }
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.search && !values.searchSavedMovies && !shortSearch) {
      const error = true;
      renderInfoMessage({ message: 'Введите ключевое слово' }, error);
      return;
    }
    setShortSearch(!shortSearch);
    searchMovies(currentPath === '/movies' ? values.search : values.searchSavedMovies, savedMoviePage);
  }

  function handleClick() {
    if (!savedMoviePage && !values.search) {
      return;
    }
    setShortSearch(true);
    changeDuration(savedMoviePage);
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
            // required
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
