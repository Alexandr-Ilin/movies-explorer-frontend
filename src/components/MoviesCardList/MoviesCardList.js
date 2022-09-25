import './MoviesCardList.css';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MovieCard from '../MovieCard/MovieCard';

function MoviesCardList() {
  const [isChecked, setIsChecked] = useState(true);
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleClick() {
    setIsChecked(!isChecked);
    console.log('qwe');
  }
  return (
    <>
      <Header />
      <main className="main">
        <section className="movie-list">
          <form className="movie-list__form" onSubmit={handleSubmit}>
            <div className="movie-list__search-container">
              <input
                type="text"
                className="movie-list__input"
                placeholder="Фильм"
              />
              <button
                type="submit"
                className="movie-list__submit"
                aria-label="Найти фильм"
              >
                Найти
              </button>
            </div>
            <div className="movie-list__radio-wrapper">
              <button
                type="button"
                aria-label={isChecked ? 'Выбрать короткометражки' : 'Выбрать любые фильмы'}
                className={isChecked ? 'movie-list__enable-button' : 'movie-list__disable-button'}
                onClick={handleClick}
              />
              <p className="movie-list__button-subtitle">Короткометражки</p>
            </div>
          </form>
          <ul className="movie-list__cards">
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default MoviesCardList;
