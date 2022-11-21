import './MovieCardList.css';
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import useScreenWidth from '../../utils/useWidthScreen';
import useStartSet from '../../utils/useStartSet';

function MovieCardList({
  searchedMovies, saveMovie, deleteMovie, allSavedMovies,
}) {
  const currentPath = useLocation().pathname;
  const widthScreen = useScreenWidth();
  const startSet = useStartSet(widthScreen);
  const [count, setCount] = useState(0);
  const [startMovies, setStartMovies] = useState([]);

  React.useEffect(() => {
    if (currentPath === '/movies') {
      const start = 0;
      const end = startSet.start;
      setStartMovies(searchedMovies.slice(start, end));
      setCount(end);
    }
  }, [searchedMovies]);

  function handleMovie() {
    setStartMovies([...startMovies, ...searchedMovies.slice(count, count + startSet.step)]);
    setCount(count + startSet.step);
  }

  function moreButton() {
    if (searchedMovies.length > count) {
      return (
        <button
          type="button"
          aria-label="Кнопка ещё"
          onClick={handleMovie}
          className="more-button"
        >
          Ещё
        </button>
      );
    }
    return '';
  }

  return (
    <>
      <article>
        <ul className={`card-list ${currentPath === '/saved-movies' ? 'card-list_saved-movies' : ''}`}>
          {currentPath === '/movies'
            ? (startMovies.map((movieCard) => (
              <MovieCard
                key={movieCard.id}
                card={movieCard}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                allSavedMovies={allSavedMovies}
              />
            )))
            : searchedMovies.map((movieCard) => (
              <MovieCard
                key={movieCard._id || movieCard.id}
                deleteMovie={deleteMovie}
                card={movieCard}
              />
            ))}
        </ul>
      </article>
      <p className="card-list__not-found">{searchedMovies.length === 0 ? 'Ничего не найдено.' : ''}</p>
      {currentPath === '/movies' ? moreButton() : ''}
    </>
  );
}

export default MovieCardList;
