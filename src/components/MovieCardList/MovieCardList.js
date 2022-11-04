/* eslint-disable no-nested-ternary */
import './MovieCardList.css';
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import useScreenWidth from '../../utils/useWidthScreen';
import useStartSet from '../../utils/useStartSet';
// import cardPath from '../../TestCard/2.jpg';

function MovieCardList({ searchedMovies }) {
  console.log(searchedMovies, 'movieCardList');
  const currentPath = useLocation().pathname;
  const widthScreen = useScreenWidth();
  const startSet = useStartSet(widthScreen);
  // console.log(startSet, 'startSet');
  // console.log(widthScreen, 'screenWIdth');
  // console.log(widthScreen - 270, 'widthy');

  // добавленое
  const [count, setCount] = useState(0);
  const [startMovies, setStartMovies] = useState([]);
  // const [buttonVisible, setButtonVisible] = useState(true)

  React.useEffect(() => {
    const start = 0;
    const end = startSet.start;

    setStartMovies(searchedMovies.slice(start, end));
    setCount(end);
    console.log(startMovies, 'startMovies');
  }, [searchedMovies]);

  function handleMovie() {
    console.log(count);
    console.log(searchedMovies.length);
    setStartMovies([...startMovies, ...searchedMovies.slice(count, count + startSet.step)]);
    setCount(count + startSet.step);
    // count >= searchedMovies.length
    // ? setButtonVisible(false)
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
        ? searchedMovies.length === 0
          ? <p className="card-list__not-found">Ничего не найдено.</p>
          : searchedMovies.length >= count
            && <button type="button" aria-label="Кнопка ещё" onClick={handleMovie} className="more-button">Ещё</button>
        : console.log(searchedMovies.length)}
    </>
  );
}

export default MovieCardList;
