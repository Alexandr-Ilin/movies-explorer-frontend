import './SearchForm.css';
import { useState } from 'react';
import useForm from '../../utils/useForm';

function SearchForm({ searchMovies }) {
  const [isShort, setIsShort] = useState(true);
  const { values, handleChange } = useForm();
  console.log(values);

  function handleSubmit(evt) {
    evt.preventDefault();
    searchMovies(values.search, isShort);
  }

  function handleClick() {
    setIsShort(!isShort);
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
