import './MovieCardList.css';
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import useScreenWidth from '../../utils/useWidthScreen';
import useStartSet from '../../utils/useStartSet';

function MovieCardList({
  searchedMovies, saveMovie, deleteMovie, isSavedMovies,
}) {
  const currentPath = useLocation().pathname;
  const widthScreen = useScreenWidth();
  const startSet = useStartSet(widthScreen);

  // добавленое
  const [count, setCount] = useState(0);
  const [startMovies, setStartMovies] = useState([]);
  // const [buttonVisible, setButtonVisible] = useState(true)

  React.useEffect(() => {
    const start = 0;
    const end = startSet.start;

    setStartMovies(searchedMovies.slice(start, end));
    setCount(end);
  }, [searchedMovies]);

  function handleMovie() {
    setStartMovies([...startMovies, ...searchedMovies.slice(count, count + startSet.step)]);
    setCount(count + startSet.step);
  }
  return (
    <>
      <article>
        <ul className={`card-list ${currentPath === '/saved-movies' ? 'card-list_saved-movies' : ''}`}>
          {
           startMovies.map((movieCard) => (
             <MovieCard
               key={movieCard.id}
               card={movieCard}
               saveMovie={saveMovie}
               deleteMovie={deleteMovie}
               isSaved={isSavedMovies}
              //  title={movieCard.title}
              //  duracion={movieCard.duration}
             />
           ))
        }
        </ul>
      </article>
      {/* {currentPath === '/movies'
      // eslint-disable-next-line max-len
      && <button type="button"
      aria-label="Кнопка ещё" onClick={handleMovie} className="more-button">Ещё</button>} */}

      {currentPath === '/movies'
        && searchedMovies.length === 0
        ? <p className="card-list__not-found">Ничего не найдено.</p>
        : searchedMovies.length > count
            && (
            <button
              type="button"
              aria-label="Кнопка ещё"
              onClick={handleMovie}
              className="more-button"
            >
              Ещё
            </button>
            )}
      {/* if (searchedMovies.length === 0  && currentPath === '/movies') {
          <p className="card-list__not-found">Ничего не найдено.</p>
        }

        if (searchedMovies.length > count  && currentPath === movie) {
          <button
            type="button"
            aria-label="Кнопка ещё"
            onClick={handleMovie}
            className="more-button"
          >
            Ещё
          </button>
        } */}

    </>
  );
}

export default MovieCardList;
